import type { Metadata } from "next";
import { Methodology } from "@/components/sections/Methodology";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "المنهجية",
  description: "منهجية أثر — رحلة من خمس مراحل: نكتشف، نحدد، نبني، نصمم، نطلق.",
};

export default function MethodologyPage() {
  return (
    <>
      <Methodology />
      <CTA />
    </>
  );
}
