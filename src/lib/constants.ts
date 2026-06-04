/**
 * Central brand configuration for أثر | ATHAR.
 *
 * ▸ WhatsApp number → set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local / Vercel.
 * ▸ Contact details, taglines and nav live here.
 * ▸ Service prices live in src/data/pricing.ts and src/data/packages.ts.
 */

export const SITE = {
  nameAr: "أثر",
  nameEn: "ATHAR",
  nameFull: "أثر | ATHAR",
  legalName: "ATHAR Brands",
  domain: "atharbrands.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://atharbrands.com").replace(/\/+$/, ""),
  email: "hello@atharbrands.com",
  locationAr: "الرياض، المملكة العربية السعودية",
  locationEn: "Riyadh, Saudi Arabia",
  /** Digits only, international format. Falls back to the placeholder number. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "966500000000").replace(/\D/g, ""),
  tagline: "نبني علامات تجارية لا تُرى فقط… بل تُتذكر",
  subtagline:
    "في أثر، نصنع الهويات والاستراتيجيات التي تمنح الشركات حضورًا واضحًا، وشخصية مميزة، وتجربة تترك أثرًا طويلًا في السوق.",
  positioningAr: "استوديو سعودي لبناء العلامات التجارية يخدم المشاريع الطموحة في السعودية والخليج.",
  positioningEn: "Saudi-born Brand Studio serving Saudi Arabia & GCC",
  taglineEn: "Legacy in Every Impact",
  essenceAr: "أثر يعبّر عن ما نتركه من قيمة؛ ما يصنع الفرق، وما يستمر بعدنا.",
  essenceEn: "ATHAR is the impact we leave — the value we create, the legacy that endures.",
  sealMottoEn: "LEGACY IN EVERY IMPACT",
} as const;

/** Primary navigation — labels map to in-page section ids. */
export const NAV_LINKS = [
  { label: "الرئيسية", href: "#home" },
  { label: "من نحن", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "المنهجية", href: "#methodology" },
  { label: "الأعمال", href: "#work" },
  { label: "اكتشف احتياجك", href: "#discovery" },
  { label: "تواصل معنا", href: "#contact" },
] as const;

/** English accent words shown in the hero side card. */
export const HERO_KEYWORDS = ["Strategy", "Identity", "Experience", "Impact"] as const;

/** Service options offered in the contact form select. */
export const SERVICE_OPTIONS = [
  "استراتيجية العلامة",
  "تصميم الهوية البصرية",
  "تصميم شعار",
  "تسمية المشاريع",
  "بروفايل شركة",
  "موقع تعريفي",
  "قوالب سوشال ميديا",
  "تغليف منتج",
  "إطلاق علامة",
  "أخرى",
] as const;

/** Budget ranges offered in the contact form select. */
export const BUDGET_OPTIONS = [
  "أقل من 5,000 ريال",
  "5,000 - 10,000 ريال",
  "10,000 - 25,000 ريال",
  "أكثر من 25,000 ريال",
] as const;

/** Official brand palette (hex), available for inline use / OG image. */
/** Legacy token aliases (kept for compatibility) mapped to the board palette. */
export const BRAND_COLORS = {
  midnight: "#0F1113",
  gold: "#D4AF7A",
  ivory: "#F2EFE6",
  sand: "#7A6955",
  sage: "#555B50",
} as const;

/** Official brand board palette — name + code (used by the Color Palette section). */
export const BRAND_PALETTE = [
  { nameEn: "Champagne Gold", nameAr: "ذهبي شامبين", hex: "#D4AF7A" },
  { nameEn: "Ivory", nameAr: "عاجي", hex: "#F2EFE6" },
  { nameEn: "Charcoal", nameAr: "فحمي", hex: "#0F1113" },
  { nameEn: "Warm Taupe", nameAr: "بُنّي دافئ", hex: "#7A6955" },
  { nameEn: "Olive Gray", nameAr: "رمادي زيتي", hex: "#555B50" },
] as const;
