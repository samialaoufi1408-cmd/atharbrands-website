import Image from 'next/image';
import { Reveal } from '@/components/fx/Reveal';
import { Seal } from '@/components/brand/Seal';
import { LightboxTrigger } from '@/components/fx/Lightbox';
import { Locale, tHtml } from '@/content/site';
import { Mixed } from '@/lib/Mixed';
import type { WorkRow } from '@/lib/cms';

const DEFAULT_WORK = [
  {
    cat: { en: 'Identity · Packaging', ar: 'هوية · تغليف' },
    name: 'AURA OUD',
    ar: 'أورا عود',
    year: '2025',
    image: '/assets/aura-featured.png',
  },
  {
    cat: { en: 'Naming · Fragrance', ar: 'تسمية · عطور' },
    name: 'Rimal Atelier',
    ar: 'أتيليه رمال',
    year: '2025',
    image: null,
  },
  {
    cat: { en: 'Strategy · Investment', ar: 'استراتيجية · استثمار' },
    name: 'Wathiq Capital',
    ar: 'واثق كابيتال',
    year: '2024',
    image: null,
  },
  {
    cat: { en: 'Spatial · Retail', ar: 'مكاني · تجزئة' },
    name: 'Dar Al Qimah',
    ar: 'دار القيمة',
    year: '2024',
    image: null,
  },
] as const;

interface WorkProps {
  locale: Locale;
  ov?: Record<string, string>;
  extra?: WorkRow[];
}

export function Work({ locale, ov, extra = [] }: WorkProps) {
  const html = (k: any) => tHtml(locale, k, ov);
  const ar = locale === 'ar';

  const cards = extra.length
    ? extra.map((r) => ({
        cat: { en: r.category, ar: r.category },
        name: r.name,
        ar: r.name_ar,
        year: r.year,
        image: r.image_url,
      }))
    : [...DEFAULT_WORK];

  return (
    <section className="work" id="work" data-screen-label="Work">
      <div className="container">
        <div className="sect-head">
          <div>
            <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('work_eyebrow')} />
            <Reveal
              as="h2"
              delay={1}
              className="title"
              style={{ marginTop: '1.4rem' }}
              dangerouslySetInnerHTML={html('work_title')}
            />
          </div>
          <Reveal as="p" delay={2} className="meta" dangerouslySetInnerHTML={html('work_meta')} />
        </div>
        <div className="work-grid">
          {cards.map((c, i) => {
            const inner = (
              <div className="work-thumb">
                {c.image ? (
                  <Image
                    className="work-img"
                    src={c.image}
                    alt={`${c.name} — brand identity`}
                    width={1496}
                    height={1051}
                    priority={i === 0}
                  />
                ) : (
                  <>
                    <Mixed className="ph-tag" text={ar ? 'صورة · Image' : 'Image · صورة'} />
                    <span className="wm">
                      <Seal variant="mono" idSuffix={`work-${i}`} />
                    </span>
                  </>
                )}
                <div className="work-overlay">
                  <Mixed className="work-cat" text={ar ? c.cat.ar : c.cat.en} />
                  <div className="work-meta">
                    <div className="work-name">
                      {c.name}
                      <span className="ar-sub">{c.ar}</span>
                    </div>
                    <span className="work-year">{c.year}</span>
                  </div>
                </div>
              </div>
            );
            return c.image ? (
              <Reveal
                key={c.name}
                as="article"
                delay={(i as 0 | 1 | 2)}
                className="work-card"
              >
                <LightboxTrigger src={c.image} alt={`${c.name} — brand identity`}>
                  {inner}
                </LightboxTrigger>
              </Reveal>
            ) : (
              <Reveal
                key={c.name}
                as="article"
                delay={(i as 0 | 1 | 2)}
                className="work-card"
              >
                {inner}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
