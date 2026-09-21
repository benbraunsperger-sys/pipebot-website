import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { PIPEBOT_SYSTEM_PROMPT } from '@/lib/pipebot-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { role: ChatRole; content: string };

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1_500;
const MAX_REQUEST_BYTES = 32_000;
const MAX_BUCKETS = 10_000;

type RateBucket = { count: number; resetAt: number };
const globalRateLimit = globalThis as typeof globalThis & { pipebotRateBuckets?: Map<string, RateBucket> };
const buckets = globalRateLimit.pipebotRateBuckets ?? new Map<string, RateBucket>();
globalRateLimit.pipebotRateBuckets = buckets;

function getClientId(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const address = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? forwarded?.at(-1)
    ?? 'local';

  return createHash('sha256').update(address).digest('hex');
}

function isRateLimited(clientId: string) {
  const now = Date.now();

  if (buckets.size >= MAX_BUCKETS) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
    if (buckets.size >= MAX_BUCKETS) buckets.delete(buckets.keys().next().value as string);
  }

  const current = buckets.get(clientId);

  if (!current || current.resetAt <= now) {
    buckets.set(clientId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<ChatMessage>;
  return (message.role === 'user' || message.role === 'assistant')
    && typeof message.content === 'string'
    && message.content.trim().length > 0
    && message.content.length <= MAX_MESSAGE_LENGTH;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NEOKENS_API_KEY?.trim();
  const baseUrl = (process.env.NEOKENS_BASE_URL || 'https://api.v2.neokens.com/v1').replace(/\/$/, '');
  const model = process.env.NEOKENS_MODEL || 'gpt-5.6-sol';

  if (!apiKey) {
    return NextResponse.json({ error: 'Der Chat ist noch nicht konfiguriert.' }, { status: 503 });
  }

  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: 'Zu viele Nachrichten. Bitte kurz warten.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: 'Die Anfrage ist zu groß.' }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Die Anfrage ist zu groß.' }, { status: 413 });
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: 'Mindestens eine Nachricht ist erforderlich.' }, { status: 400 });
  }

  const messages = rawMessages.slice(-MAX_HISTORY);
  if (!messages.every(isChatMessage)) {
    return NextResponse.json({ error: 'Eine Nachricht ist ungültig oder zu lang.' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: PIPEBOT_SYSTEM_PROMPT },
          ...messages,
        ],
        reasoning_effort: 'low',
        stream: false,
      }),
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('Neokens chat request failed', { status: response.status, model });
      return NextResponse.json({ error: 'PipeBot ist gerade nicht erreichbar. Versuch es bitte erneut.' }, { status: 502 });
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string | Array<{ type?: string; text?: string }> } }>;
    };
    const rawContent = data.choices?.[0]?.message?.content;
    const content = typeof rawContent === 'string'
      ? rawContent.trim()
      : Array.isArray(rawContent)
        ? rawContent.map((part) => part.text || '').join('').trim()
        : '';

    if (!content) {
      return NextResponse.json({ error: 'PipeBot hat keine Antwort erhalten.' }, { status: 502 });
    }

    return NextResponse.json({ message: content, model });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    console.error('PipeBot chat error', { timedOut });
    return NextResponse.json(
      { error: timedOut ? 'Die Antwort dauert gerade zu lange. Bitte versuchen Sie es erneut.' : 'PipeBot ist gerade nicht erreichbar.' },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
