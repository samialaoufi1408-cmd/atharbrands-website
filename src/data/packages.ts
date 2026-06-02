export interface BrandPackage {
  id: string;
  name: string;
  /** Starting price in SAR. Edit here to change package pricing. */
  startingPrice: number;
  tagline: string;
  features: string[];
  /** Highlights the package visually as the popular choice. */
  recommended?: boolean;
}

export const PACKAGES: BrandPackage[] = [
  {
    id: "launch",
    name: "باقة الانطلاق",
    startingPrice: 6500,
    tagline: "مناسبة للمشاريع الجديدة التي تحتاج ظهورًا احترافيًا سريعًا.",
    features: [
      "جلسة اكتشاف",
      "شعار أساسي",
      "ألوان وخطوط",
      "بطاقة عمل",
      "3 قوالب سوشال",
      "دليل هوية مختصر",
    ],
  },
  {
    id: "growth",
    name: "باقة النمو",
    startingPrice: 12000,
    tagline:
      "مناسبة للمشاريع التي تحتاج هوية متكاملة قابلة للاستخدام في الموقع والسوشال والمطبوعات.",
    recommended: true,
    features: [
      "استراتيجية مختصرة",
      "نظام شعار كامل",
      "ألوان وخطوط",
      "Pattern خاص بالعلامة",
      "تطبيقات مكتبية",
      "6 قوالب سوشال",
      "بروفايل مختصر",
      "دليل هوية",
    ],
  },
  {
    id: "impact",
    name: "باقة الأثر",
    startingPrice: 25000,
    tagline: "مناسبة للعلامات التي تحتاج استراتيجية، هوية فاخرة، وتجربة ظهور كاملة.",
    features: [
      "استراتيجية براند كاملة",
      "تحليل منافسين",
      "شخصية العلامة",
      "نبرة الصوت",
      "نظام هوية متكامل",
      "بروفايل شركة",
      "عرض تقديمي",
      "قوالب سوشال",
      "تطبيقات فاخرة",
      "دليل استخدام مفصل",
    ],
  },
];
