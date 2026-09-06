import type { Metadata } from 'next';
import type { Locale } from '@/content/site';
import { SITE_URL } from './case-metadata';

export const FEASIBILITY_PATHS = ['/services/feasibility', '/work/sumra/feasibility'] as const;
export function feasibilityMetadata(locale: Locale, example = false): Metadata {
  const ar = locale === 'ar';
  const path = FEASIBILITY_PATHS[example ? 1 : 0];
  const title = example
    ? (ar ? 'دراسة جدوى سُمرة | نموذج تفاعلي بافتراضات معلنة | أثر' : 'SUMRA feasibility | Interactive illustrative model | ATHR')
    : (ar ? 'دراسة الجدوى واستراتيجية العلامة والهوية البصرية | أثر' : 'Feasibility, brand strategy and visual identity | ATHR');
  const description = example
    ? (ar ? 'نموذج تصوري لفرع مقهى سُمرة: فرضيات السوق والتشغيل، ميزانية التأسيس، حاسبة التعادل والسيولة، وسيناريوهات السنة الأولى مع مصادر المنهج وحدود الأرقام.' : 'An illustrative SUMRA café branch study: market and operating hypotheses, setup budget, interactive break-even and cash model, first-year scenarios and transparent assumptions.')
    : (ar ? 'خدمة دراسة الجدوى من أثر: السوق والتشغيل والتكاليف والإيرادات والمخاطر، ضمن مسار يربط دراسة المشروع باستراتيجية العلامة والهوية البصرية.' : 'ATHR feasibility studies cover market, operations, costs, revenue and risks, with a path connecting the business study to brand strategy and visual identity.');
  return {
    metadataBase: new URL(SITE_URL), title, description,
    alternates: { canonical: `/${locale}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } },
    openGraph: { type: 'website', siteName: 'ATHRBRANDS', title, description, url: `/${locale}${path}`, locale: ar ? 'ar_SA' : 'en_US', images: ['/assets/studies/sumra/full.webp'] },
  };
}
