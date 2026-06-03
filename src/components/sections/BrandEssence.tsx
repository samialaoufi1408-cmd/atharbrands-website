import { SITE } from "@/lib/constants";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { AtharSeal } from "../ui/Logo";

const ESSENCE_PILLS = ["القيمة", "الفرق", "الإرث"] as const;

export function BrandEssence() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-charcoal py-24 lg:py-32">
      <Pattern className="pointer-events-none absolute inset-0 text-gold/[0.04]" id="essence-geo" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="label-latin block text-gold/80">Brand Essence</span>
            <h2 className="mt-5 font-kufi text-4xl text-ivory sm:text-5xl">ختم الأثر</h2>
            <p className="mt-4 font-serif text-2xl tracking-[0.15em] text-gold">
              THE SEAL OF IMPACT
            </p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/70">
              {SITE.essenceAr}
            </p>
            <p className="mt-4 max-w-xl font-serif text-lg italic text-ivory/55">
              {SITE.essenceEn}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {ESSENCE_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-gold/25 bg-gold/[0.05] px-4 py-1.5 text-sm text-ivory/75"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center lg:col-span-5">
            <AtharSeal id="essence-seal" spin className="size-72" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
