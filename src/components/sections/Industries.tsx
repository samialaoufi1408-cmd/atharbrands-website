import { INDUSTRIES } from "@/data/industries";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

export function Industries() {
  return (
    <section id="industries" className="bg-sand-soft py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Industries"
            title="لمن نخدم؟"
            description="نبني علامات في قطاعات متنوعة، بفهمٍ دقيق لطبيعة كل سوق."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.id} delay={index * 50}>
              <div className="card-lift group border-midnight/10 bg-ivory/70 hover:border-gold/40 flex h-full flex-col items-center gap-4 rounded-2xl border p-6 text-center hover:bg-white">
                <span className="text-gold-deep group-hover:bg-gold/10 grid size-14 place-items-center rounded-2xl bg-white shadow-sm transition-colors">
                  <Icon name={industry.icon} className="size-7" />
                </span>
                <h3 className="text-midnight text-base">{industry.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
