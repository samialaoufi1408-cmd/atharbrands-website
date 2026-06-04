/**
 * أعمال تصورية لعرض أسلوب أثر — conceptual CLIENT brands.
 *
 * IMPORTANT: each entry is an INDEPENDENT brand with its own name, palette and
 * monogram. These are NOT أثر's own identity — they demonstrate the studio's
 * range. Rendered purely with CSS/SVG (no external images, no ATHAR assets).
 */
export interface CaseStudy {
  id: string;
  index: string;
  nameAr: string;
  nameEn: string;
  category: string;
  description: string;
  /** فكرة الشعار */
  logoIdea: string;
  /** الألوان — palette swatches (hex), this brand's own colours. */
  swatches: string[];
  /** Emblem header colours (this brand's, not ATHAR's). */
  emblem: { bg: string; ink: string; accent: string };
  /** Single glyph shown in the emblem. */
  monogram: string;
  /** التطبيقات */
  applications: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "marsa",
    index: "01",
    nameAr: "مرسى البن",
    nameEn: "Marsa Coffee",
    category: "مقهى فاخر",
    description: "هوية دافئة لمقهى مختص تجمع بين الأصالة والتجربة الراقية.",
    logoIdea: "حرف الميم على شكل موجة مرسى ناعمة مع حبة بُن، يعبّر عن الهدوء والتجربة.",
    swatches: ["#2e2018", "#7a5638", "#c8a06a", "#efe3d2"],
    emblem: { bg: "#2e2018", ink: "#efe3d2", accent: "#c8a06a" },
    monogram: "م",
    applications: ["كيس قهوة", "كوب", "بطاقة عمل", "لوحة محل"],
  },
  {
    id: "sidra",
    index: "02",
    nameAr: "سدرة العقارية",
    nameEn: "Sidra Real Estate",
    category: "عقار",
    description: "هوية موثوقة لشركة تطوير عقاري تعكس الثبات والقيمة.",
    logoIdea: "شجرة سدرة مجرّدة تتكوّن من حرف السين، رمز الجذور والثبات والنمو.",
    swatches: ["#15302a", "#3f6b53", "#cbb079", "#e6ded0"],
    emblem: { bg: "#15302a", ink: "#e6ded0", accent: "#cbb079" },
    monogram: "س",
    applications: ["كتيب مشروع", "لوحة موقع", "بروفايل", "لافتة"],
  },
  {
    id: "naqaa",
    index: "03",
    nameAr: "نقاء كلينك",
    nameEn: "Naqaa Clinic",
    category: "عيادة",
    description: "هوية صحية راقية تجمع بين الثقة والهدوء.",
    logoIdea: "حرف النون كقطرة نقاء ناعمة توحي بالصفاء والعناية المتأنّية.",
    swatches: ["#1f5b58", "#7fb2ad", "#d9b7ac", "#f1ece8"],
    emblem: { bg: "#1f5b58", ink: "#f1ece8", accent: "#d9b7ac" },
    monogram: "ن",
    applications: ["كرت موعد", "واجهة استقبال", "تطبيق حجز", "سوشال ميديا"],
  },
  {
    id: "tawazun",
    index: "04",
    nameAr: "توازن",
    nameEn: "Tawazun",
    category: "منتج فاخر",
    description: "نظام بصري ناعم لمنتج يعكس الجودة والاتزان.",
    logoIdea: "حرف التاء بنقطتين متوازنتين يعبّر عن الاتزان والرقي والدقّة.",
    swatches: ["#26211c", "#8c8073", "#b59a6d", "#e8e1d6"],
    emblem: { bg: "#26211c", ink: "#e8e1d6", accent: "#b59a6d" },
    monogram: "ت",
    applications: ["تغليف منتج", "ملصق", "علبة فاخرة", "سوشال ميديا"],
  },
  {
    id: "bunyan",
    index: "05",
    nameAr: "بنيان",
    nameEn: "Bunyan",
    category: "تقنية / عقار",
    description: "هوية استراتيجية لشركة تبني حلولًا قابلة للنمو.",
    logoIdea: "حرف الباء كوحدات بناء معيارية متصاعدة ترمز للنمو القابل للتوسّع.",
    swatches: ["#142436", "#3a5878", "#8fb0d6", "#cdd6e0"],
    emblem: { bg: "#142436", ink: "#e3e8ef", accent: "#8fb0d6" },
    monogram: "ب",
    applications: ["واجهة منصة", "بروفايل", "لوحة بيانات", "سوشال ميديا"],
  },
];
