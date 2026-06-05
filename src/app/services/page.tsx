import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "استراتيجية العلامة، تسمية المشاريع، تصميم الهوية البصرية، بروفايل الشركات، المواقع التعريفية، وإطلاق العلامة.",
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <CTA />
    </>
  );
}
