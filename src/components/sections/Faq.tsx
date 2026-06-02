import { FAQS } from "@/data/faqs";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

export function Faq() {
  return (
    <section id="faq" className="bg-ivory py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="FAQ" title="أسئلة شائعة" />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 40}>
              <details className="group border-midnight/10 border-b">
                <summary className="text-midnight flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Icon
                    name="chevron-down"
                    className="text-gold size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="text-midnight/65 pe-1 pb-5 leading-relaxed text-pretty">
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
