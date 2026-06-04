"use client";

import { useState } from "react";
import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

/**
 * «أعمال تصورية لعرض أسلوب أثر» — a grid of INDEPENDENT conceptual client
 * brands. Each emblem uses the project's OWN palette (never أثر's identity),
 * rendered with pure CSS. "عرض المشروع" opens a brand sheet in a modal.
 */

/** A self-contained brand emblem built from the project's own colours. */
function Emblem({ study, feature = false }: { study: CaseStudy; feature?: boolean }) {
  const { bg, ink, accent } = study.emblem;
  return (
    <div
      className={`relative w-full overflow-hidden ${feature ? "aspect-[16/9] rounded-2xl" : "aspect-[4/3]"}`}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 36%, ${accent}26, transparent 62%)` }}
      />
      <span
        className="label-latin absolute right-5 top-5 text-[0.55rem]"
        style={{ color: ink, opacity: 0.55 }}
      >
        {study.nameEn}
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`grid place-items-center rounded-full border ${feature ? "size-28" : "size-20"}`}
          style={{ borderColor: `${accent}66` }}
        >
          <span
            className={`font-kufi leading-none ${feature ? "text-6xl" : "text-4xl"}`}
            style={{ color: accent }}
          >
            {study.monogram}
          </span>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
        {study.swatches.map((hex) => (
          <span
            key={hex}
            className="h-1.5 flex-1 rounded-full"
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Selected Work"
            title="أعمالنا"
            description="أعمال تصورية لعرض أسلوب أثر في بناء العلامات عبر قطاعات مختلفة — من المقاهي والعقار إلى العيادات والمنتجات."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, index) => (
            <Reveal key={study.id} delay={index * 70}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border border-ivory/10 bg-ivory/[0.025] hover:border-gold/40">
                <Emblem study={study} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 text-[0.7rem] text-gold/85">
                      {study.category}
                    </span>
                    <span className="label-latin text-[0.6rem] text-ivory/30">{study.index}</span>
                  </div>
                  <h3 className="mt-4 font-kufi text-xl text-ivory">{study.nameAr}</h3>
                  <span className="label-latin mt-1 text-[0.56rem] text-gold/55">
                    {study.nameEn}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/60">
                    {study.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive(study)}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm text-gold transition-colors hover:text-gold-soft"
                  >
                    عرض المشروع
                    <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ivory/35">
          * نماذج تصوّرية لأغراض العرض، تعكس أسلوب أثر ومعاييره في بناء الهوية.
        </p>
      </Container>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? `${active.nameAr} — عمل تصوري` : ""}
      >
        {active && (
          <div className="flex flex-col gap-6">
            <Emblem study={active} feature />

            <div>
              <span className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 text-[0.7rem] text-gold/85">
                {active.category}
              </span>
              <h3 className="mt-4 font-kufi text-2xl text-ivory">{active.nameAr}</h3>
              <span className="label-latin text-[0.6rem] text-gold/55">{active.nameEn}</span>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{active.description}</p>
            </div>

            <div>
              <h4 className="label-latin text-[0.6rem] text-gold/70">فكرة الشعار</h4>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">{active.logoIdea}</p>
            </div>

            <div>
              <h4 className="label-latin text-[0.6rem] text-gold/70">الألوان</h4>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {active.swatches.map((hex) => (
                  <span key={hex} className="flex items-center gap-2 text-xs text-ivory/55">
                    <span
                      className="size-5 rounded-full border border-ivory/15"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="label-latin text-[0.55rem]">{hex}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="label-latin text-[0.6rem] text-gold/70">التطبيقات</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-button border border-ivory/12 bg-ivory/[0.04] px-3 py-1.5 text-xs text-ivory/70"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <Button href="#contact" onClick={() => setActive(null)} className="w-full">
              ابدأ مشروعًا مثله
            </Button>
          </div>
        )}
      </Modal>
    </section>
  );
}
