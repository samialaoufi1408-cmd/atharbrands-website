import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Methodology } from "@/components/sections/Methodology";
import { Packages } from "@/components/sections/Packages";
import { DiscoveryQuiz } from "@/components/sections/DiscoveryQuiz";
import { EstimateCalculator } from "@/components/sections/EstimateCalculator";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Industries } from "@/components/sections/Industries";
import { Trust } from "@/components/sections/Trust";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { Faq } from "@/components/sections/Faq";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Methodology />
      <Packages />
      <DiscoveryQuiz />
      <EstimateCalculator />
      <CaseStudies />
      <BeforeAfter />
      <Industries />
      <Trust />
      <LeadMagnet />
      <Faq />
      <CTA />
      <Contact />
    </>
  );
}
