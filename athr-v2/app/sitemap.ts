import type { MetadataRoute } from 'next';

const BASE = 'https://athrbrands.sa';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return (['en', 'ar'] as const).map((l) => ({
    url: `${BASE}/${l}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: { en: `${BASE}/en`, ar: `${BASE}/ar` },
    },
  }));
}
