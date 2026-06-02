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
      className="bg-midnight text-ivory relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.05] h-full w-full" id="services-geo" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Services"
            title="خدماتنا"
            description="من الاستراتيجية إلى الإطلاق — منظومة متكاملة لبناء علامة تجارية راسخة."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <Card tone="dark" className="group h-full">
                <span className="border-gold/20 bg-gold/[0.06] text-gold group-hover:bg-gold/15 grid size-12 place-items-center rounded-xl border transition-colors">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <h3 className="text-ivory mt-6 text-xl">{service.title}</h3>
                <p className="text-ivory/65 mt-3 text-sm leading-relaxed">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
