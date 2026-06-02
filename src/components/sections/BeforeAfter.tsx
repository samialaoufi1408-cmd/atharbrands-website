import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { LogoMark } from "../ui/Logo";
import { Seal } from "../ui/Seal";

const BEFORE = ["شعار غير واضح", "ألوان عشوائية", "ظهور غير متناسق", "ضعف الثقة", "صعوبة التذكر"];

const AFTER = ["هوية واضحة", "ألوان وخطوط ثابتة", "حضور احترافي", "ثقة أعلى", "علامة قابلة للتوسع"];

export function BeforeAfter() {
  return (
    <section id="before-after" className="bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Transformation" title="قبل وبعد بناء الهوية" />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          {/* قبل — disorder */}
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-midnight/10 bg-ivory-deep p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="label-latin text-midnight/40">Before</span>
                <h3 className="font-kufi text-2xl text-midnight/65">قبل</h3>
              </div>

              {/* scattered, faded disorder */}
              <div className="relative mt-7 h-24 overflow-hidden rounded-button border border-midnight/5 bg-midnight/[0.02]">
                <span className="absolute left-6 top-5 size-11 rotate-6 rounded-lg bg-midnight/15" />
                <span className="absolute left-24 top-9 size-9 -rotate-12 rounded-full bg-midnight/25" />
                <span className="absolute right-10 top-4 size-10 rotate-12 rounded-lg bg-midnight/15" />
                <span className="absolute right-28 bottom-5 size-7 -rotate-6 rounded bg-midnight/20" />
                <span className="absolute bottom-7 left-1/3 h-px w-24 rotate-3 bg-midnight/20" />
              </div>

              <ul className="mt-7 flex flex-col gap-3.5">
                {BEFORE.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-midnight/55">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-midnight/[0.06]">
                      <Icon name="close" className="size-3 text-midnight/40" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* بعد — order */}
          <Reveal delay={100}>
            <div className="card-lift relative flex h-full flex-col overflow-hidden rounded-card border border-gold/30 bg-white p-7 shadow-gold sm:p-9">
              <Pattern
                className="pointer-events-none absolute inset-0 h-full w-full text-gold/[0.05]"
                id="ba-after-geo"
              />

              <div className="relative flex items-center justify-between">
                <span className="label-latin text-gold-deep">After</span>
                <h3 className="font-kufi text-2xl text-midnight">بعد</h3>
              </div>

              {/* ordered brand sheet: palette + seal + mark */}
              <div className="relative mt-7 flex items-center justify-between gap-4 rounded-button border border-gold/20 bg-ivory/60 p-4">
                <div className="flex gap-2.5">
                  <span className="size-9 rounded-lg bg-midnight ring-1 ring-inset ring-black/5" />
                  <span className="size-9 rounded-lg bg-gold ring-1 ring-inset ring-black/5" />
                  <span className="size-9 rounded-lg bg-sage ring-1 ring-inset ring-black/5" />
                  <span className="size-9 rounded-lg bg-sand ring-1 ring-inset ring-black/5" />
                </div>
                <div className="flex items-center gap-3">
                  <LogoMark className="h-6 w-6 text-gold" />
                  <Seal id="ba-seal" className="size-14" />
                </div>
              </div>

              <ul className="relative mt-7 flex flex-col gap-3.5">
                {AFTER.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-midnight">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/15">
                      <Icon name="check" className="size-3.5 text-gold-deep" />
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
