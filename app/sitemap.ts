import type { MetadataRoute } from 'next';
import { CASE_SLUGS, SITE_URL } from '@/lib/case-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return (['en', 'ar'] as const).flatMap((locale) => ['', ...CASE_SLUGS.map(slug => `/work/${slug}`)].map(path => ({
    url: `${SITE_URL}/${locale}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path ? 0.8 : 1,
    alternates: {
      languages: { en: `${SITE_URL}/en${path}`, ar: `${SITE_URL}/ar${path}` },
    },
  })));
}
