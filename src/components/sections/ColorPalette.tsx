import { BRAND_PALETTE } from "@/lib/constants";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

export function ColorPalette() {
  return (
    <section id="identity" className="bg-charcoal-700 py-24 lg:py-32">
      <Container>
        <SectionTitle
          tone="light"
          eyebrow="Color Palette"
          title="لوحة الألوان"
          description="خمسة ألوان تصنع حضور أثر."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BRAND_PALETTE.map((c, i) => (
            <Reveal key={c.hex} delay={i * 60}>
              <div
                className="aspect-[3/4] rounded-card border border-ivory/10"
                style={{ background: c.hex }}
              />
              <p className="mt-3 text-sm text-ivory">{c.nameAr}</p>
              <span className="label-latin mt-1 block text-[0.55rem] text-ivory/45">
                {c.nameEn}
              </span>
              <span className="font-latin mt-1 block text-xs uppercase text-gold/70">{c.hex}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
