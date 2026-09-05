import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/content/site';
import { BUSINESS_CASES, type BusinessCaseKey } from '@/content/business-cases';
import { Seal } from '@/components/brand/Seal';
import { NawsaqMark, DarwaqMark } from '@/components/brand/BusinessMarks';
import { ProjectContact } from '@/components/sections/ProjectContact';
import styles from './BusinessCase.module.css';

function SpacePresentation({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const items = ar ? ['مساحة للّقاء', 'خصوصية مدروسة', 'ضوء أقرب'] : ['Space to gather', 'Considered privacy', 'Closer to daylight'];
  return <div className={styles.spacePresentation}>
    <div className={styles.demoHeader}><span>NAWSAQ</span><span>{ar ? 'استكشف المساحة' : 'Explore the space'}</span></div>
    <div className={styles.spaceBody}>
      <div className={styles.planArt} aria-hidden="true"><svg viewBox="0 0 420 320" fill="none">
        <path d="M40 40H380V280H40V40Z" stroke="currentColor" strokeWidth="9" />
        <path d="M180 40V102M180 136V208M180 244V280M40 178H105M135 178H180M282 40V99M282 132V280M282 189H380" stroke="currentColor" strokeWidth="6" />
        <path d="M198 104H264V210H198V104Z" fill="#BBC6DD" /><path d="M52 271H146M295 49H366M52 49H148" stroke="#B7684F" strokeWidth="5" />
        <rect x="62" y="72" width="78" height="40" rx="4" fill="#172F3D" opacity=".1" /><rect x="63" y="219" width="65" height="29" rx="3" fill="#172F3D" opacity=".1" /><rect x="310" y="220" width="40" height="40" rx="3" fill="#172F3D" opacity=".1" />
        <g fill="currentColor" fontFamily="Manrope, sans-serif" fontSize="20"><text x="76" y="145">01</text><text x="310" y="151">02</text><text x="216" y="164">03</text></g>
      </svg></div>
      <div><p className={styles.demoEyebrow}>{ar ? 'تفاصيل تصنع المكان' : 'Details make a place'}</p><h3>{ar ? 'ابدأ بما يناسب يومك.' : 'Start with your everyday life.'}</h3><ol>{items.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ol><a href="#identity-applications">{ar ? 'شاهد عرض الهوية' : 'View the identity applications'}<span aria-hidden="true">↗</span></a></div>
    </div>
  </div>;
}

function TrackingPresentation({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const steps = ar ? [
    { title: 'تم استلام الشحنة', detail: 'اكتملت خطوة الاستلام.' },
    { title: 'الشحنة في الطريق', detail: 'الحالة الحالية في هذا التصور.' },
    { title: 'التسليم', detail: 'الخطوة التالية في الرحلة.' },
  ] : [
    { title: 'Parcel collected', detail: 'Collection is complete.' },
    { title: 'In transit', detail: 'Current state in this concept.' },
    { title: 'Delivery', detail: 'The next step in the journey.' },
  ];
  return <div className={styles.trackingPresentation}>
    <div className={styles.trackingBrand}><DarwaqMark/><span>DARWAQ</span><small>{ar ? 'واجهة تتبّع تصورية' : 'Tracking interface concept'}</small></div>
    <div className={styles.trackingBody}><div><p className={styles.demoEyebrow}>{ar ? 'رحلة الشحنة' : 'The shipment journey'}</p><h3>{ar ? 'اعرف أين وصلت شحنتك.' : 'Know where it stands.'}</h3><p>{ar ? 'تسلسل واضح للحالة الحالية والخطوة التالية.' : 'A clear view of the current state and what comes next.'}</p><div className={styles.demoTag}>{ar ? 'بيانات عرض' : 'Demonstration data'}<span dir="ltr">DW–DEMO</span></div></div>
      <ol className={styles.trackingSteps}>{steps.map((step, i) => <li key={step.title} className={i === 1 ? styles.currentStep : undefined} aria-current={i === 1 ? 'step' : undefined}><span className={styles.stepDot}>{i === 0 ? '✓' : `0${i + 1}`}</span><div><h4>{step.title}</h4><p>{step.detail}</p></div></li>)}</ol>
    </div>
  </div>;
}

export function BusinessCase({ slug, locale }: { slug: BusinessCaseKey; locale: Locale }) {
  const project = BUSINESS_CASES[slug];
  const c = project.copy[locale];
  const ar = locale === 'ar';
  const Mark = slug === 'nawsaq' ? NawsaqMark : DarwaqMark;
  const asset = (name: string) => `/assets/${slug}/${name}`;
  return <main className={`${styles.page} ${styles[project.theme]}`} dir={ar ? 'rtl' : 'ltr'}>
    <header className={styles.nav}>
      <Link className={styles.studio} href={`/${locale}`} aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}><Seal variant="full" idSuffix={`${slug}-nav`} /><span>ATHR BRANDS</span></Link>
      <div><Link href={`/${ar ? 'en' : 'ar'}/work/${slug}`} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'العربية'}</Link><Link href={`/${locale}#work`}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link></div>
    </header>

    <section className={styles.intro} aria-labelledby={`${slug}-title`}>
      <div className={styles.topline}><span>{ar ? 'مشروع تصوري من أثر' : 'An independent ATHR concept'}</span><span>{c.sector}</span></div>
      <div className={styles.titleRow}><div><h1 id={`${slug}-title`}>{c.name}</h1><p className={styles.otherName} lang={ar ? 'en' : 'ar'}>{ar ? project.latinName : project.copy.ar.name}</p></div><div><h2>{c.tagline}</h2><p>{c.intro}</p></div><Mark className={styles.introMark}/></div>
      <ul className={styles.scope}>{c.scope.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <figure className={styles.hero}><Image src={asset(project.assets.hero)} alt={c.images.hero} width={1536} height={1024} sizes="100vw" priority /></figure>

    <section className={styles.section} aria-labelledby={`${slug}-challenge`}>
      <div className={styles.heading}><span className={styles.number}>01</span><p>{ar ? 'التحدي' : 'The challenge'}</p><h2 id={`${slug}-challenge`}>{c.challenge.title}</h2></div>
      <div className={styles.body}><p>{c.challenge.body}</p><dl className={styles.facts}><div><dt>{ar ? 'الجمهور' : 'Audience'}</dt><dd>{c.challenge.audience}</dd></div><div><dt>{ar ? 'الهدف' : 'Objective'}</dt><dd>{c.challenge.objective}</dd></div></dl></div>
    </section>

    <section className={styles.identity} aria-labelledby={`${slug}-idea`}>
      <div className={styles.brandBoard} aria-hidden="true"><Mark className={styles.boardMark}/><span className={styles.boardArabic}> {project.copy.ar.name}</span><span className={styles.boardLatin}>{project.latinName}</span><div className={styles.boardLine}/></div>
      <div className={styles.identityCopy}><span className={styles.number}>02</span><p className={styles.eyebrow}>{ar ? 'الفكرة البصرية' : 'The visual idea'}</p><h2 id={`${slug}-idea`}>{c.idea.title}</h2><p>{c.idea.body}</p></div>
    </section>
    <section className={styles.principles} aria-label={ar ? 'مبادئ الهوية' : 'Identity principles'}>{c.idea.principles.map((item, i) => <article key={item.title}><span className={styles.number}>0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</section>
    <section className={styles.palette} aria-label={ar ? 'نظام الألوان' : 'Color system'}><p>{ar ? 'نظام الألوان' : 'Color system'}</p><div>{project.colors.map((color, i) => <div className={styles.swatch} key={color}><span style={{ backgroundColor: color }}/><p>{c.paletteNames[i]}<small dir="ltr">{color}</small></p></div>)}</div></section>

    <section className={styles.section} id="identity-applications" aria-labelledby={`${slug}-applications`}><div className={styles.heading}><span className={styles.number}>03</span><p>{ar ? 'تطبيقات الهوية' : 'Identity applications'}</p><h2 id={`${slug}-applications`}>{c.application.title}</h2></div><div className={styles.body}><p>{c.application.body}</p></div></section>
    <figure className={styles.applicationImage}><Image src={asset(project.assets.application)} alt={c.images.application} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 90vw" /></figure>

    <section className={styles.digital} aria-labelledby={`${slug}-digital`}><div className={styles.section}><div className={styles.heading}><span className={styles.number}>04</span><p>{ar ? 'التجربة الرقمية' : 'The digital experience'}</p><h2 id={`${slug}-digital`}>{c.digital.title}</h2></div><div className={styles.body}><p>{c.digital.body}</p></div></div><figure className={styles.demoFigure}>{slug === 'nawsaq' ? <SpacePresentation locale={locale}/> : <TrackingPresentation locale={locale}/>}<figcaption>{c.digital.caption}</figcaption></figure></section>

    <section className={styles.section} aria-labelledby={`${slug}-environment`}><div className={styles.heading}><span className={styles.number}>05</span><p>{ar ? 'حضور العلامة' : 'The brand in use'}</p><h2 id={`${slug}-environment`}>{c.environment.title}</h2></div><div className={styles.body}><p>{c.environment.body}</p></div></section>
    <figure className={styles.environmentImage}><Image src={asset(project.assets.environment)} alt={c.images.environment} width={1536} height={1024} sizes="100vw" /></figure>

    <section className={styles.deliverables} aria-labelledby={`${slug}-deliverables`}><div><p className={styles.eyebrow}>{ar ? 'مخرجات الدراسة' : 'Study deliverables'}</p><h2 id={`${slug}-deliverables`}>{ar ? 'نظام جاهز للامتداد.' : 'A system made to extend.'}</h2></div><ul>{c.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
    <p className={styles.disclosure}>{ar ? 'مشروع تصوري مستقل من أثر. طُوّرت العلامة والمشاهد والتطبيقات لعرض نظام الهوية؛ ولا تمثل تكليفًا من عميل أو خدمة أو مشروعًا معروضًا للبيع.' : 'An independent ATHR concept. The brand, scenes and applications were developed for this identity study. They do not represent a client commission or an operating service or development offered for sale.'}</p>
    <ProjectContact locale={locale} project={project.latinName}/>
  </main>;
}
