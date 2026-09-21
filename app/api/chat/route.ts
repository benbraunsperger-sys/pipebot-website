import { NextRequest, NextResponse } from 'next/server';
import { createNeokensCompletion } from '@/lib/neokens';
import { PIPEBOT_SYSTEM_PROMPT } from '@/lib/pipebot-prompt';
import { consumeRateLimit, getRateLimitKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { role: ChatRole; content: string };

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1_500;
const MAX_REQUEST_BYTES = 32_000;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<ChatMessage>;
  return (message.role === 'user' || message.role === 'assistant')
    && typeof message.content === 'string'
    && message.content.trim().length > 0
    && message.content.length <= MAX_MESSAGE_LENGTH;
}

export async function POST(request: NextRequest) {
  if (!process.env.NEOKENS_API_KEY?.trim()) {
    return NextResponse.json({ error: 'Der Chat ist noch nicht konfiguriert.' }, { status: 503 });
  }

  const rate = consumeRateLimit(getRateLimitKey(request, 'main-chat'), 12, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Nachrichten. Bitte kurz warten.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1_000)) } },
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

  try {
    const completion = await createNeokensCompletion([
      { role: 'system', content: PIPEBOT_SYSTEM_PROMPT },
      ...messages,
    ], { maxTokens: 750, timeoutMs: 30_000 });
    return NextResponse.json({ message: completion.content, model: completion.model });
  } catch {
    return NextResponse.json({ error: 'PipeBot ist gerade nicht erreichbar. Versuch es bitte erneut.' }, { status: 502 });
  }
}
