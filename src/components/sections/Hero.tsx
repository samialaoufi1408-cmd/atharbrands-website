import Image from "next/image";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-offwhite">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="hero-ripple" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-mauve/20 blur-[160px]" />

      <Container className="relative grid min-h-[92vh] items-center gap-12 pb-28 pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-44">
        <div className="lg:col-span-7">
          <span
            className="animate-rise label-latin block text-[0.62rem] text-gold"
            style={{ animationDelay: "0ms" }}
          >
            ATHAR · Branding Studio · Riyadh
          </span>
          <h1
            className="animate-rise mt-6 font-kufi text-4xl font-bold leading-[1.2] text-ink sm:text-5xl md:text-[3.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            نصنع هويات تُرى…
            <br />
            <span className="text-gold-gradient">وتُذكر</span>
          </h1>
          <p
            className="animate-rise mt-5 font-serif text-xl italic text-gold/90 sm:text-2xl"
            style={{ animationDelay: "150ms" }}
          >
            We create brands that are seen, and remembered.
          </p>
          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink/70"
            style={{ animationDelay: "220ms" }}
          >
            من الفكرة إلى الإطلاق، نصنع هويات استراتيجية تترك أثرًا واضحًا في السوق.
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <Button href="#contact" size="lg">
              ابدأ مشروعك
              <Icon name="arrow" className="size-4" />
            </Button>
            <Button href="#discovery" variant="outline" size="lg">
              اكتشف احتياج علامتك
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="animate-rise relative mx-auto flex max-w-md justify-center"
            style={{ animationDelay: "260ms" }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-mauve/25 blur-[80px]" />
            <Image
              src="/brand/athar-v2/symbol.png"
              alt="أثر | ATHAR — الرمز"
              width={270}
              height={178}
              priority
              className="w-72 max-w-full sm:w-96"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
