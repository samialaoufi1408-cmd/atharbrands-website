import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Monogram } from "../ui/Logo";

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
    <section id="about" className="bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle align="start" eyebrow="About" title="من نحن" />
              <p className="mt-7 text-lg leading-relaxed text-midnight/70">
                أثر هو استوديو سعودي متخصص في بناء العلامات التجارية من الفكرة إلى التجربة. نساعد
                الشركات الناشئة والمنشآت الطموحة على تحويل رؤيتها إلى هوية واضحة، ورسالة مؤثرة،
                وحضور بصري يرسخ في الذاكرة.
              </p>
              <div className="rule-gold mt-8 max-w-28" />
              <div className="mt-8 flex items-center gap-3.5">
                <Monogram className="size-12" />
                <div className="leading-tight">
                  <p className="font-kufi text-sm text-midnight">أثر | ATHAR</p>
                  <p className="label-latin mt-1 text-[0.55rem] text-gold-deep/80">
                    Saudi Brand Studio
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {PILLARS.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 80}>
                  <div className="card-lift flex items-start gap-5 rounded-card border border-midnight/10 bg-white p-6 hover:border-gold/45 hover:shadow-gold">
                    <span className="grid size-12 shrink-0 place-items-center rounded-button border border-gold/25 bg-gold/[0.07] text-gold-deep">
                      <Icon name={pillar.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg text-midnight">{pillar.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-midnight/60">
                        {pillar.text}
                      </p>
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
