import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";

/**
 * أثر | ATHAR — "الخطوط المقترحة": the proposed type system.
 * Two panels (Arabic / English) showing display faces, alphabets and numerals,
 * straight from the brand board. Dark charcoal · champagne gold · ivory.
 */
export function Typography() {
  return (
    <section id="type" className="relative isolate overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="type-geo" />
      </div>

      <Container className="relative">
        <SectionTitle tone="light" eyebrow="Typography" title="الخطوط المقترحة" />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Arabic */}
          <Reveal>
            <div className="rounded-card border border-ivory/10 bg-ivory/[0.02] p-8 sm:p-10">
              <span className="label-latin text-[0.6rem] text-gold/80">Arabic · عربي</span>
              <span className="mt-4 block font-kufi text-6xl text-gold sm:text-7xl">أثر</span>
              <p className="mt-3 font-kufi text-ivory/70">DIN Next Arabic</p>
              <div className="rule-gold my-5 opacity-40" />
              <p className="font-kufi text-lg leading-loose text-ivory/55" dir="rtl">
                أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي
              </p>
              <p className="mt-3 font-kufi text-xl text-ivory/55">١٢٣٤٥٦٧٨٩٠</p>
            </div>
          </Reveal>

          {/* English */}
          <Reveal delay={80}>
            <div className="rounded-card border border-ivory/10 bg-ivory/[0.02] p-8 sm:p-10">
              <span className="label-latin text-[0.6rem] text-gold/80">English · إنجليزي</span>
              <span className="mt-4 block font-serif text-6xl tracking-wide text-gold sm:text-7xl">
                ATHAR
              </span>
              <p className="mt-3 font-serif text-lg text-ivory/70">Cormorant Garamond</p>
              <div className="rule-gold my-5 opacity-40" />
              <p className="font-serif text-xl leading-relaxed text-ivory/55">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p className="mt-3 font-serif text-xl text-ivory/55">0123456789</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
