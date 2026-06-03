import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { AtharSymbol, AtharSeal } from "../ui/Logo";

function MiniWordmark({ size = "sm" }: { size?: "sm" | "xs" }) {
  const ar = size === "xs" ? "text-[0.55rem]" : "text-[0.65rem]";
  const en = size === "xs" ? "text-[0.45rem]" : "text-[0.5rem]";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("font-kufi text-ivory", ar)}>أثر</span>
      <span className="h-2.5 w-px bg-gold/45" />
      <span className={cn("font-serif tracking-[0.22em] text-gold", en)}>ATHAR</span>
    </span>
  );
}

function Tile({
  ar,
  en,
  tone,
  delay = 0,
  children,
}: {
  ar: string;
  en: string;
  tone?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <figure className="card-lift group h-full overflow-hidden rounded-card border border-ivory/10 bg-charcoal-700 hover:border-gold/40">
        <div className={cn("relative grid aspect-[4/3] place-items-center overflow-hidden p-6", tone)}>
          {children}
        </div>
        <figcaption className="flex items-center justify-between gap-3 border-t border-ivory/[0.08] px-5 py-4">
          <span className="text-sm text-ivory">{ar}</span>
          <span className="label-latin text-[0.5rem] text-gold/70">{en}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function BrandApplications() {
  return (
    <section id="work" className="relative overflow-hidden bg-charcoal py-24 text-ivory lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="apps-geo" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Brand Applications"
            title="تطبيقات الهوية"
            description="الهوية مطبّقة على نقاط التواصل — بنفس الفخامة الهادئة والإضاءة الداكنة."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Business card */}
          <Tile ar="بطاقة عمل" en="Business Card" delay={0} tone="bg-gradient-to-br from-charcoal to-charcoal-700">
            <div className="relative">
              <div className="absolute -top-3 -right-3 h-24 w-40 rotate-6 rounded-lg bg-black/40 ring-1 ring-gold/10" />
              <div className="relative flex h-24 w-40 flex-col justify-between rounded-lg bg-charcoal-700 p-3 shadow-mock ring-1 ring-gold/20">
                <AtharSymbol className="h-7 w-auto text-gold" />
                <MiniWordmark size="xs" />
              </div>
            </div>
          </Tile>

          {/* Presentation cover */}
          <Tile ar="غلاف عرض تقديمي" en="Presentation Cover" delay={70} tone="bg-charcoal">
            <div className="flex h-40 w-32 flex-col items-center justify-center gap-3 rounded-md bg-gradient-to-b from-charcoal-700 to-charcoal shadow-mock ring-1 ring-gold/15">
              <AtharSymbol className="h-16 w-auto text-gold" />
              <MiniWordmark size="xs" />
              <span className="label-latin text-[0.4rem] text-ivory/40">Legacy in Every Impact</span>
            </div>
          </Tile>

          {/* Envelope */}
          <Tile ar="ظرف" en="Envelope" delay={140} tone="bg-charcoal-700">
            <div className="relative h-24 w-40 rounded-md bg-charcoal shadow-mock ring-1 ring-gold/15">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 160 96"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 4 L80 54 L158 4" fill="none" stroke="#D4AF7A" strokeOpacity="0.35" strokeWidth="1" />
              </svg>
              <AtharSeal
                id="env-seal"
                className="absolute left-1/2 top-[58%] size-11 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </Tile>

          {/* Embossed folder */}
          <Tile ar="ملف بارز" en="Embossed Folder" delay={0} tone="bg-charcoal">
            <div className="emboss grid h-36 w-40 place-items-center rounded-md bg-charcoal-700 ring-1 ring-white/5">
              <AtharSymbol className="h-20 w-auto text-[#0a0c0d] drop-shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
            </div>
          </Tile>

          {/* Notebook */}
          <Tile ar="دفتر" en="Notebook" delay={70} tone="bg-charcoal-700">
            <div className="relative h-40 w-32 overflow-hidden rounded-md bg-gradient-to-b from-charcoal-700 to-charcoal shadow-mock ring-1 ring-gold/15">
              <span className="absolute inset-y-0 right-3 w-1 bg-black/40" />
              <div className="grid h-full place-items-center gap-3">
                <AtharSymbol className="h-14 w-auto text-gold" />
                <MiniWordmark size="xs" />
              </div>
            </div>
          </Tile>

          {/* Storefront */}
          <Tile ar="واجهة متجر / لافتة" en="Storefront" delay={140} tone="bg-gradient-to-b from-charcoal to-black">
            <div className="relative flex h-24 w-[16rem] max-w-[88%] items-center justify-center gap-3 rounded-md bg-charcoal-700 px-6 shadow-mock ring-1 ring-gold/20">
              <AtharSymbol className="h-10 w-auto text-gold drop-shadow-[0_0_10px_rgba(212,175,122,0.5)]" />
              <span className="font-kufi text-lg text-ivory">أثر</span>
              <span className="h-5 w-px bg-gold/50" />
              <span className="font-serif text-base tracking-[0.25em] text-gold drop-shadow-[0_0_8px_rgba(212,175,122,0.45)]">
                ATHAR
              </span>
            </div>
          </Tile>

          {/* Website hero preview */}
          <Tile ar="واجهة الموقع" en="Website Hero" delay={0} tone="bg-charcoal">
            <div className="w-full max-w-[17rem] overflow-hidden rounded-md bg-charcoal-700 shadow-mock ring-1 ring-gold/15">
              <div className="flex items-center gap-1 border-b border-ivory/[0.08] px-2.5 py-1.5">
                <span className="size-1.5 rounded-full bg-ivory/20" />
                <span className="size-1.5 rounded-full bg-ivory/20" />
                <span className="size-1.5 rounded-full bg-ivory/20" />
              </div>
              <div className="relative grid h-28 place-items-center">
                <AtharSymbol className="h-16 w-auto text-gold" />
                <span className="absolute bottom-3 right-3 font-serif text-[0.5rem] tracking-[0.2em] text-gold">
                  LEGACY IN EVERY IMPACT
                </span>
              </div>
            </div>
          </Tile>
        </div>
      </Container>
    </section>
  );
}
