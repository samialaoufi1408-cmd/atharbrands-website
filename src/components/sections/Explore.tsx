import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

const PAGES = [
  { href: "/about", num: "01", title: "من نحن", desc: "بيت خبرة لبناء العلامات من الاسم والاستراتيجية إلى الإطلاق." },
  { href: "/services", num: "02", title: "الخدمات", desc: "استراتيجية، تسمية، هوية بصرية، بروفايل، مواقع، إطلاق." },
  { href: "/methodology", num: "03", title: "المنهجية", desc: "رحلة من خمس مراحل: نكتشف، نحدد، نبني، نصمم، نطلق." },
  { href: "/work", num: "04", title: "الأعمال", desc: "أعمال تصورية تعرض أسلوب أثر عبر قطاعات مختلفة." },
  { href: "/discovery", num: "05", title: "اكتشف احتياجك", desc: "أجب عن أسئلة سريعة لنقترح نقطة انطلاق مناسبة لمشروعك." },
  { href: "/contact", num: "06", title: "تواصل معنا", desc: "أخبرنا عن مشروعك، ونعود إليك بخطوة أولى واضحة." },
] as const;

export function Explore() {
  return (
    <section className="bg-charcoal-700 py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Explore"
            title="استكشف الاستوديو"
            description="كل ما تحتاج معرفته عن أثر — صفحةً صفحة."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGES.map((p, i) => (
            <Reveal key={p.href} delay={i * 60}>
              <Link
                href={p.href}
                className="card-lift group flex h-full flex-col rounded-card border border-ink/10 bg-white p-7 shadow-soft hover:border-gold/40 hover:shadow-gold"
              >
                <div className="flex items-center justify-between">
                  <span className="label-latin text-[0.6rem] text-gold/60">{p.num}</span>
                  <Icon
                    name="arrow"
                    className="size-4 text-gold transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </div>
                <h3 className="mt-6 font-kufi text-xl text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{p.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
