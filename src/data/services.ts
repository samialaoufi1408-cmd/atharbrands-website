export interface Service {
  id: string;
  title: string;
  description: string;
  /** Icon key resolved by components/ui/Icon.tsx */
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: "strategy",
    title: "استراتيجية العلامة",
    description: "نحدد جوهر العلامة، موقعها في السوق، شخصيتها، رسالتها، ونقاط تميزها.",
    icon: "strategy",
  },
  {
    id: "identity",
    title: "تصميم الهوية البصرية",
    description: "نصمم الشعار، الألوان، الخطوط، الأنماط، ودليل الاستخدام الكامل.",
    icon: "identity",
  },
  {
    id: "naming",
    title: "تسمية المشاريع",
    description: "نبتكر أسماء تجارية قابلة للتذكر، مناسبة للسوق، وقابلة للتحول إلى براند قوي.",
    icon: "naming",
  },
  {
    id: "profile",
    title: "بروفايل الشركات",
    description: "نصمم ملفات تعريف احترافية تعكس قيمة الشركة وتناسب المستثمرين والعملاء.",
    icon: "profile",
  },
  {
    id: "digital",
    title: "التجربة الرقمية",
    description: "نصمم واجهات ومواقع تعريفية تعكس شخصية العلامة وتحوّل الزوار إلى عملاء.",
    icon: "web",
  },
  {
    id: "launch",
    title: "إطلاق العلامة",
    description: "نجهز المواد البصرية والتسويقية اللازمة لإطلاق العلامة بثقة واحتراف.",
    icon: "launch",
  },
];
