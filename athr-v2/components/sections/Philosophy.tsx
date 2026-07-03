import { Reveal } from '@/components/fx/Reveal';
import { Seal } from '@/components/brand/Seal';
import { Locale, tHtml } from '@/content/site';

export function Philosophy({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => tHtml(locale, k, ov);
  return (
    <section className="about" id="philosophy" data-screen-label="Philosophy">
      <div className="container about-grid">
        <Reveal className="about-media">
          <div className="frame">
            <div className="seal-watermark">
              <Seal variant="full" idSuffix="phil" />
            </div>
          </div>
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </Reveal>
        <div className="about-copy">
          <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('phil_eyebrow')} />
          <Reveal as="h2" delay={1} dangerouslySetInnerHTML={html('phil_title')} />
          <Reveal
            as="p"
            delay={2}
            className="lede"
            dangerouslySetInnerHTML={html('phil_p1')}
          />
          <Reveal
            as="p"
            delay={2}
            style={{ color: 'var(--ink-soft)' }}
            dangerouslySetInnerHTML={html('phil_p2')}
          />
          <Reveal delay={3} className="about-sign">
            <span className="ln" />
            <span dangerouslySetInnerHTML={html('phil_sign')} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
