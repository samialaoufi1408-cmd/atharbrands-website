import { Reveal } from '@/components/fx/Reveal';
import { Seal } from '@/components/brand/Seal';
import { Locale, tHtml } from '@/content/site';
import { Mixed } from '@/lib/Mixed';
import type { JournalRow } from '@/lib/cms';

const DEFAULT_ARTICLES = [
  {
    cat: { en: 'Craft', ar: 'حرفة' },
    date: 'May 2026',
    title: 'The Patina of Permanence',
    excerpt: "On designing identities that don't age — they ripen into heirlooms.",
  },
  {
    cat: { en: 'Restraint', ar: 'ضبط' },
    date: 'Apr 2026',
    title: 'Why Luxury Whispers',
    excerpt: 'Gold, silence and meaning — the case for designing with less.',
  },
  {
    cat: { en: 'Heritage', ar: 'إرث' },
    date: 'Mar 2026',
    title: 'The Seal as a Promise',
    excerpt: 'What a mark pressed into wax can teach a modern brand.',
  },
] as const;

interface JournalProps {
  locale: Locale;
  ov?: Record<string, string>;
  extra?: JournalRow[];
}

export function Journal({ locale, ov, extra = [] }: JournalProps) {
  const html = (k: any) => tHtml(locale, k, ov);
  const ar = locale === 'ar';
  const articles = extra.length
    ? extra.map((r) => ({
        cat: { en: r.category, ar: r.category },
        date: r.published_at,
        title: r.title,
        excerpt: r.excerpt,
      }))
    : [...DEFAULT_ARTICLES];

  return (
    <section className="journal" id="journal" data-screen-label="Journal">
      <div className="container">
        <div className="sect-head">
          <div>
            <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('jrn_eyebrow')} />
            <Reveal
              as="h2"
              delay={1}
              className="title"
              style={{ marginTop: '1.4rem' }}
              dangerouslySetInnerHTML={html('jrn_title')}
            />
          </div>
          <Reveal delay={2}>
            <a href="#" className="link-underline">
              <Mixed text={ar ? 'كل المقالات' : 'All Writing'} />{' '}
              <span className="arr">{ar ? '←' : '→'}</span>
            </a>
          </Reveal>
        </div>
        <div className="jrn-grid">
          {articles.map((a, i) => (
            <Reveal
              key={a.title}
              as="article"
              className="jrn-card"
              delay={(i as 0 | 1 | 2)}
            >
              <div className="jrn-thumb">
                <span className="wm">
                  <Seal variant="mono" idSuffix={`jrn-${i}`} />
                </span>
              </div>
              <div className="jrn-body">
                <div className="jrn-tags">
                  <Mixed text={ar ? a.cat.ar : a.cat.en} />
                  <span className="date">{a.date}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
