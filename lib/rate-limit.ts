import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';

type RateBucket = { count: number; resetAt: number };
type RateStore = Map<string, RateBucket>;

const globalRateLimits = globalThis as typeof globalThis & {
  pipebotRateLimits?: RateStore;
};

const buckets = globalRateLimits.pipebotRateLimits ?? new Map<string, RateBucket>();
globalRateLimits.pipebotRateLimits = buckets;

function requestAddress(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? forwarded?.at(-1)
    ?? 'local';
}

export function getRateLimitKey(request: NextRequest, scope: string) {
  const address = requestAddress(request);
  return `${scope}:${createHash('sha256').update(address).digest('hex')}`;
}

export function consumeRateLimit(key: string, limit: number, windowMs: number) {
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
