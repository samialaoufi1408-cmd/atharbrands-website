import { SITE } from "@/lib/constants";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { LogoMark } from "../ui/Logo";

const FRAMEWORK = [
  { en: "Strategy", ar: "استراتيجية" },
  { en: "Identity", ar: "هوية" },
  { en: "Experience", ar: "تجربة" },
  { en: "Impact", ar: "أثر" },
];

export function Hero() {
  return (
    <section id="home" className="bg-midnight relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.06] h-full w-full" id="hero-geo" />
      </div>
      <div className="bg-gold/10 pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[130px]" />
      <div className="bg-sage/10 pointer-events-none absolute right-0 -bottom-32 h-[30rem] w-[30rem] translate-x-1/3 rounded-full blur-[130px]" />

      <Container className="relative grid min-h-[92vh] items-center gap-12 pt-36 pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <span
            className="animate-rise border-gold/25 bg-gold/[0.06] text-ivory/80 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex size-2">
              <span className="bg-gold/60 absolute inline-flex h-full w-full animate-ping rounded-full" />
              <span className="bg-gold relative inline-flex size-2 rounded-full" />
            </span>
            متاح لاستقبال مشاريع جديدة · 2026
          </span>

          <h1
            className="animate-rise text-ivory mt-7 text-4xl leading-[1.18] text-balance sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            نبني علامات تجارية لا تُرى فقط
            <span className="text-gold-gradient">… بل تُتذكر</span>
          </h1>

          <p
            className="animate-rise text-ivory/70 mt-6 max-w-xl text-lg leading-relaxed"
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
            <Button href="#services" variant="outlineLight" size="lg">
              شاهد الخدمات
            </Button>
          </div>

          <p
            className="animate-rise text-ivory/55 mt-9 flex items-center gap-2.5 text-sm"
            style={{ animationDelay: "320ms" }}
          >
            <span className="bg-gold size-1.5 rounded-full" />
            {SITE.positioningAr}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div
            className="animate-rise border-gold/15 bg-ivory/[0.04] relative overflow-hidden rounded-3xl border p-7 backdrop-blur-sm sm:p-9"
            style={{ animationDelay: "260ms" }}
          >
            <div className="pointer-events-none absolute -top-12 -left-12 opacity-[0.07]">
              <LogoMark className="text-gold h-48 w-48" />
            </div>
            <span className="text-gold/85 relative font-serif text-[0.7rem] font-medium tracking-[0.3em] uppercase">
              The ATHAR Framework
            </span>
            <ul className="relative mt-6 flex flex-col">
              {FRAMEWORK.map((item, index) => (
                <li
                  key={item.en}
                  className="border-ivory/10 flex items-baseline justify-between gap-4 border-t py-4 first:border-t-0 first:pt-0"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-gold/70 font-serif text-sm">0{index + 1}</span>
                    <span className="text-ivory font-serif text-2xl">{item.en}</span>
                  </span>
                  <span className="text-ivory/55 text-sm">{item.ar}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
