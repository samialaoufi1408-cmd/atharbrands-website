import Image from "next/image";
import { SITE } from "@/lib/constants";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

export function BrandSystem() {
  return (
    <section id="about" className="bg-charcoal py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Brand System"
            title="نظام الهوية"
            description="الرمز الأساسي، الشعار الثنائي، والختم البارز — كما وردت في لوحة الهوية."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {/* Primary symbol */}
          <Reveal>
            <div className="flex h-full flex-col items-center text-center">
              <span className="label-latin text-[0.55rem] text-gold/70">Primary Symbol</span>
              <Image
                src="/brand/athar/primary-symbol.png"
                alt="الرمز الأساسي"
                width={235}
                height={300}
                className="mt-6 h-52 w-auto"
              />
              <p className="mt-5 font-serif tracking-[0.15em] text-gold">THE SEAL OF IMPACT</p>
              <p className="mt-1 font-kufi text-ivory">ختم الأثر</p>
            </div>
          </Reveal>

          {/* Wordmark + monogram */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col items-center text-center">
              <span className="label-latin text-[0.55rem] text-gold/70">Secondary Wordmark</span>
              <Image
                src="/brand/athar/wordmark.png"
                alt="أثر | ATHAR"
                width={400}
                height={108}
                className="mt-8 h-11 w-auto"
              />
              <div className="rule-gold my-9 max-w-[12rem] opacity-40" />
              <span className="label-latin text-[0.55rem] text-gold/70">Monogram / Icon</span>
              <Image
                src="/brand/athar/monogram-icon.png"
                alt="المونوغرام المختصر"
                width={165}
                height={180}
                className="mt-5 h-24 w-auto"
              />
            </div>
          </Reveal>

          {/* Seal */}
          <Reveal delay={200}>
            <div className="flex h-full flex-col items-center text-center">
              <span className="label-latin text-[0.55rem] text-gold/70">Seal / Emboss</span>
              <Image
                src="/brand/athar/seal-emboss.png"
                alt="الختم البارز — LEGACY IN EVERY IMPACT"
                width={265}
                height={265}
                className="mt-6 h-48 w-auto"
              />
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">{SITE.essenceAr}</p>
              <p className="mt-2 max-w-xs font-serif text-sm italic text-ivory/45">
                {SITE.essenceEn}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
