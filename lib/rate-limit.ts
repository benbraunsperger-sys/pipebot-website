import { createHmac, createHash } from 'node:crypto';
import { isIP } from 'node:net';
import type { NextRequest } from 'next/server';

type RateBucket = { count: number; resetAt: number };
type RateStore = Map<string, RateBucket>;
type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  unavailable?: boolean;
};

const globalRateLimits = globalThis as typeof globalThis & {
  pipebotRateLimits?: RateStore;
};

const buckets = globalRateLimits.pipebotRateLimits ?? new Map<string, RateBucket>();
globalRateLimits.pipebotRateLimits = buckets;

const INCREMENT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('PEXPIRE', KEYS[1], ARGV[1])
end
local ttl = redis.call('PTTL', KEYS[1])
return { count, ttl }
`;

function getClientAddress(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    // Railway documents X-Real-IP as its canonical client address header.
    // Never trust client-supplied X-Forwarded-For or Cloudflare headers here.
    if (!process.env.RAILWAY_ENVIRONMENT_ID) throw new Error('Untrusted production proxy');
    const address = request.headers.get('x-real-ip')?.trim() ?? '';
    if (!address || isIP(address) === 0) throw new Error('Trusted client IP unavailable');
    return address.toLowerCase();
  }

  const address = request.headers.get('x-real-ip')?.trim() ?? '';
  return address && isIP(address) !== 0 ? address.toLowerCase() : 'development-local';
}

export function getClientIdentity(request: NextRequest) {
  const secret = process.env.CLIENT_IP_HMAC_SECRET;
  if (process.env.NODE_ENV === 'production' && (!secret || secret.length < 32)) {
    throw new Error('CLIENT_IP_HMAC_SECRET must be configured in production');
  }

  return createHmac('sha256', secret || 'pipebot-development-only')
    .update(getClientAddress(request))
    .digest('hex');
}

function consumeLocalRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  if (buckets.size > 20_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
    if (buckets.size > 20_000) buckets.delete(buckets.keys().next().value as string);
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  current.count += 1;
  return {
    allowed: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}

async function consumeSharedRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const endpoint = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!endpoint || !token || !endpoint.startsWith('https://')) {
    throw new Error('Shared rate-limit storage is not configured');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['EVAL', INCREMENT_SCRIPT, '1', key, String(windowMs)]),
    cache: 'no-store',
    signal: AbortSignal.timeout(2_500),
  });
  if (!response.ok) throw new Error('Shared rate-limit storage request failed');

  const payload = await response.json() as { result?: unknown; error?: string };
  if (payload.error || !Array.isArray(payload.result) || payload.result.length < 2) {
    throw new Error('Shared rate-limit storage returned an invalid response');
  }

  const count = Number(payload.result[0]);
  const ttl = Number(payload.result[1]);
  if (!Number.isSafeInteger(count) || !Number.isFinite(ttl) || ttl < 0) {
    throw new Error('Shared rate-limit storage returned invalid counters');
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: Date.now() + ttl,
  };
}

export async function consumeRateLimit(
  request: NextRequest,
  scope: string,
  limit: number,
  windowMs: number,
  subject = '',
): Promise<RateLimitResult> {
  try {
    const identity = getClientIdentity(request);
    const key = `pipebot:ratelimit:${scope}:${createHash('sha256').update(`${identity}:${subject}`).digest('hex')}`;

    if (process.env.NODE_ENV !== 'production'
      && !process.env.UPSTASH_REDIS_REST_URL
      && !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return consumeLocalRateLimit(key, limit, windowMs);
    }

    return await consumeSharedRateLimit(key, limit, windowMs);
  } catch {
    // Security-sensitive endpoints fail closed if IP identity or shared storage is unavailable.
    return { allowed: false, remaining: 0, resetAt: Date.now() + windowMs, unavailable: true };
  }
}
