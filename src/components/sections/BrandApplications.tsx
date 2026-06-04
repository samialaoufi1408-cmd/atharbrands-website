import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";

type App = { src: string; ar: string; en: string; w: number; h: number };

const ROW1: App[] = [
  { src: "business-card", ar: "بطاقة عمل", en: "Business Card", w: 208, h: 180 },
  { src: "presentation-cover", ar: "غلاف عرض تقديمي", en: "Presentation Cover", w: 210, h: 180 },
  { src: "envelope", ar: "ظرف", en: "Envelope", w: 206, h: 180 },
  { src: "embossed-folder", ar: "ملف بارز", en: "Embossed Folder", w: 210, h: 180 },
  { src: "notebook", ar: "دفتر", en: "Notebook", w: 206, h: 180 },
];

const ROW2: App[] = [
  { src: "storefront-signage", ar: "واجهة متجر / لافتة", en: "Storefront / Signage", w: 474, h: 230 },
  { src: "website-hero-preview", ar: "واجهة الموقع", en: "Website Hero", w: 607, h: 230 },
];

function AppCard({ app, delay }: { app: App; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <figure className="card-lift group h-full overflow-hidden rounded-card border border-ivory/10 bg-charcoal-700 hover:border-gold/40">
        <Image
          src={`/brand/athar/${app.src}.png`}
          alt={app.ar}
          width={app.w}
          height={app.h}
          className="h-auto w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <figcaption className="flex items-center justify-between gap-3 border-t border-ivory/[0.08] px-5 py-4">
          <span className="text-sm text-ivory">{app.ar}</span>
          <span className="label-latin text-[0.5rem] text-gold/70">{app.en}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function BrandApplications() {
  return (
    <section id="work" className="bg-charcoal py-24 text-ivory lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Brand Applications"
            title="تطبيقات الهوية"
            description="الهوية مطبّقة على نقاط التواصل، مأخوذة مباشرة من لوحة الهوية."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {ROW1.map((app, i) => (
            <AppCard key={app.src} app={app} delay={i * 60} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {ROW2.map((app, i) => (
            <AppCard key={app.src} app={app} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
