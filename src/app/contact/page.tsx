import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "أخبرنا عن مشروعك، وسنعود إليك بخطوة أولى واضحة نحو أثر يدوم.",
};

export default function ContactPage() {
  return <Contact />;
}
