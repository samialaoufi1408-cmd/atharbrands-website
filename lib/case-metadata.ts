import type { Metadata } from 'next';
import type { Locale } from '@/content/site';

export const SITE_URL = 'https://www.athrbrands.sa';
export const CASE_SLUGS = ['athrbrands', 'awwal-nafha', 'rahb-aldar', 'tatabu', 'wizan', 'sumra', 'dahsha', 'nabra'] as const;
export type CaseSlug = typeof CASE_SLUGS[number];

const COPY = {
  nabra: {
    ar: ['نبرأ | الاستراتيجية والهوية البصرية كاملة', 'دراسة نبرأ الطبية التصورية من أثر: الجمهور والتموضع والرسائل ورحلة المراجع ونظام الهوية والتطبيقات والإطلاق، مع دليل كامل من 41 صفحة.'],
    en: ['NABRA | Complete brand strategy and visual identity', 'A complete Arabic healthcare concept study by ATHR: positioning, messages, visitor journey, visual identity, applications and launch planning, with a 41-page guide.'],
  },
  athrbrands: {
    ar: ['هوية أثر | استراتيجية ونظام بصري', 'دراسة هوية استوديو أثر: من استراتيجية العلامة والهوية اللفظية إلى النظام البصري والتطبيقات الرقمية. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['ATHR identity | Strategy and visual system', 'The ATHR studio identity: from brand strategy and verbal identity to a visual system and digital applications. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  'awwal-nafha': {
    ar: ['أوّل نفحة | هوية وتغليف لعلامة عطور معاصرة', 'مشروع أول نفحة التصوري: استراتيجية وتسمية وهوية بصرية وتغليف عطور وتجربة متجر ومحتوى إطلاق من أثر. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['AWWAL NAFHA | Contemporary fragrance identity and packaging', 'A conceptual fragrance brand by ATHR: strategy, naming, visual identity, packaging, a product-page concept and launch art direction. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  'rahb-aldar': {
    ar: ['رَحْب الدار | هوية لشركة تطوير عقاري سكني', 'دراسة رحب الدار التصورية: استراتيجية وتسمية وهوية بصرية وملف مشروع ولوحات معمارية وتجربة رقمية من أثر. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['RAHB ALDAR | Residential developer brand identity', 'A conceptual residential developer identity by ATHR, spanning strategy, naming, project presentation, signage and a digital space-exploration concept. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  tatabu: {
    ar: ['تَتابُع | هوية لخدمة شحن وتوصيل', 'دراسة تتابع التصورية: استراتيجية وتسمية وهوية بصرية للمركبات والطرود والزيّ وتجربة تتبّع الشحنات من أثر. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['TATABU | Shipping and delivery brand identity', 'A conceptual delivery identity by ATHR, connecting vehicle livery, parcels, workwear and a clear tracking-interface concept. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  wizan: {
    ar: ['وِزان | هوية لمنصة عافية رقمية', 'دراسة تصورية لهوية وِزان: استراتيجية وتسمية ونظام بصري لمنصة عافية وقائية رقمية. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['WIZAN | Digital wellbeing identity', 'A conceptual strategy, naming and visual identity system for a preventive digital wellbeing platform. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  sumra: {
    ar: ['سُمرة | هوية محمصة ومقهى قهوة مختصة', 'دراسة تصورية لهوية سُمرة: درجات التحميص تقود الشعار والألوان وتطبيقات أكياس القهوة والأكواب. دراسة كاملة تشمل رحلة العميل والرسائل وقواعد الهوية والتطبيقات والإطلاق، مع دليل من 41 صفحة.'],
    en: ['SUMRA | Specialty coffee brand identity', 'A conceptual coffee identity where roast levels shape the logo, colors, coffee bags and takeaway cups. Includes a complete Arabic study of the customer journey, messages, identity rules and launch, with a 41-page guide.'],
  },
  dahsha: {
    ar: ['دهشة | استراتيجية وهوية لمتجر ألعاب أطفال', 'دراسة دهشة التصورية كاملة في 41 صفحة: الاستراتيجية والشعار والألوان والتغليف وتجربة متجر ألعاب الأطفال.'],
    en: ['DAHSHA | Children’s toy store identity', 'The complete 41-page Arabic conceptual case study: strategy, logo, color, packaging and a children’s toy store experience.'],
  },
} as const;

export function caseMetadata(locale: Locale, slug: CaseSlug): Metadata {
  const [heading, description] = COPY[slug][locale];
  const heroImages: Partial<Record<CaseSlug, string>> = {
    nabra: '/assets/nabra/campaign.webp',
    athrbrands: '/assets/studies/athrbrands/mark.webp',
    wizan: '/assets/studies/wizan/mark.webp',
    sumra: '/assets/studies/sumra/full.webp',
    dahsha: '/assets/studies/dahsha/campaign.webp',
    'awwal-nafha': '/assets/naysar/hero.png',
    'rahb-aldar': '/assets/nawsaq/hero.png',
    tatabu: '/assets/darwaq/hero.png',
  };
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
      images: [heroImages[slug] ?? '/assets/aura-featured.png'],
    },
  };
}
