import type { Metadata } from 'next';
import type { Locale } from '@/content/site';
import { CASE_SLUGS, SITE_URL, type CaseSlug } from './case-metadata';
import { getPortfolioFeasibility } from '@/content/feasibility/studies';

export const FEASIBILITY_PATHS = ['/services/feasibility', ...CASE_SLUGS.map(slug => `/work/${slug}/feasibility`)];
export function feasibilityMetadata(locale: Locale, example: boolean | CaseSlug = false): Metadata {
  const ar = locale === 'ar';
  const slug = example === true ? 'sumra' : typeof example === 'string' ? example : null;
  const study = slug && slug !== 'sumra' ? getPortfolioFeasibility(slug) : null;
  const name = study ? study.name[locale] : (ar ? 'سُمرة' : 'SUMRA');
  const path = slug ? `/work/${slug}/feasibility` : '/services/feasibility';
  const title = slug
    ? (ar ? `دراسة جدوى ${name} | نموذج تفاعلي بافتراضات معلنة | أثر` : `${name} feasibility | Interactive illustrative model | ATHR`)
    : (ar ? 'دراسة الجدوى واستراتيجية العلامة والهوية البصرية | أثر' : 'Feasibility, brand strategy and visual identity | ATHR');
  const description = study
    ? (ar ? `دراسة جدوى توضيحية لعلامة ${name}: ${study.sector.ar}. السوق والتشغيل والتأسيس والمخاطر، مع حاسبة وسيناريوهات وتدفق نقدي وافتراضات معلنة مرتبطة باستراتيجية الهوية.` : `An illustrative ${name} feasibility study for ${study.sector.en.toLowerCase()}: market, operations, budgets, risks, interactive scenarios, cash flow and disclosed assumptions linked to the identity strategy.`)
    : slug
    ? (ar ? 'نموذج تصوري لفرع مقهى سُمرة: فرضيات السوق والتشغيل، ميزانية التأسيس، حاسبة التعادل والسيولة، وسيناريوهات السنة الأولى مع مصادر المنهج وحدود الأرقام.' : 'An illustrative SUMRA café branch study: market and operating hypotheses, setup budget, interactive break-even and cash model, first-year scenarios and transparent assumptions.')
    : (ar ? 'خدمة دراسة الجدوى من أثر: السوق والتشغيل والتكاليف والإيرادات والمخاطر، ضمن مسار يربط دراسة المشروع باستراتيجية العلامة والهوية البصرية.' : 'ATHR feasibility studies cover market, operations, costs, revenue and risks, with a path connecting the business study to brand strategy and visual identity.');
  return {
    metadataBase: new URL(SITE_URL), title, description,
    alternates: { canonical: `/${locale}${path}`, languages: { ar: `/ar${path}`, en: `/en${path}` } },
    openGraph: { type: 'website', siteName: 'ATHRBRANDS', title, description, url: `/${locale}${path}`, locale: ar ? 'ar_SA' : 'en_US', images: [study?.hero ?? '/assets/studies/sumra/full.webp'] },
  };
}
