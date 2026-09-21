import type { NextConfig } from 'next';

const legacySections = [
  'about',
  'branchen',
  'ki',
  'leistungen',
  'mehrwert',
  'pricing',
  'ratgeber',
  'regionen',
  'terms',
  'vergleich',
  'wissen',
];

const securityHeaders = [
  { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'self' mailto:; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  trailingSlash: true,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...legacySections.flatMap((section) => [
        {
          source: `/${section}`,
          destination: `https://pipeline-solutions.at/${section}/`,
          permanent: true,
        },
        {
          source: `/${section}/:path*`,
          destination: `https://pipeline-solutions.at/${section}/:path*`,
          permanent: true,
        },
      ]),
      { source: '/alogin', destination: '/', permanent: true },
      { source: '/alogin/:path*', destination: '/', permanent: true },
      { source: '/danke', destination: '/contact/', permanent: true },
      { source: '/danke/:path*', destination: '/contact/', permanent: true },
      { source: '/privacy', destination: '/datenschutz/', permanent: true },
      { source: '/privacy/:path*', destination: '/datenschutz/', permanent: true },
    ];
  },
};

export default nextConfig;
