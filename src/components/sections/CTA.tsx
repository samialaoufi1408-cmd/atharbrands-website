import { RippleMark } from "../ui/RippleMark";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { whatsappUrl } from "@/lib/whatsapp";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-gradient-to-b from-gold to-gold-deep py-24 text-offwhite lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Pattern className="h-full w-full text-white/[0.10]" id="cta-ripple" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-offwhite shadow-soft">
            <RippleMark className="w-11 text-gold" />
          </span>

          <h2 className="mt-8 text-balance font-kufi text-4xl leading-[1.15] text-offwhite sm:text-5xl">
            جاهز تصنع <span className="font-serif italic">أثر</span> علامتك؟
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-offwhite/85">
            ابدأ معنا رحلة بناء علامة تجارية واضحة، فاخرة، ومؤثرة.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="#contact" variant="light" size="lg">
              احجز جلسة اكتشاف
              <Icon name="arrow" className="size-4" />
            </Button>
            <Button
              href={whatsappUrl("السلام عليكم، أرغب في حجز جلسة اكتشاف مع أثر.")}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <Icon name="whatsapp" className="size-5" />
              تواصل عبر واتساب
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
