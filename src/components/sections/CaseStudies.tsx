import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";

function WorkCard({ study, delay }: { study: CaseStudy; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border border-transparent bg-white shadow-[0_22px_55px_-34px_rgba(0,0,0,0.6)] hover:border-gold/45">
        {/* emblem */}
        <div
          className="relative grid h-28 place-items-center overflow-hidden"
          style={{ background: study.emblem.bg }}
        >
          <span
            className="absolute right-4 top-3 font-latin text-xs font-medium"
            style={{ color: study.emblem.ink, opacity: 0.55 }}
          >
            {study.index}
          </span>
          <span className="font-kufi text-4xl" style={{ color: study.emblem.ink }}>
            {study.monogram}
          </span>
          <span
            className="absolute bottom-3 left-4 size-2 rounded-full"
            style={{ background: study.emblem.accent }}
          />
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-kufi text-lg text-midnight">{study.nameAr}</h3>
              <span className="label-latin text-[0.55rem] text-midnight/40">{study.nameEn}</span>
            </div>
            <span className="shrink-0 rounded-full border border-gold/30 bg-gold/[0.06] px-2.5 py-1 text-[0.6rem] text-gold-deep">
              {study.category}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-midnight/60">{study.description}</p>

          <div className="mt-4 rounded-lg bg-midnight/[0.03] p-3">
            <p className="text-[0.65rem] font-medium text-gold-deep">فكرة الشعار</p>
            <p className="mt-1 text-xs leading-relaxed text-midnight/65">{study.logoIdea}</p>
          </div>

          <div className="mt-4">
            <p className="text-[0.65rem] font-medium text-midnight/45">الألوان</p>
            <div className="mt-1.5 flex gap-1.5">
              {study.swatches.map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="h-6 flex-1 rounded ring-1 ring-inset ring-midnight/10"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <p className="text-[0.65rem] font-medium text-midnight/45">التطبيقات</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {study.applications.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-midnight/10 bg-midnight/[0.03] px-2.5 py-1 text-[0.65rem] text-midnight/60"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative overflow-hidden bg-midnight py-24 text-ivory lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="work-geo" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Selected Work"
            title="أعمال تصورية"
            description="مشاريع هوية تصورية تعرض أسلوب أثر عبر القطاعات — وليست مشاريع عملاء حقيقيين."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, index) => (
            <WorkCard key={study.id} study={study} delay={(index % 3) * 60} />
          ))}
        </div>
      </Container>
    </section>
  );
}
