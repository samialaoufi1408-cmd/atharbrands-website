import { METHODOLOGY } from "@/data/methodology";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

export function Methodology() {
  return (
    <section id="methodology" className="bg-ivory-deep py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Methodology"
            title="منهجية أثر"
            description="رحلة من خمس مراحل، من فهم السوق إلى لحظة الإطلاق."
          />
        </Reveal>

        <div className="relative mt-20">
          {/* Connecting hairline — vertical on mobile (right edge, RTL) / horizontal track on desktop */}
          <span className="pointer-events-none absolute inset-y-2 right-7 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:inset-y-auto lg:right-0 lg:left-0 lg:top-12 lg:h-px lg:w-full lg:bg-gradient-to-l" />

          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {METHODOLOGY.map((step, index) => (
              <Reveal key={step.number} delay={index * 70}>
                <li className="relative flex h-full gap-5 pr-16 lg:block lg:pr-0">
                  {/* Huge transparent gold step number */}
                  <span className="label-latin pointer-events-none absolute right-0 top-0 select-none font-latin text-6xl font-bold leading-none text-gold/20 lg:static lg:text-7xl">
                    {step.number}
                  </span>

                  {/* Node marker on the track */}
                  <span className="absolute right-[1.6rem] top-3 hidden size-2.5 rounded-full bg-gold/70 ring-4 ring-ivory-deep lg:right-auto lg:left-0 lg:top-[1.85rem] lg:block" />

                  <div className="lg:mt-9">
                    <h3 className="text-xl text-midnight">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-midnight/60">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
