import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { generateMetadata } from '../app/[locale]/layout';

describe('SEO', () => {
  it('sitemap covers both locales with hreflang alternates', () => {
    const s = sitemap();
    expect(s.map((e) => e.url)).toEqual([
      'https://athrbrands.sa/en',
      'https://athrbrands.sa/ar',
    ]);
    expect(s[0].alternates?.languages).toEqual({
      en: 'https://athrbrands.sa/en',
      ar: 'https://athrbrands.sa/ar',
    });
  });

  it('robots disallows /admin and links the sitemap', () => {
    const r = robots();
    const raw = JSON.stringify(r);
    expect(raw).toContain('/admin');
    expect(r.sitemap).toBe('https://athrbrands.sa/sitemap.xml');
  });

  it('AR metadata is in Arabic and both locales share the same alternates', () => {
    const m = generateMetadata({ params: { locale: 'ar' } });
    expect(String(m.title)).toContain('أثر');
    expect(m.alternates?.languages).toEqual({ en: '/en', ar: '/ar' });
    expect(m.openGraph?.locale).toBe('ar_SA');
  });
});
