export type MockupKind = "signage" | "card" | "seal" | "phone" | "menu";

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  tag: string;
  /** Which CSS mockup to render (see components/sections/CaseStudies.tsx). */
  mockup: MockupKind;
  /** Per-study palette so each concept reads distinctly. */
  palette: { bg: string; ink: string; accent: string };
  /** Single glyph shown inside the mockup. */
  monogram: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cafe",
    title: "هوية مقهى فاخر",
    description: "نظام بصري دافئ وهادئ لتجربة قهوة راقية.",
    tag: "مقاهي",
    mockup: "signage",
    palette: { bg: "#2a211a", ink: "#efe6d6", accent: "#c8a96a" },
    monogram: "ق",
  },
  {
    id: "realestate",
    title: "هوية شركة عقارية",
    description: "حضور بصري موثوق يعكس الثبات والقيمة الاستثمارية.",
    tag: "عقار",
    mockup: "card",
    palette: { bg: "#0d1b2a", ink: "#f6f3ee", accent: "#c8a96a" },
    monogram: "ع",
  },
  {
    id: "clinic",
    title: "هوية عيادة تجميل",
    description: "هوية ناعمة وراقية تعزز الثقة والراحة.",
    tag: "طبي",
    mockup: "seal",
    palette: { bg: "#f1ece3", ink: "#0d1b2a", accent: "#7f8f7a" },
    monogram: "ت",
  },
  {
    id: "app",
    title: "هوية تطبيق تقني",
    description: "نظام بصري حديث وسريع مناسب لمنصة رقمية.",
    tag: "تقنية",
    mockup: "phone",
    palette: { bg: "#13273b", ink: "#f6f3ee", accent: "#dcc28d" },
    monogram: "A",
  },
  {
    id: "restaurant",
    title: "هوية مطعم سعودي معاصر",
    description: "مزيج بين الأصالة والحداثة بتفاصيل بصرية فاخرة.",
    tag: "مطاعم",
    mockup: "menu",
    palette: { bg: "#1c2a1f", ink: "#ece3d4", accent: "#c8a96a" },
    monogram: "م",
  },
];
