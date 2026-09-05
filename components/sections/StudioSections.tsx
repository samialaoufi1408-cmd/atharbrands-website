import type { Locale } from '@/content/site';
import { CONTACT_LINKEDIN } from '@/lib/contact';
import styles from './StudioSections.module.css';

const COPY = {
  ar: {
    services: 'الخدمات',
    serviceTitle: 'من وضوح الفكرة إلى حضور العلامة.',
    serviceIntro: 'نحدد معك ما يحتاجه مشروعك، ونوضح نطاق العمل ومخرجاته ومدته في عرض السعر قبل البدء.',
    items: [
      { title: 'استراتيجية العلامة', fit: 'لمن يبدأ علامة جديدة أو يعيد تحديد اتجاهها.', deliverables: ['فهم الجمهور والسوق', 'التموضع وشخصية العلامة', 'الرسائل ونبرة التواصل'] },
      { title: 'الهوية البصرية', fit: 'لمن يحتاج نظامًا متماسكًا يتجاوز تصميم الشعار.', deliverables: ['الشعار ونسخه', 'الألوان والخطوط والعناصر البصرية', 'دليل استخدام الهوية'] },
      { title: 'تطبيقات الهوية', fit: 'لمن يريد نقل الهوية إلى نقاط تواصل ملموسة.', deliverables: ['التغليف والمطبوعات', 'قوالب المحتوى الرقمي', 'تطبيقات الهوية بحسب نشاطك'] },
    ],
    request: 'ناقش احتياجك معنا',
    process: 'المنهج',
    processTitle: 'تعرف الخطوة التالية، من البداية.',
    steps: [
      { title: 'نفهم مشروعك', body: 'نناقش النشاط والجمهور والتحدي، ثم نتفق على نطاق العمل والمخرجات والجدول الزمني.' },
      { title: 'نحدد الاتجاه', body: 'نصوغ أساس العلامة والتوجه الإبداعي، ونراجع القرارات معك قبل التوسع في التصميم.' },
      { title: 'نبني ونراجع', body: 'نطور الهوية وتطبيقاتها، ونراجعها معك وفق مراحل الاعتماد المتفق عليها.' },
      { title: 'نسلّم ونوضح', body: 'نسلّم الملفات المتفق عليها ودليل الاستخدام، ونوضح طريقة تطبيق الهوية باتساق.' },
    ],
    about: 'عن أثر',
    aboutTitle: 'استوديو سعودي، وفهم قريب من مشروعك.',
    aboutBody: 'من الرياض، نعمل مع العلامات في المملكة والخليج على بناء هويات تربط الفكرة بالتطبيق. يقود الاستوديو سامي العوفي، ويبدأ كل مشروع بحوار واضح حول ما تحتاجه العلامة فعلًا.',
    profile: 'تعرّف على سامي عبر لينكدإن',
  },
  en: {
    services: 'Services',
    serviceTitle: 'From a clear idea to a coherent brand.',
    serviceIntro: 'We define what your project needs and agree on scope, deliverables and timing in the proposal before work begins.',
    items: [
      { title: 'Brand strategy', fit: 'For a new brand or a business redefining its direction.', deliverables: ['Audience and market understanding', 'Positioning and brand personality', 'Messaging and tone of voice'] },
      { title: 'Visual identity', fit: 'For a consistent system that goes beyond a logo.', deliverables: ['Logo and variations', 'Color, typography and visual elements', 'Brand usage guidelines'] },
      { title: 'Brand applications', fit: 'For bringing your identity to real touchpoints.', deliverables: ['Packaging and print', 'Digital content templates', 'Applications tailored to your business'] },
    ],
    request: 'Discuss your needs',
    process: 'Approach',
    processTitle: 'Know what comes next, from the start.',
    steps: [
      { title: 'Understand', body: 'We discuss your business, audience and challenge, then agree on scope, deliverables and timing.' },
      { title: 'Set the direction', body: 'We define the brand foundations and creative direction, reviewing key decisions with you before design development.' },
      { title: 'Build and review', body: 'We develop the identity and its applications, with reviews at the agreed approval stages.' },
      { title: 'Deliver and explain', body: 'We hand over the agreed files and guidelines, and explain how to use the identity consistently.' },
    ],
    about: 'About ATHR',
    aboutTitle: 'A Saudi studio, close to your business.',
    aboutBody: 'Based in Riyadh, we work with brands across Saudi Arabia and the GCC, connecting ideas with applications. Led by Sami Al Aoufi, the studio starts every project with an open conversation about what the brand actually needs.',
    profile: 'Meet Sami on LinkedIn',
  },
} as const;

export function StudioServices({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <section id="services" className={styles.services} aria-labelledby="services-title">
      <p className={styles.eyebrow}>{c.services}</p>
      <h2 id="services-title">{c.serviceTitle}</h2>
      <p className={styles.intro}>{c.serviceIntro}</p>
      <div className={styles.serviceGrid}>
        {c.items.map((service, index) => (
          <article key={service.title}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.fit}</p>
            <ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      <a className={styles.textLink} href="#contact">{c.request}</a>
    </section>
  );
}

export function StudioApproach({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <section id="approach" className={styles.approach} aria-labelledby="approach-title">
      <p className={styles.eyebrow}>{c.process}</p>
      <h2 id="approach-title">{c.processTitle}</h2>
      <ol className={styles.steps}>
        {c.steps.map((step, index) => (
          <li key={step.title}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.body}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StudioAbout({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div><p className={styles.eyebrow}>{c.about}</p><h2 id="about-title">{c.aboutTitle}</h2></div>
      <div><p>{c.aboutBody}</p><a className={styles.textLink} href={CONTACT_LINKEDIN} target="_blank" rel="noopener noreferrer">{c.profile}</a></div>
    </section>
  );
}
