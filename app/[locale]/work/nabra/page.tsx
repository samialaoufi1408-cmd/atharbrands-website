import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/content/site';
import { caseMetadata } from '@/lib/case-metadata';
import { Seal } from '@/components/brand/Seal';
import { ProjectContact } from '@/components/sections/ProjectContact';
import guide from '@/content/nabra-guide.json';
import styles from './nabra.module.css';

type Block =
  | { type: 'text' | 'note'; html: string }
  | { type: 'columns'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'palette'; colors: { name: string; hex: string; rgb: string; role: string }[] }
  | { type: 'social'; items: { background: string; label: string; title: string; body: string; dark: boolean }[] };

type GuideSection = { page: number; id: string; title: string; kicker: string; theme: string; blocks: Block[] };
const sections = guide as GuideSection[];
const download = '/downloads/NABRA-Strategy-and-Visual-Identity.pdf';
const chapters = [
  { id: 'foundation', title: 'الأساس والسياق', description: 'نبدأ من معنى الاسم، ونطاق المشروع، وقراءة عرض الخدمات في القطاع.', start: 2, end: 4 },
  { id: 'positioning', title: 'الجمهور والتموضع', description: 'نحدد احتياج المراجع، ومساحة التميز، وما نريد أن تعنيه نبرأ.', start: 5, end: 7 },
  { id: 'voice', title: 'الشخصية والرسائل', description: 'الغاية والقيم والوعد تتحول إلى لغة متسقة وبنية واضحة للخدمات.', start: 8, end: 13 },
  { id: 'journey', title: 'رحلة المراجع والتحقق', description: 'كل انتقال في رحلة الرعاية له معلومة، ومسؤول، وطريقة للاختبار.', start: 14, end: 17 },
  { id: 'visual-strategy', title: 'استراتيجية الهوية البصرية', description: 'من المرافقة والوضوح إلى المسارات والألوان والتكوين.', start: 18, end: 19 },
  { id: 'identity', title: 'نظام الهوية وقواعده', description: 'الشعار والألوان والخطوط والخلفيات والتصوير والتفاصيل المساندة.', start: 20, end: 29 },
  { id: 'applications', title: 'التطبيقات والتجربة', description: 'كيف تعمل الهوية على الورق، وفي المكان، وعبر نقاط التواصل الرقمية.', start: 30, end: 35 },
  { id: 'launch', title: 'الإطلاق والقياس والإدارة', description: 'خطة تطبيق مقترحة، ومؤشرات قابلة للقياس، ومسؤوليات واضحة للمراجعة.', start: 36, end: 39 },
  { id: 'references', title: 'المراجع وحدود البحث', description: 'المصادر التي استندت إليها الدراسة، وما يحتاج تحققًا قبل الإنتاج.', start: 40, end: 40 },
];

// Rich text is checked-in editorial content extracted from the reviewed guide.
// It is never supplied by a visitor or a remote CMS.
function RichText({ html }: { html: string }) {
  return <div className={styles.richText} dangerouslySetInnerHTML={{ __html: html }} />;
}

function GuideBlock({ block, title }: { block: Block; title: string }) {
  switch (block.type) {
    case 'text': return <RichText html={block.html} />;
    case 'note': return <aside className={styles.note}><RichText html={block.html} /></aside>;
    case 'columns': return <div className={styles.columns}>{block.items.map((html, i) => <RichText key={i} html={html} />)}</div>;
    case 'image': return <figure className={styles.figure}>
      <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 900px) 100vw, 75vw" />
      <figcaption>{block.alt}</figcaption>
    </figure>;
    case 'table': return <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={title}>
      <table>
        <caption className={styles.srOnly}>{title}</caption>
        <thead><tr>{block.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
        <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}><RichText html={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>;
    case 'palette': return <div className={styles.palette}>{block.colors.map(color => <div key={color.hex}>
      <div className={styles.swatch} style={{ backgroundColor: color.hex }} />
      <h4>{color.name}</h4><code dir="ltr">{color.hex}</code><p dir="ltr">RGB {color.rgb}</p><p>{color.role}</p>
    </div>)}</div>;
    case 'social': return <div className={styles.social}>{block.items.map(item => <figure key={item.label}>
      <div className={`${styles.socialSample} ${item.dark ? styles.inverse : ''}`} style={{ backgroundImage: `url(${item.background})` }}>
        <span>نبرأ</span><h4>{item.title}</h4><p>{item.body}</p>
      </div><figcaption>{item.label}</figcaption>
    </figure>)}</div>;
  }
}

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return caseMetadata(params.locale, 'nabra');
}

export default function NabraCase({ params }: { params: { locale: Locale } }) {
  const ar = params.locale === 'ar';
  return <div className={styles.page} dir={ar ? 'rtl' : 'ltr'}>
    <a className={styles.skipLink} href="#study">{ar ? 'انتقل إلى الدراسة' : 'Skip to the study'}</a>
    <header className={styles.nav}>
      <Link href={`/${params.locale}`} className={styles.brand} aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}><Seal variant="full" idSuffix="nabra-case" /><span>ATHR BRANDS</span></Link>
      <div className={styles.navLinks}>
        <Link href={`/${params.locale}#work`}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link>
        <Link href={`/${ar ? 'en' : 'ar'}/work/nabra`} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'العربية'}</Link>
      </div>
    </header>
    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{ar ? 'مشروع تصوري من أثر · قطاع الرعاية الصحية' : 'A concept project by ATHR · Healthcare'}</p>
          <h1>{ar ? 'نبرأ' : 'NABRA'}<span>{ar ? 'مركز نبرأ الطبي' : 'NABRA MEDICAL CENTER'}</span></h1>
          <p className={styles.tagline}>{ar ? 'معك، خطوة بخطوة.' : 'With you, step by step.'}</p>
          <p className={styles.heroBody}>{ar ? 'دراسة كاملة تربط استراتيجية العلامة بهويتها وتجربة المراجع؛ من معنى الاسم والتموضع إلى الرسائل وقواعد الاستخدام والتطبيقات والإطلاق.' : 'A complete Arabic case study connecting brand strategy, visual identity and the visitor journey, from naming and positioning to messages, applications and launch planning.'}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#study">{ar ? 'اقرأ الدراسة كاملة' : 'Read the full Arabic study'}<span aria-hidden="true">↓</span></a>
            <a className={styles.downloadButton} href={download} download>{ar ? 'تحميل الدليل الكامل' : 'Download the Arabic guide'}<span>PDF · {ar ? '٤١ صفحة' : '41 pages'}</span></a>
          </div>
        </div>
        <figure className={styles.heroVisual}><Image src="/assets/nabra/campaign.webp" alt={ar ? 'تصور حملة نبرأ: طبيبة تستمع إلى مراجعة، وشعار نبرأ وعبارة معك، خطوة بخطوة' : 'NABRA campaign concept: a doctor listening to a visitor, alongside the brand identity'} width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 58vw" /></figure>
      </section>
      <div className={styles.scope} lang="ar" dir="rtl">
        <p><strong>رعاية واضحة وقريبة.</strong> نبدأ بفهم احتياجك، ونوضح الخطوة التالية.</p>
        <p>نبرأ مركز طبي تصوري أُعد لعرض منهجية أثر. الخدمات والرحلات وخطة الإطلاق مقترحات للتطوير والتحقق؛ لم يُجرَ بحث ميداني أو تشغيل فعلي للمركز، وصور التطبيقات تصورية.</p>
      </div>
      <div className={styles.studyLayout} lang="ar" dir="rtl" id="study">
        <aside className={styles.contents}>
          <nav aria-label="فهرس دراسة نبرأ">
            <p className={styles.contentsLabel}>فهرس الدراسة</p>
            <ol>{chapters.map((chapter, i) => <li key={chapter.id}><a href={`#${chapter.id}`}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{chapter.title}</a></li>)}</ol>
            <a className={styles.contentsDownload} href={download} download>تحميل الدليل <span aria-hidden="true">↓</span></a>
          </nav>
        </aside>
        <article className={styles.study} aria-label="استراتيجية نبرأ وهويتها البصرية كاملة">
          {chapters.map((chapter, i) => <section className={styles.chapter} id={chapter.id} key={chapter.id}>
            <header className={styles.chapterHeading}>
              <span className={styles.chapterNumber} aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
              <div><h2>{chapter.title}</h2><p>{chapter.description}</p></div>
            </header>
            {sections.filter(section => section.page >= chapter.start && section.page <= chapter.end).map(section => <section id={section.id} key={section.id} className={`${styles.guideSection} ${section.theme === 'dark' ? styles.darkSection : section.theme === 'sage' ? styles.sageSection : ''}`}>
              <header><p className={styles.eyebrow}>{section.kicker}</p><h3>{section.title}</h3></header>
              <div className={styles.blocks}>{section.blocks.map((block, index) => <GuideBlock block={block} title={section.title} key={index} />)}</div>
            </section>)}
          </section>)}
        </article>
      </div>
      <section className={styles.closing}>
        <div lang="ar" dir="rtl"><p className={styles.eyebrow}>نبرأ · من الاستراتيجية إلى التجربة</p><h2>معك، خطوة بخطوة.</h2><p>الاسم والرسالة والهوية والتجربة تعمل معًا لتوضيح الخطوة التالية.</p></div>
        <div className={styles.actions}><a className={styles.primaryButton} href={download} download>{ar ? 'تحميل الدليل الكامل' : 'Download the full guide'}</a><a className={styles.backTop} href="#top">{ar ? 'إلى بداية الدراسة' : 'Back to top'} ↑</a></div>
      </section>
      <ProjectContact locale={params.locale} project="NABRA" />
    </main>
  </div>;
}
