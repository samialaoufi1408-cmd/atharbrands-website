import type { Metadata } from "next";
import { DiscoveryQuiz } from "@/components/sections/DiscoveryQuiz";
import { EstimateCalculator } from "@/components/sections/EstimateCalculator";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "اكتشف احتياجك",
  description:
    "أجب عن أسئلة سريعة لنقترح عليك نقطة انطلاق مناسبة، واطلب تصورًا مبدئيًا لمشروعك.",
};

export default function DiscoveryPage() {
  return (
    <>
      <DiscoveryQuiz />
      <EstimateCalculator />
      <CTA />
    </>
  );
}
