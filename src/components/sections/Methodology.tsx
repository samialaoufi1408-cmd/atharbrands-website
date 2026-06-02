import { METHODOLOGY } from "@/data/methodology";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

export function Methodology() {
  return (
    <section id="methodology" className="bg-ivory-deep py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Methodology"
            title="منهجية أثر"
            description="رحلة من خمس مراحل، من فهم السوق إلى لحظة الإطلاق."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {METHODOLOGY.map((step, index) => (
            <Reveal key={step.number} delay={index * 70}>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-gold font-serif text-4xl leading-none">{step.number}</span>
                  <span className="bg-midnight/15 h-px flex-1" />
                </div>
                <h3 className="text-midnight mt-5 text-xl">{step.title}</h3>
                <p className="text-midnight/60 mt-2.5 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
