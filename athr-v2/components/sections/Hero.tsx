import { Seal } from '@/components/brand/Seal';
import { Parallax } from '@/components/fx/Parallax';
import { Reveal } from '@/components/fx/Reveal';
import { Locale, tHtml } from '@/content/site';
import { Mixed } from '@/lib/Mixed';

interface HeroProps {
  locale: Locale;
  ov?: Record<string, string>;
}

export function Hero({ locale, ov }: HeroProps) {
  const html = (k: any) => tHtml(locale, k, ov);
  const philLabel = locale === 'ar' ? 'فلسفتنا' : 'Our Philosophy';
  const arrow = locale === 'ar' ? '←' : '→';
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg">
        <div className="hero-pattern" />
        <Parallax factor={0.06} className="hero-glow" />
        <svg
          className="hero-horizon"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hz" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0F1113" stopOpacity="0" />
              <stop offset="1" stopColor="#0F1113" />
            </linearGradient>
            <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1c2024" />
              <stop offset="1" stopColor="#0F1113" />
            </linearGradient>
          </defs>
          <path
            d="M0 250 L220 170 L420 240 L640 150 L860 230 L1080 160 L1280 235 L1440 190 L1440 400 L0 400Z"
            fill="#16191c"
            opacity="0.7"
          />
          <path
            d="M0 300 L260 220 L500 290 L760 210 L1000 285 L1240 225 L1440 290 L1440 400 L0 400Z"
            fill="url(#ridge)"
          />
          <rect x="0" y="0" width="1440" height="400" fill="url(#hz)" />
        </svg>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('hero_eyebrow')} />
          <h1 className="hero-title">
            <Reveal as="span" delay={1} className="l1" dangerouslySetInnerHTML={html('hero_title_1')} />
            <br />
            <Reveal as="span" delay={2} className="l2" dangerouslySetInnerHTML={html('hero_title_2')} />
            <br />
            <Reveal as="span" delay={3} className="l3" dangerouslySetInnerHTML={html('hero_title_3')} />
          </h1>
          <Reveal as="p" delay={3} className="hero-ar" dangerouslySetInnerHTML={html('hero_ar')} />
          <Reveal as="p" delay={4} className="hero-sub lede" dangerouslySetInnerHTML={html('hero_sub')} />
          <Reveal delay={4} className="hero-actions">
            <a href="#work" className="btn">
              <span className="dot" />
              <span className="txt" dangerouslySetInnerHTML={html('hero_btn')} />
            </a>
            <a href="#philosophy" className="link-underline">
              <Mixed text={philLabel} /> <span className="arr">{arrow}</span>
            </a>
          </Reveal>
        </div>
        <Parallax factor={0.12} className="hero-seal">
          <Seal variant="full" idSuffix="hero" />
        </Parallax>
      </div>
      <div className="scroll-cue">
        <Mixed text={locale === 'ar' ? 'مرّر' : 'Scroll'} />
        <span className="rail" />
      </div>
    </section>
  );
}
