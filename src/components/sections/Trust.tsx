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
    <section id="trust" className="bg-midnight text-ivory relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.05] h-full w-full" id="trust-geo" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionTitle tone="light" eyebrow="Why ATHAR" title="لماذا يختار العملاء أثر؟" />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {TRUST.map((point, index) => (
            <Reveal key={point} delay={index * 50}>
              <div className="border-ivory/10 bg-ivory/[0.03] hover:border-gold/30 flex items-center gap-4 rounded-xl border p-5 transition-colors">
                <span className="bg-gold/15 text-gold grid size-9 shrink-0 place-items-center rounded-full">
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
