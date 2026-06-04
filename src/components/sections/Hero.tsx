import Image from "next/image";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-charcoal">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[150px]" />

      {/* subtle mountain horizon — texture borrowed from the brand world, not shown as content */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,320 L0,205 L240,150 L480,200 L720,120 L960,185 L1200,135 L1440,195 L1440,320 Z"
          fill="#16181b"
          opacity="0.85"
        />
        <path
          d="M0,320 L0,250 L300,205 L600,245 L900,195 L1200,235 L1440,205 L1440,320 Z"
          fill="#1d2024"
          opacity="0.8"
        />
      </svg>

      <Container className="relative grid min-h-[92vh] items-center gap-12 pb-28 pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-44">
        <div className="lg:col-span-7">
          <span
            className="animate-rise label-latin block text-[0.62rem] text-gold/80"
            style={{ animationDelay: "0ms" }}
          >
            Saudi Brand Studio · Legacy in Every Impact
          </span>
          <h1
            className="animate-rise mt-6 font-kufi text-4xl font-bold leading-[1.18] text-ivory sm:text-5xl md:text-[3.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            نبني علامات تجارية لا تُرى فقط…
            <br />
            بل <span className="text-gold-gradient">تُتذكر</span>
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ivory/65"
            style={{ animationDelay: "160ms" }}
          >
            من الفكرة إلى الإطلاق، نصنع هويات استراتيجية تترك أثرًا واضحًا في السوق.
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#contact" size="lg">
              ابدأ مشروعك
              <Icon name="arrow" className="size-4" />
            </Button>
            <Button href="#discovery" variant="outlineLight" size="lg">
              اكتشف احتياج علامتك
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="animate-rise relative mx-auto flex max-w-sm justify-center"
            style={{ animationDelay: "260ms" }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/[0.06] blur-[90px]" />
            <Image
              src="/brand/athar/primary-symbol.png"
              alt="أثر | ATHAR"
              width={235}
              height={300}
              priority
              className="h-80 w-auto sm:h-[24rem]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
