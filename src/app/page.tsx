import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Methodology } from "@/components/sections/Methodology";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { DiscoveryQuiz } from "@/components/sections/DiscoveryQuiz";
import { EstimateCalculator } from "@/components/sections/EstimateCalculator";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Methodology />
      <CaseStudies />
      <DiscoveryQuiz />
      <EstimateCalculator />
      <CTA />
      <Contact />
    </>
  );
}
