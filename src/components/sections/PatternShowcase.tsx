import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { AtharMonogram } from "../ui/Logo";

/**
 * أثر | ATHAR — "النمط البصري": the brand pattern showcase.
 * A gold khatam-inspired lattice used lightly behind the centred monogram.
 * Dark charcoal · champagne gold · ivory.
 */
export function PatternShowcase() {
  return (
    <section id="pattern" className="bg-charcoal-700 py-24 lg:py-32">
      <Container>
        <SectionTitle
          tone="light"
          eyebrow="Brand Pattern"
          title="النمط البصري"
          description="نمط هندسي ذهبي مستوحى من الختم، يُستخدم بخفة في الخلفيات."
        />

        <Reveal>
          <div className="relative mt-14 h-72 overflow-hidden rounded-card border border-gold/15 bg-charcoal sm:h-96">
            <Pattern className="absolute inset-0 h-full w-full text-gold/[0.14]" id="showcase-geo" />
            <div className="absolute inset-0 grid place-items-center">
              <AtharMonogram className="h-20 w-auto text-gold/70" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
