import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { Monogram } from "../ui/Logo";
import { whatsappUrl } from "@/lib/whatsapp";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-midnight py-24 text-ivory lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="cta-geo" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[130px]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Monogram className="size-12" />

          <h2 className="mt-8 text-balance text-4xl leading-[1.15] text-ivory sm:text-5xl">
            جاهز تصنع <span className="text-gold-gradient">أثر</span> علامتك؟
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/70">
            ابدأ معنا رحلة بناء علامة تجارية واضحة، فاخرة، ومؤثرة.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="#contact" size="lg">
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
