import { SITE } from "@/lib/constants";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { AtharSymbol } from "../ui/Logo";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-charcoal">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="hero-geo" />
      </div>
      <div className="pointer-events-none absolute left-1/3 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[150px]" />

      {/* subtle mountain landscape (board "website hero") */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,320 L0,205 L240,150 L480,200 L720,120 L960,185 L1200,135 L1440,195 L1440,320 Z"
          fill="#17191c"
          opacity="0.85"
        />
        <path
          d="M0,320 L0,250 L300,205 L600,245 L900,195 L1200,235 L1440,205 L1440,320 Z"
          fill="#202327"
          opacity="0.75"
        />
      </svg>

      <Container className="relative grid min-h-[92vh] items-center gap-12 pb-28 pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-44">
        {/* Text */}
        <div className="lg:col-span-7">
          <span
            className="animate-rise label-latin block text-[0.62rem] text-gold/80"
            style={{ animationDelay: "0ms" }}
          >
            The Seal of Impact · ختم الأثر
          </span>
          <h1
            className="animate-rise mt-5 text-balance text-5xl font-bold leading-[1.08] text-ivory sm:text-6xl md:text-[4.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            نبني أثرًا يدوم
          </h1>
          <p
            className="animate-rise mt-5 font-serif text-2xl font-medium tracking-[0.18em] text-gold sm:text-3xl"
            style={{ animationDelay: "160ms" }}
          >
            LEGACY IN EVERY IMPACT
          </p>
          <p
            className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ivory/65"
            style={{ animationDelay: "240ms" }}
          >
            {SITE.essenceAr}
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <Button href="#contact" size="lg">
              ابدأ مشروعك
              <Icon name="arrow" className="size-4" />
            </Button>
            <Button href="#about" variant="outlineLight" size="lg">
              اكتشف المزيد
            </Button>
          </div>
        </div>

        {/* Symbol */}
        <div className="lg:col-span-5">
          <div
            className="animate-rise relative mx-auto flex max-w-sm justify-center"
            style={{ animationDelay: "260ms" }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/[0.06] blur-[90px]" />
            <AtharSymbol className="h-80 w-auto text-gold drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:h-[24rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
