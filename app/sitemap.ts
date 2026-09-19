import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://pipebot.at/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://pipebot.at/impressum/', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://pipebot.at/datenschutz/', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
