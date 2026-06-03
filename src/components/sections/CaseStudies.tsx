import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

/**
 * «أعمال تصورية» — a single brand-board image, no text.
 * Place the image at: public/works-board.png
 */
export function CaseStudies() {
  return (
    <section id="work" className="bg-midnight py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-gold/20 shadow-soft">
            <Image
              src="/works-board.png"
              alt="أعمال تصورية — أثر | ATHAR"
              fill
              className="object-contain"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
