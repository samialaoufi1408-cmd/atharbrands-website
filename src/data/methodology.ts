export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
}

export const METHODOLOGY: MethodologyStep[] = [
  {
    number: "01",
    title: "نكتشف",
    description: "نفهم المشروع، الجمهور، السوق، المنافسين، ونقاط التميز.",
  },
  {
    number: "02",
    title: "نحدد",
    description: "نبني التموضع، شخصية العلامة، رسالتها، ونبرة صوتها.",
  },
  {
    number: "03",
    title: "نبني",
    description: "نبني أساس العلامة: الاسم، الرسالة، والاتجاه البصري قبل التصميم.",
  },
  {
    number: "04",
    title: "نصمم",
    description: "نحول الاستراتيجية إلى شعار وهوية ونظام بصري متكامل.",
  },
  {
    number: "05",
    title: "نطلق",
    description: "نسلم الملفات ودليل الاستخدام والتطبيقات الجاهزة، ونطلق العلامة بثقة.",
  },
];
