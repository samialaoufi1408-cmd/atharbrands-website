import type { Metadata } from 'next';
import type { Locale } from '@/content/site';

export const SITE_URL = 'https://www.athrbrands.sa';
export const CASE_SLUGS = ['athrbrands', 'qira', 'wizan', 'sumra', 'dahsha'] as const;
export type CaseSlug = typeof CASE_SLUGS[number];

const COPY = {
  athrbrands: {
    ar: ['هوية أثر | استراتيجية ونظام بصري', 'دراسة هوية استوديو أثر: من استراتيجية العلامة والهوية اللفظية إلى النظام البصري والتطبيقات الرقمية.'],
    en: ['ATHR identity | Strategy and visual system', 'The ATHR studio identity: from brand strategy and verbal identity to a visual system and digital applications.'],
  },
  qira: {
    ar: ['قِرَى | هوية لضيافة تراثية معاصرة', 'دراسة تصورية لهوية قِرَى، تستلهم العتبة وذاكرة المكان لتشكيل علامة ضيافة معاصرة.'],
    en: ['QIRĀ | Contemporary heritage hospitality', 'A conceptual hospitality identity inspired by the threshold and the memory of place.'],
  },
  wizan: {
    ar: ['وِزان | هوية لمنصة عافية رقمية', 'دراسة تصورية لهوية وِزان: استراتيجية وتسمية ونظام بصري لمنصة عافية وقائية رقمية.'],
    en: ['WIZAN | Digital wellbeing identity', 'A conceptual strategy, naming and visual identity system for a preventive digital wellbeing platform.'],
  },
  sumra: {
    ar: ['سُمرة | هوية محمصة ومقهى قهوة مختصة', 'دراسة تصورية لهوية سُمرة: درجات التحميص تقود الشعار والألوان وتطبيقات أكياس القهوة والأكواب.'],
    en: ['SUMRA | Specialty coffee brand identity', 'A conceptual coffee identity where roast levels shape the logo, colors, coffee bags and takeaway cups.'],
  },
  dahsha: {
    ar: ['دهشة | استراتيجية وهوية لمتجر ألعاب أطفال', 'دراسة دهشة التصورية كاملة في 22 صفحة: الاستراتيجية والشعار والألوان والتغليف وتجربة متجر ألعاب الأطفال.'],
    en: ['DAHSHA | Children’s toy store identity', 'The complete 22-page Arabic conceptual case study: strategy, logo, color, packaging and a children’s toy store experience.'],
  },
} as const;

export function caseMetadata(locale: Locale, slug: CaseSlug): Metadata {
  const [heading, description] = COPY[slug][locale];
  const title = `${heading} | ATHR BRANDS`;
  const path = `/${locale}/work/${slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ar: `/ar/work/${slug}`, en: `/en/work/${slug}` },
    },
    openGraph: {
      type: 'website',
      siteName: 'ATHRBRANDS',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      title,
      description,
      url: path,
      // Preserve the existing shared preview asset; no new social artwork.
      images: ['/assets/aura-featured.png'],
    },
  };
}
