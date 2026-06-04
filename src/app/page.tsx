import { Hero } from "@/components/sections/Hero";
import { BrandSystem } from "@/components/sections/BrandSystem";
import { ColorPalette } from "@/components/sections/ColorPalette";
import { Typography } from "@/components/sections/Typography";
import { PatternShowcase } from "@/components/sections/PatternShowcase";
import { BrandApplications } from "@/components/sections/BrandApplications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandSystem />
      <ColorPalette />
      <Typography />
      <PatternShowcase />
      <BrandApplications />
      <Contact />
    </>
  );
}
