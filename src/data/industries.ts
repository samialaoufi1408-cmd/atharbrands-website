export interface Industry {
  id: string;
  title: string;
  /** Icon key resolved by components/ui/Icon.tsx */
  icon: string;
}

export const INDUSTRIES: Industry[] = [
  { id: "food", title: "المطاعم والمقاهي", icon: "restaurant" },
  { id: "medical", title: "العيادات والمراكز الطبية", icon: "clinic" },
  { id: "realestate", title: "العقار والمقاولات", icon: "building" },
  { id: "tech", title: "الشركات التقنية", icon: "tech" },
  { id: "retail", title: "المتاجر والمنتجات", icon: "retail" },
  { id: "luxury", title: "المشاريع الفاخرة", icon: "luxury" },
  { id: "startup", title: "الجهات الناشئة", icon: "startup" },
  { id: "services", title: "شركات الخدمات", icon: "services" },
];
