import Link from 'next/link';
import { Seal } from '@/components/brand/Seal';
import { Locale } from '@/content/site';
import styles from './StudioHome.module.css';

const copy = {
  ar: {
    nav: ['الأعمال', 'المنهج', 'الخدمات', 'الاستوديو'],
    cta: 'ابدأ مشروعك',
    eyebrow: 'استوديو سعودي لاستراتيجية وتصميم الهويات البصرية',
    hero1: 'نصنع علاماتٍ',
    hero2: 'تُعرَف قبل أن تُقرأ.',
    intro: 'نحوّل الفكرة إلى نظام بصري واضح، متماسك، وقابل للنمو — من الاستراتيجية وحتى أدق نقطة تواصل.',
    explore: 'استكشف أعمالنا',
    note: 'القصيم · المملكة العربية السعودية · نعمل مع علامات داخل المملكة وخارجها',
    workKicker: 'أعمال مختارة',
    workTitle: 'ثلاثة عوالم. منهج واحد: الوضوح قبل الزخرفة.',
    cases: [
      ['ATHRBRANDS', 'استوديو هويات بصرية', 'استراتيجية العلامة · النظام البصري · التجربة الرقمية'],
      ['قِرَى — QIRĀ', 'ضيافة تراثية معاصرة', 'التموضع · التسمية · الهوية · تجربة المكان'],
      ['وِزان — WIZAN', 'عافية وقائية رقمية', 'الاستراتيجية · الهوية · البيانات · المنتج الرقمي'],
    ],
    statement: 'الشعار لحظة.\nالهوية نظام.\nوالعلامة أثرٌ يتراكم.',
    processKicker: 'منهج أثر',
    processTitle: 'نبدأ بالفهم، لا بالرسم.',
    process: [
      ['01', 'نكتشف', 'نفهم المشروع، السوق، الجمهور، والطموح الذي يجب أن تحمله العلامة.'],
      ['02', 'نحدّد', 'نصوغ التموضع والشخصية والرسالة قبل اتخاذ أي قرار بصري.'],
      ['03', 'نصمّم', 'نحوّل الاستراتيجية إلى نظام شعار، ألوان، خطوط، وعناصر قابلة للتطبيق.'],
      ['04', 'نفعّل', 'نختبر الهوية في نقاط التواصل الحقيقية ونجهّزها للنمو بثبات.'],
    ],
    servicesKicker: 'ما نصنعه',
    servicesTitle: 'ثلاثة مسارات. علامة واحدة متماسكة.',
    services: [
      ['Brand Strategy', 'استراتيجية العلامة', 'التموضع، الجمهور، الشخصية، الرسائل، والاتجاه الإبداعي.'],
      ['Visual Identity', 'الهوية البصرية', 'نظام الشعار، الألوان، الخطوط، اللغة الرسومية، ودليل الاستخدام.'],
      ['Brand Experience', 'تجربة العلامة', 'الموقع، العروض، التغليف، القوالب، ونقاط التواصل الرقمية والمطبوعة.'],
    ],
    studioKicker: 'ATHRBRANDS',
    studioTitle: 'استوديو صغير بالهيكل. كبير بالتركيز.',
    studioBody: 'نعمل مع عدد محدود من المشاريع في كل مرحلة، لأن بناء العلامة يحتاج إلى بحث، قرار، وتفاصيل لا تُنجز على خط إنتاج.',
    insight: 'نؤمن أن أفضل هوية ليست الأكثر ازدحامًا، بل الأكثر قدرة على أن تُفهم، تُذكر، وتظل متماسكة مع الزمن.',
    finalTitle: 'لديك علامة تستحق حضورًا أقوى؟',
    finalBody: 'أخبرنا بما تبنيه، وما الذي تريد أن يشعر به الناس عندما يرون علامتك للمرة الأولى.',
    email: 'admin@atharbrands.com',
    footer: 'ATHRBRANDS — Brand Identity Studio',
  },
  en: {
    nav: ['Work', 'Process', 'Services', 'Studio'],
    cta: 'Start a project',
    eyebrow: 'Saudi studio for brand strategy & visual identity',
    hero1: 'We build brands',
    hero2: 'recognized before they are read.',
    intro: 'We turn ideas into clear, coherent and scalable visual systems — from strategy to every meaningful brand touchpoint.',
    explore: 'Explore selected work',
    note: 'Al Qassim · Saudi Arabia · Working with ambitious brands across markets',
    workKicker: 'Selected work',
    workTitle: 'Three worlds. One discipline: clarity before decoration.',
    cases: [
      ['ATHRBRANDS', 'Brand Identity Studio', 'Brand strategy · Visual system · Digital experience'],
      ['QIRĀ', 'Contemporary Heritage Hospitality', 'Positioning · Naming · Identity · Place experience'],
      ['WIZAN', 'Preventive Digital Wellness', 'Strategy · Identity · Data · Digital product'],
    ],
    statement: 'A logo is a moment.\nIdentity is a system.\nA brand is the impact that compounds.',
    processKicker: 'The ATHR method',
    processTitle: 'We start with understanding, not drawing.',
    process: [
      ['01', 'Discover', 'We understand the business, market, audience and ambition the brand must carry.'],
      ['02', 'Define', 'We shape positioning, personality and messaging before making visual decisions.'],
      ['03', 'Design', 'We translate strategy into a logo system, colour, typography and visual language.'],
      ['04', 'Activate', 'We test the identity across real touchpoints and prepare it to scale with consistency.'],
    ],
    servicesKicker: 'What we build',
    servicesTitle: 'Three disciplines. One coherent brand.',
    services: [
      ['Brand Strategy', 'Strategic foundation', 'Positioning, audience, personality, messaging and creative direction.'],
      ['Visual Identity', 'Identity system', 'Logo system, colour, typography, graphic language and usage guidance.'],
      ['Brand Experience', 'Brand in the real world', 'Web, presentations, packaging, templates and digital or physical touchpoints.'],
    ],
    studioKicker: 'ATHRBRANDS',
    studioTitle: 'Small by structure. Focused by design.',
    studioBody: 'We work with a limited number of projects at a time because meaningful brand building requires research, judgement and craft — not a production line.',
    insight: 'The strongest identity is not the busiest one. It is the one that is understood, remembered and remains coherent over time.',
    finalTitle: 'Building a brand that deserves a stronger presence?',
    finalBody: 'Tell us what you are building and what you want people to feel the first time they encounter your brand.',
    email: 'admin@atharbrands.com',
    footer: 'ATHRBRANDS — Brand Identity Studio',
  },
} as const;

export function StudioHome({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const ar = locale === 'ar';
  return (
    <div className={styles.site}>
      <header className={styles.nav}>
        <a href="#top" className={styles.brand} aria-label="ATHRBRANDS">
          <Seal variant="full" idSuffix="studio-nav" className={styles.navSeal} />
          <span className={styles.wordmark}>ATHRBRANDS</span>
        </a>
        <nav className={styles.navLinks} aria-label="Primary">
          <a href="#work">{c.nav[0]}</a>
          <a href="#process">{c.nav[1]}</a>
          <a href="#services">{c.nav[2]}</a>
          <a href="#studio">{c.nav[3]}</a>
        </nav>
        <div className={styles.navActions}>
          <Link href={ar ? '/en' : '/ar'} className={styles.lang}>{ar ? 'EN' : 'AR'}</Link>
          <a href="#contact" className={styles.navCta}>{c.cta}</a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroAura} aria-hidden="true"><Seal variant="full" idSuffix="hero" className={styles.heroSeal} /></div>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1><span>{c.hero1}</span><strong>{c.hero2}</strong></h1>
            <p className={styles.heroIntro}>{c.intro}</p>
            <div className={styles.heroActions}>
              <a href="#work" className={styles.primary}>{c.explore}<span>↘</span></a>
              <a href="#contact" className={styles.secondary}>{c.cta}</a>
            </div>
          </div>
          <p className={styles.location}>{c.note}</p>
        </section>

        <section id="work" className={styles.workSection}>
          <div className={styles.sectionHead}>
            <p>{c.workKicker}</p>
            <h2>{c.workTitle}</h2>
          </div>
          <div className={styles.workGrid}>
            {c.cases.map((item, i) => (
              <article key={item[0]} className={`${styles.caseCard} ${styles[`case${i + 1}`]}`}>
                <div className={styles.caseVisual}>
                  <span className={styles.caseIndex}>0{i + 1}</span>
                  {i === 0 && <Seal variant="full" idSuffix={`case-${i}`} className={styles.caseSeal} />}
                  {i === 1 && <div className={styles.archMark}><i/><i/></div>}
                  {i === 2 && <div className={styles.orbitMark}><i/><i/><i/></div>}
                </div>
                <div className={styles.caseMeta}>
                  <p>{item[1]}</p>
                  <h3>{item[0]}</h3>
                  <span>{item[2]}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.manifesto}>
          <p>{c.statement}</p>
          <div className={styles.manifestoLine}/>
        </section>

        <section id="process" className={styles.processSection}>
          <div className={styles.sectionHead}>
            <p>{c.processKicker}</p>
            <h2>{c.processTitle}</h2>
          </div>
          <div className={styles.processGrid}>
            {c.process.map((step) => (
              <article key={step[0]}>
                <span>{step[0]}</span>
                <h3>{step[1]}</h3>
                <p>{step[2]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className={styles.servicesSection}>
          <div className={styles.sectionHeadLight}>
            <p>{c.servicesKicker}</p>
            <h2>{c.servicesTitle}</h2>
          </div>
          <div className={styles.serviceList}>
            {c.services.map((s, i) => (
              <article key={s[0]}>
                <span>0{i + 1}</span>
                <div><small>{s[0]}</small><h3>{s[1]}</h3></div>
                <p>{s[2]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="studio" className={styles.studioSection}>
          <div className={styles.studioCopy}>
            <p className={styles.eyebrow}>{c.studioKicker}</p>
            <h2>{c.studioTitle}</h2>
            <p>{c.studioBody}</p>
          </div>
          <blockquote>{c.insight}</blockquote>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div>
            <p className={styles.eyebrow}>{c.cta}</p>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <a href={`mailto:${c.email}`} className={styles.mail}>{c.email}<span>↗</span></a>
        </section>
      </main>

      <footer className={styles.footer}>
        <Seal variant="mono" idSuffix="footer" className={styles.footerSeal}/>
        <span>{c.footer}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
