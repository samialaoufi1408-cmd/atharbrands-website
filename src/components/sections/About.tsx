import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";

const PILLARS = [
  {
    icon: "strategy",
    title: "استراتيجية واضحة",
    text: "قرارات مبنية على فهم السوق والجمهور، لا على الذوق وحده.",
  },
  {
    icon: "identity",
    title: "هوية بصرية مميزة",
    text: "نظام بصري متماسك يجعل علامتك سهلة التذكر والتمييز.",
  },
  {
    icon: "web",
    title: "تجربة علامة متكاملة",
    text: "حضور موحّد ومتناسق عبر كل نقطة تواصل مع عميلك.",
  },
];

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-charcoal-700 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.035]" id="about-geo" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle tone="light" align="start" eyebrow="About" title="من نحن" />
              <p className="mt-7 text-lg leading-relaxed text-ivory/70">
                أثر بيت خبرة لبناء العلامات التجارية من الاسم والاستراتيجية إلى الهوية والإطلاق.
                نساعد المشاريع الجادة على بناء حضور واضح، فاخر، وقابل للتذكر.
              </p>
              <div className="rule-gold mt-8 max-w-28" />
              <div className="mt-8 flex items-center gap-3.5">
                <Image
                  src="/brand/athar-v2/symbol.png"
                  alt=""
                  width={270}
                  height={178}
                  className="h-9 w-auto"
                />
                <div className="leading-tight">
                  <p className="font-kufi text-sm text-ink">أثر | ATHAR</p>
                  <p className="label-latin mt-1 text-[0.55rem] text-gold/80">Branding Studio · Riyadh</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {PILLARS.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 80}>
                  <div className="card-lift flex items-start gap-5 rounded-card border border-ink/10 bg-white p-6 shadow-soft hover:border-gold/45 hover:shadow-gold">
                    <span className="grid size-12 shrink-0 place-items-center rounded-button border border-gold/25 bg-gold/[0.08] text-gold">
                      <Icon name={pillar.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg text-ivory">{pillar.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ivory/60">{pillar.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
