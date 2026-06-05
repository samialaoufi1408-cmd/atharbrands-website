import type { Metadata } from "next";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "الأعمال",
  description: "أعمال تصورية تعرض أسلوب أثر في بناء العلامات عبر قطاعات مختلفة.",
};

export default function WorkPage() {
  return (
    <>
      <CaseStudies />
      <CTA />
    </>
  );
}
