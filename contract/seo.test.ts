import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { generateMetadata } from '../app/[locale]/layout';
import { CASE_SLUGS, SITE_URL, caseMetadata } from '../lib/case-metadata';

describe('SEO', () => {
  it('sitemap covers both locales with hreflang alternates', () => {
    const s = sitemap();
    expect(s).toHaveLength(16);
    for (const locale of ['ar', 'en']) {
      expect(s.map(e => e.url)).toContain(`${SITE_URL}/${locale}`);
      for (const slug of CASE_SLUGS) expect(s.map(e => e.url)).toContain(`${SITE_URL}/${locale}/work/${slug}`);
    }
    expect(s[0].alternates?.languages).toEqual({
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
    });
  });

  it('robots disallows /admin and links the sitemap', () => {
    const r = robots();
    const raw = JSON.stringify(r);
    expect(raw).toContain('/admin');
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it('AR metadata is in Arabic and both locales share the same alternates', () => {
    const m = generateMetadata({ params: { locale: 'ar' } });
    expect(String(m.title)).toContain('أثر');
    expect(m.alternates?.languages).toEqual({ en: '/en', ar: '/ar' });
    expect(m.openGraph?.locale).toBe('ar_SA');
  });

  it('gives every case its own canonical, translated alternates and title', () => {
    const titles = new Set();
    for (const locale of ['ar', 'en'] as const) for (const slug of CASE_SLUGS) {
      const m = caseMetadata(locale, slug);
      expect(m.alternates?.canonical).toBe(`/${locale}/work/${slug}`);
      expect(m.alternates?.languages).toEqual({ ar: `/ar/work/${slug}`, en: `/en/work/${slug}` });
      expect(m.description).toBeTruthy();
      titles.add(m.title);
    }
    expect(titles.size).toBe(14);
  });
});
