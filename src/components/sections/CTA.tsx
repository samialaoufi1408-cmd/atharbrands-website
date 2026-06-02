import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";
import { whatsappUrl } from "@/lib/whatsapp";

export function CTA() {
  return (
    <section
      id="cta"
      className="bg-midnight text-ivory relative isolate overflow-hidden py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.06] h-full w-full" id="cta-geo" />
      </div>
      <div className="bg-gold/12 pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="border-gold/30 text-gold grid size-12 place-items-center rounded-full border">
            <Icon name="spark" className="size-6" />
          </span>
          <h2 className="text-ivory mt-6 text-4xl leading-[1.15] text-balance sm:text-5xl">
            جاهز تصنع <span className="text-gold-gradient">أثر</span> علامتك؟
          </h2>
          <p className="text-ivory/70 mt-5 max-w-xl text-lg leading-relaxed">
            ابدأ معنا رحلة بناء علامة تجارية واضحة، فاخرة، ومؤثرة.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
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
