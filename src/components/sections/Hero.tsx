import { SITE, BRAND_COLORS } from "@/lib/constants";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { LogoMark, Monogram } from "../ui/Logo";
import { Seal } from "../ui/Seal";

const PALETTE = [
  { name: "Midnight", hex: BRAND_COLORS.midnight },
  { name: "Sand", hex: BRAND_COLORS.sand },
  { name: "Sage", hex: BRAND_COLORS.sage },
  { name: "Ivory", hex: BRAND_COLORS.ivory },
  { name: "Gold", hex: BRAND_COLORS.gold },
];

const FRAMEWORK = [
  { en: "Strategy", ar: "استراتيجية" },
  { en: "Identity", ar: "هوية" },
  { en: "Experience", ar: "تجربة" },
  { en: "Impact", ar: "أثر" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-midnight">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="hero-geo" />
      </div>
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[42rem] w-[42rem] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[32rem] w-[32rem] rounded-full bg-sage/10 blur-[140px]" />

      <Container className="relative grid items-center gap-12 pb-24 pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-44">
        {/* Text column */}
        <div className="lg:col-span-6">
          <div
            className="animate-rise inline-flex items-center gap-3"
            style={{ animationDelay: "0ms" }}
          >
            <Monogram className="size-11" />
            <span className="flex flex-col leading-none">
              <span className="font-kufi text-2xl font-bold text-ivory">
                أثر <span className="font-normal text-gold/80">| ATHAR</span>
              </span>
              <span className="label-latin mt-1.5 text-[0.58rem] text-ivory/45">
                Saudi Brand Studio
              </span>
            </span>
          </div>

          <h1
            className="animate-rise mt-8 text-balance text-4xl font-semibold leading-[1.16] text-ivory sm:text-5xl md:text-[3.35rem]"
            style={{ animationDelay: "80ms" }}
          >
            نبني علامات تجارية لا تُرى فقط
            <span className="text-gold-gradient">… بل تُتذكر</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ivory/70"
            style={{ animationDelay: "160ms" }}
          >
            {SITE.subtagline}
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#contact" size="lg">
              ابدأ مشروعك
              <Icon name="arrow" className="size-4" />
            </Button>
            <Button href="#methodology" variant="outlineLight" size="lg">
              شاهد المنهجية
            </Button>
          </div>

          <p
            className="animate-rise mt-9 flex items-center gap-2.5 text-sm text-ivory/55"
            style={{ animationDelay: "320ms" }}
          >
            <span className="size-1.5 rounded-full bg-gold" />
            {SITE.positioningAr}
          </p>
        </div>

        {/* Brand sheet board */}
        <div className="lg:col-span-6">
          <div
            className="animate-rise relative overflow-hidden rounded-card border border-gold/20 bg-midnight-700/60 p-5 shadow-soft backdrop-blur-sm sm:p-6"
            style={{ animationDelay: "220ms" }}
          >
            <Pattern
              className="pointer-events-none absolute inset-0 h-full w-full text-gold/[0.05]"
              id="hero-board-geo"
            />

            <div className="relative flex items-center justify-between">
              <Monogram className="size-12" />
              <div className="text-left">
                <p className="label-latin text-[0.58rem] text-gold/80">Brand Sheet</p>
                <p className="font-latin text-xs text-ivory/45">№ 001 — ATHAR</p>
              </div>
            </div>

            <div className="relative mt-6">
              <p className="label-latin mb-2.5 text-[0.55rem] text-ivory/40">Palette</p>
              <div className="flex gap-2.5">
                {PALETTE.map((c) => (
                  <div key={c.hex} className="flex-1">
                    <div
                      className="h-10 rounded-lg ring-1 ring-inset ring-white/10"
                      style={{ background: c.hex }}
                    />
                    <p className="mt-1.5 font-latin text-[0.5rem] text-ivory/40">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-5 gap-3">
              <div className="col-span-3 rounded-xl border border-ivory/10 bg-ivory/[0.03] p-4">
                <p className="label-latin mb-3 text-[0.55rem] text-ivory/40">Framework</p>
                <ul className="flex flex-col gap-2">
                  {FRAMEWORK.map((f, i) => (
                    <li key={f.en} className="flex items-baseline justify-between gap-2">
                      <span className="flex items-baseline gap-2">
                        <span className="font-latin text-[0.6rem] text-gold/70">0{i + 1}</span>
                        <span className="font-latin text-sm text-ivory">{f.en}</span>
                      </span>
                      <span className="text-[0.7rem] text-ivory/45">{f.ar}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 grid place-items-center rounded-xl border border-ivory/10 bg-ivory/[0.03] p-3">
                <Seal id="hero-seal" spin className="size-24" />
              </div>
            </div>

            <div className="relative mt-3 flex items-center justify-between rounded-xl border border-gold/20 bg-gradient-to-l from-midnight to-midnight-600 p-4">
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-7 w-7 text-gold" />
                <div className="leading-tight">
                  <p className="font-kufi text-sm text-ivory">أثر | ATHAR</p>
                  <p className="font-latin text-[0.6rem] text-ivory/45">Brand Studio</p>
                </div>
              </div>
              <p className="font-latin text-[0.6rem] text-ivory/45">hello@atharbrands.com</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
