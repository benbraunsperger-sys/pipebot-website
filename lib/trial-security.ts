import type { NextRequest } from 'next/server';

type TurnstileResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

export async function verifyTrialChallenge(
  token: unknown,
): Promise<{ valid: boolean; unavailable: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const production = process.env.NODE_ENV === 'production';
  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (!secret) return { valid: !production, unavailable: production };
  if (typeof token !== 'string' || token.length < 1 || token.length > 2_048) {
    return { valid: false, unavailable: false };
  }
  if (production && allowedHostnames.length === 0) return { valid: false, unavailable: true };

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(4_000),
    });
    if (!response.ok) return { valid: false, unavailable: true };

    const result = await response.json() as TurnstileResponse;
    const hostname = result.hostname?.toLowerCase();
    const hostnameAllowed = allowedHostnames.length === 0
      || (hostname !== undefined && allowedHostnames.includes(hostname));

    return {
      valid: result.success === true && result.action === 'trial_analyze' && hostnameAllowed,
      unavailable: false,
    };
  } catch {
    return { valid: false, unavailable: true };
  }
}

export function checkTrialOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    if (process.env.NODE_ENV !== 'production') {
      return originUrl.host.toLowerCase() === new URL(request.url).host.toLowerCase();
    }
    if (originUrl.protocol !== 'https:') return false;
    const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? '')
      .split(',')
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean);
    return allowedHostnames.length > 0 && allowedHostnames.includes(originUrl.hostname.toLowerCase());
  } catch {
    return false;
  }
}
