import { FAQS } from "@/data/faqs";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

export function Faq() {
  return (
    <section id="faq" className="bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="FAQ" title="أسئلة شائعة" />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl border-t border-midnight/10">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 40}>
              <details className="group border-b border-midnight/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-kufi text-lg text-midnight transition-colors hover:text-gold-deep sm:text-xl [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/25 text-gold transition-all duration-300 group-open:border-gold/45 group-open:bg-gold/10">
                    <Icon
                      name="chevron-down"
                      className="size-5 transition-transform duration-300 group-open:rotate-180"
                    />
                  </span>
                </summary>
                <p className="max-w-2xl text-pretty pb-6 pe-1 leading-relaxed text-midnight/65">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
