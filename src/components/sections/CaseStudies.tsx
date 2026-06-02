import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

/** Pure CSS/typography mockups — no external images. */
function CaseMockup({ study }: { study: CaseStudy }) {
  const { palette, monogram, mockup } = study;
  const frame =
    "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl";

  if (mockup === "card") {
    return (
      <div className={frame} style={{ background: palette.bg }}>
        <div
          className="absolute h-28 w-44 translate-x-5 translate-y-5 rotate-[-7deg] rounded-lg opacity-15"
          style={{ background: palette.ink }}
        />
        <div
          className="relative flex h-28 w-44 flex-col justify-between rounded-lg p-3.5 shadow-xl"
          style={{ background: palette.ink }}
        >
          <span className="font-kufi text-2xl" style={{ color: palette.bg }}>
            {monogram}
          </span>
          <div className="space-y-1.5">
            <span className="block h-1 w-16 rounded" style={{ background: palette.accent }} />
            <span
              className="block h-1 w-10 rounded opacity-40"
              style={{ background: palette.bg }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (mockup === "signage") {
    return (
      <div className={frame} style={{ background: palette.bg }}>
        <div
          className="absolute inset-x-8 top-8 flex h-16 items-center justify-center rounded-md"
          style={{ background: palette.ink }}
        >
          <span className="font-kufi text-3xl" style={{ color: palette.bg }}>
            {monogram}
          </span>
        </div>
        <div className="absolute inset-x-8 top-[6.5rem] flex h-3 overflow-hidden rounded-b">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="h-full flex-1"
              style={{ background: i % 2 ? palette.accent : palette.ink }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-0 left-1/2 h-10 w-12 -translate-x-1/2 rounded-t opacity-30"
          style={{ background: palette.ink }}
        />
      </div>
    );
  }

  if (mockup === "seal") {
    return (
      <div className={frame} style={{ background: palette.bg }}>
        <div
          className="relative grid size-28 place-items-center rounded-full border-2"
          style={{ borderColor: palette.accent }}
        >
          <div
            className="absolute inset-2 rounded-full border opacity-30"
            style={{ borderColor: palette.ink }}
          />
          <span className="font-kufi text-4xl" style={{ color: palette.ink }}>
            {monogram}
          </span>
        </div>
      </div>
    );
  }

  if (mockup === "phone") {
    return (
      <div className={frame} style={{ background: palette.bg }}>
        <div
          className="relative h-44 w-24 rounded-[1.4rem] border-4"
          style={{ borderColor: palette.ink, background: palette.bg }}
        >
          <span
            className="absolute top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full opacity-50"
            style={{ background: palette.ink }}
          />
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <span
              className="font-kufi grid size-12 place-items-center rounded-xl text-2xl"
              style={{ background: palette.accent, color: palette.bg }}
            >
              {monogram}
            </span>
            <span className="h-1.5 w-12 rounded opacity-40" style={{ background: palette.ink }} />
            <span className="h-1.5 w-8 rounded opacity-25" style={{ background: palette.ink }} />
          </div>
        </div>
      </div>
    );
  }

  // menu
  return (
    <div className={frame} style={{ background: palette.bg }}>
      <div
        className="flex h-44 w-32 flex-col rounded-md p-4 shadow-xl"
        style={{ background: palette.ink }}
      >
        <span className="font-kufi text-center text-3xl" style={{ color: palette.bg }}>
          {monogram}
        </span>
        <span className="mx-auto mt-2 h-px w-12" style={{ background: palette.accent }} />
        <div className="mt-4 space-y-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span
                className="h-1.5 rounded opacity-50"
                style={{ width: `${52 - i * 6}%`, background: palette.bg }}
              />
              <span className="h-1.5 w-4 rounded" style={{ background: palette.accent }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="bg-midnight text-ivory py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Selected Work"
            title="أعمال تصورية"
            description="هذه أعمال تصورية لعرض أسلوب أثر، وليست مشاريع عملاء حقيقيين."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, index) => (
            <Reveal key={study.id} delay={index * 60}>
              <article className="card-lift group border-ivory/10 bg-ivory/[0.04] hover:border-gold/40 h-full overflow-hidden rounded-2xl border">
                <div className="p-4 pb-0">
                  <CaseMockup study={study} />
                </div>
                <div className="p-6 pt-5">
                  <span className="border-gold/25 bg-gold/[0.06] text-gold inline-block rounded-full border px-3 py-1 text-xs">
                    {study.tag}
                  </span>
                  <h3 className="text-ivory mt-3 text-lg">{study.title}</h3>
                  <p className="text-ivory/60 mt-2 text-sm leading-relaxed">{study.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
