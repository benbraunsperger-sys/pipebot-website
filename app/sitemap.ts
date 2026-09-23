import type { MetadataRoute } from 'next';
import { getAllLandingPaths, industries } from '@/lib/programmatic-landing-pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-23T00:00:00.000Z');
  const fixedPages = ['/', '/contact/', '/testen/', '/impressum/', '/datenschutz/', '/branchen/'];
  const industryPages = industries.map((industry) => `/branchen/${industry.slug}/`);
  const scenarioPages = getAllLandingPaths();

  return [...fixedPages, ...industryPages, ...scenarioPages].map((path) => ({
    url: `https://pipebot.at${path}`,
    lastModified,
  }));
}
