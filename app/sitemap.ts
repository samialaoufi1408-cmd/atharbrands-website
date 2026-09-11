import type { MetadataRoute } from 'next';
import { CASE_SLUGS, SITE_URL } from '@/lib/case-metadata';
import { FEASIBILITY_PATHS } from '@/lib/feasibility-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return (['en', 'ar'] as const).flatMap((locale) => ['', '/services/loyalty', ...CASE_SLUGS.map(slug => `/work/${slug}`), ...FEASIBILITY_PATHS].map(path => ({
    url: `${SITE_URL}/${locale}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path ? 0.8 : 1,
    alternates: {
      languages: { en: `${SITE_URL}/en${path}`, ar: `${SITE_URL}/ar${path}` },
    },
  })));
}
