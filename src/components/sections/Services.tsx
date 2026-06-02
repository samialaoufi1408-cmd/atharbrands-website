import { SERVICES } from "@/data/services";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { Icon } from "../ui/Icon";

export function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-midnight py-24 text-ivory lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="services-geo" />
      </div>
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-[150px]" />

      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Services"
            title="خدماتنا"
            description="من الاستراتيجية إلى الإطلاق — منظومة متكاملة لبناء علامة تجارية راسخة."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <Card tone="dark" className="group relative h-full overflow-hidden">
                {/* Thin gold hairline at the card's top edge */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/55 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold/55">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <span className="label-latin text-sm text-gold/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-xl text-ivory">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
