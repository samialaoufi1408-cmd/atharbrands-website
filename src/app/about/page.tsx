import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "أثر بيت خبرة لبناء العلامات التجارية من الاسم والاستراتيجية إلى الهوية والإطلاق.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <CTA />
    </>
  );
}
