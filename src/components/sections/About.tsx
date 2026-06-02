import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

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
    <section id="about" className="bg-ivory py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle align="start" eyebrow="About" title="من نحن" />
              <p className="text-midnight/70 mt-6 text-lg leading-relaxed">
                أثر هو استوديو سعودي متخصص في بناء العلامات التجارية من الفكرة إلى التجربة. نساعد
                الشركات الناشئة والمنشآت الطموحة على تحويل رؤيتها إلى هوية واضحة، ورسالة مؤثرة،
                وحضور بصري يرسخ في الذاكرة.
              </p>
              <div className="from-gold mt-8 h-px w-28 bg-gradient-to-l to-transparent" />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              {PILLARS.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 80}>
                  <div className="card-lift border-midnight/10 hover:border-gold/40 flex items-start gap-5 rounded-2xl border bg-white p-6 hover:shadow-[0_30px_60px_-36px_rgba(13,27,42,0.3)]">
                    <span className="bg-gold/10 text-gold-deep grid size-12 shrink-0 place-items-center rounded-xl">
                      <Icon name={pillar.icon} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-midnight text-lg">{pillar.title}</h3>
                      <p className="text-midnight/60 mt-1.5 text-sm leading-relaxed">
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
