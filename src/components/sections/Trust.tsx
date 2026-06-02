import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { Icon } from "../ui/Icon";

const TRUST = [
  "نربط الجمال بالاستراتيجية",
  "نصمم هويات قابلة للنمو",
  "نفهم السوق السعودي والخليجي",
  "نهتم بالتفاصيل الصغيرة",
  "نسلم ملفات منظمة",
  "نوفر دليل هوية واضح",
  "نوفر صيغًا للطباعة والويب",
  "دعم بعد التسليم لمدة 14 يوم",
];

export function Trust() {
  return (
    <section
      id="trust"
      className="relative isolate overflow-hidden bg-midnight py-24 text-ivory lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="trust-geo" />
      </div>
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[34rem] w-[34rem] rounded-full bg-sage/10 blur-[150px]" />

      <Container className="relative">
        <Reveal>
          <SectionTitle tone="light" eyebrow="Why ATHAR" title="لماذا يختار العملاء أثر؟" />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          {TRUST.map((point, index) => (
            <Reveal key={point} delay={index * 50}>
              <div className="card-lift flex items-center gap-4 rounded-card border border-ivory/10 bg-ivory/[0.03] p-5 hover:border-gold/30 hover:bg-ivory/[0.06]">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                  <Icon name="check" className="size-5" />
                </span>
                <span className="text-ivory/85">{point}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
