import { INDUSTRIES } from "@/data/industries";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

export function Industries() {
  return (
    <section id="industries" className="bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Industries"
            title="لمن نخدم؟"
            description="نبني علامات في قطاعات متنوعة، بفهمٍ دقيق لطبيعة كل سوق."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.id} delay={index * 50}>
              <div className="card-lift group relative flex h-full flex-col items-center gap-5 overflow-hidden rounded-card border border-gold/25 bg-white p-7 text-center transition-colors hover:border-gold/45 hover:shadow-gold">
                <span className="label-latin absolute end-4 top-4 text-[0.6rem] text-midnight/25 transition-colors group-hover:text-gold/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-gold-deep transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon name={industry.icon} className="size-9" />
                </span>
                <h3 className="font-kufi text-base leading-snug text-midnight">{industry.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
