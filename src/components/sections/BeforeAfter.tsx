import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

const BEFORE = ["شعار غير واضح", "ألوان عشوائية", "ظهور غير متناسق", "ضعف الثقة", "صعوبة التذكر"];

const AFTER = ["هوية واضحة", "ألوان وخطوط ثابتة", "حضور احترافي", "ثقة أعلى", "علامة قابلة للتوسع"];

export function BeforeAfter() {
  return (
    <section id="before-after" className="bg-ivory py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Transformation" title="قبل وبعد بناء الهوية" />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="border-midnight/10 bg-ivory-deep h-full rounded-2xl border p-7 sm:p-9">
              <span className="text-midnight/45 text-xs font-semibold tracking-[0.28em] uppercase">
                Before
              </span>
              <h3 className="text-midnight/70 mt-2 text-2xl">قبل</h3>
              <div className="mt-6 flex h-20 items-center gap-3">
                <span className="bg-midnight/15 size-11 rotate-6 rounded" />
                <span className="bg-midnight/25 size-9 -rotate-6 rounded-full" />
                <span className="bg-midnight/10 h-2.5 w-16 rounded" />
                <span className="bg-midnight/20 size-10 rotate-12 rounded" />
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {BEFORE.map((item) => (
                  <li key={item} className="text-midnight/55 flex items-center gap-3">
                    <span className="bg-midnight/10 grid size-5 shrink-0 place-items-center rounded-full">
                      <Icon name="close" className="text-midnight/40 size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-gold/30 h-full rounded-2xl border bg-white p-7 shadow-[0_40px_80px_-50px_rgba(200,169,106,0.6)] sm:p-9">
              <span className="text-gold text-xs font-semibold tracking-[0.28em] uppercase">
                After
              </span>
              <h3 className="text-midnight mt-2 text-2xl">بعد</h3>
              <div className="mt-6 flex h-20 items-center gap-3">
                <span className="bg-midnight size-11 rounded-lg" />
                <span className="bg-gold size-11 rounded-lg" />
                <span className="bg-sage size-11 rounded-lg" />
                <span className="bg-sand size-11 rounded-lg" />
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {AFTER.map((item) => (
                  <li key={item} className="text-midnight flex items-center gap-3">
                    <span className="bg-gold/15 grid size-5 shrink-0 place-items-center rounded-full">
                      <Icon name="check" className="text-gold-deep size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
