import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: segments = [] } = await context.params;
  const relativePath = segments.join('/');
  const publicRoot = path.join(process.cwd(), 'public');
  const candidates = [
    path.join(publicRoot, relativePath, 'index.html'),
    path.join(publicRoot, `${relativePath}.html`),
  ];

  for (const candidate of candidates) {
    try {
      const html = await readFile(candidate, 'utf8');
      return new NextResponse(html, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=3600',
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    } catch {
      // Try the next static export shape.
    }
  }

  return new NextResponse('Not found', { status: 404 });
}
