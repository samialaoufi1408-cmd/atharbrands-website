import { describe, it, expect } from 'vitest';
import { htmlAttrs, generateStaticParams, generateMetadata } from '../app/[locale]/layout';

describe('locale layout', () => {
  it('generateStaticParams yields both en and ar', async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ locale: 'en' }, { locale: 'ar' }]);
  });

  it('htmlAttrs: ar → rtl + font-ar, en → ltr + font-sans', () => {
    expect(htmlAttrs('ar')).toEqual({ lang: 'ar', dir: 'rtl', className: 'font-ar' });
    expect(htmlAttrs('en')).toEqual({ lang: 'en', dir: 'ltr', className: 'font-sans' });
  });

  it('generateMetadata: bilingual titles + alternates + OG', () => {
    const en = generateMetadata({ params: { locale: 'en' } });
    const ar = generateMetadata({ params: { locale: 'ar' } });
    expect(String(en.title)).toContain('ATHR');
    expect(String(ar.title)).toContain('أثر');
    expect(en.alternates?.languages).toEqual({ en: '/en', ar: '/ar' });
    expect(ar.alternates?.canonical).toBe('/ar');
    expect(ar.openGraph?.locale).toBe('ar_SA');
  });
});
