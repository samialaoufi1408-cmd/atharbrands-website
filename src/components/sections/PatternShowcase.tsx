import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

export function PatternShowcase() {
  return (
    <section id="pattern" className="bg-charcoal-700 py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Brand Pattern"
            title="النمط البصري"
            description="نمط هندسي ذهبي مستوحى من الختم، يُستخدم بخفة في الخلفيات والتطبيقات."
          />
        </Reveal>
        <Reveal>
          <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-card border border-gold/15 shadow-soft">
            <Image
              src="/brand/athar/pattern-preview.png"
              alt="النمط البصري لهوية أثر"
              width={300}
              height={205}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
