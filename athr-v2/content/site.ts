import en from './en.json';
import ar from './ar.json';

export type Locale = 'en' | 'ar';
export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

/** Every generated content key. */
export type ContentKey = keyof typeof en;

const enDict = en as Record<string, string>;
const arDict = ar as Record<string, string>;

/**
 * Resolve a content value for the given locale, letting CMS `overrides`
 * take precedence over defaults. AR mode looks up `${key}__ar` in overrides
 * (matching the legacy site_content column convention) and falls back to
 * the generated Arabic default; EN mode looks up the bare key.
 * Missing values fall through to the English default so nothing ever renders empty.
 */
export function t(
  locale: Locale,
  key: ContentKey,
  overrides?: Record<string, string>,
): string {
  const k = key as string;
  if (locale === 'ar') {
    return (
      overrides?.[`${k}__ar`] ??
      arDict[k] ??
      enDict[k] ??
      ''
    );
  }
  return overrides?.[k] ?? enDict[k] ?? '';
}

/** Localized nav labels. Not in cms-config, so hardcoded here. */
export const NAV_LABELS: Record<Locale, Record<'philosophy' | 'services' | 'work' | 'journal' | 'contact' | 'enquire', string>> = {
  en: {
    philosophy: 'Philosophy',
    services: 'Services',
    work: 'Work',
    journal: 'Journal',
    contact: 'Contact',
    enquire: 'Enquire',
  },
  ar: {
    philosophy: 'فلسفتنا',
    services: 'خدماتنا',
    work: 'الأعمال',
    journal: 'المجلة',
    contact: 'تواصل',
    enquire: 'تواصل معنا',
  },
};
