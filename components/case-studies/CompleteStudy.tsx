import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Locale } from '@/content/site';
import { Seal } from '@/components/brand/Seal';
import { ProjectContact } from '@/components/sections/ProjectContact';
import styles from './CompleteStudy.module.css';

type Block =
  | { type: 'text' | 'note'; html: string }
  | { type: 'columns'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'palette'; colors: { name: string; hex: string; rgb: string; role: string }[] }
  | { type: 'cards'; items: { label: string; title: string; body: string }[] };

export type Study = {
  slug: string; name: string; latinName: string; sector: string; sectorEn: string;
  tagline: string; taglineEn: string; concept: boolean; summary: string; summaryEn: string;
  hero: string; heroWidth: number; heroHeight: number; download: string; pageCount: number;
  theme: { ink: string; brand: string; paper: string; soft: string; accent: string };
  chapters: { id: string; title: string; description: string; start: number; end: number }[];
  sections: { page: number; id: string; title: string; kicker: string; theme: string; blocks: Block[] }[];
};

// All rich text is authored and reviewed in this repository. No visitor input or
// remote CMS content reaches this renderer.
function RichText({ html }: { html: string }) {
  return <div className={styles.richText} dangerouslySetInnerHTML={{ __html: html }} />;
}

function StudyBlock({ block, title }: { block: Block; title: string }) {
  switch (block.type) {
    case 'text': return <RichText html={block.html} />;
    case 'note': return <aside className={styles.note}><RichText html={block.html} /></aside>;
    case 'columns': return <div className={styles.columns}>{block.items.map((html, index) => <RichText key={index} html={html} />)}</div>;
    case 'table': return <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={title}>
      <table><caption className={styles.srOnly}>{title}</caption>
        <thead><tr>{block.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
        <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}><RichText html={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>;
    case 'image': return <figure className={styles.figure}>
      <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 900px) 100vw, 70vw" />
      <figcaption>{block.alt}</figcaption>
    </figure>;
    case 'palette': return <div className={styles.palette}>{block.colors.map(color => <div key={color.hex}>
      <div className={styles.swatch} style={{ backgroundColor: color.hex }} />
      <h4>{color.name}</h4><code dir="ltr">{color.hex}</code><p dir="ltr">RGB {color.rgb}</p><p>{color.role}</p>
    </div>)}</div>;
    case 'cards': return <div className={styles.social}>{block.items.map(item => <figure key={item.label}>
      <div className={styles.socialSample}><span>{item.label}</span><h4>{item.title}</h4><p>{item.body}</p></div>
      <figcaption>قالب مقترح · {item.label}</figcaption>
    </figure>)}</div>;
  }
}

export function CompleteStudy({ study, locale }: { study: Study; locale: Locale }) {
  const ar = locale === 'ar';
  const vars = Object.fromEntries(Object.entries(study.theme).map(([key, value]) => [`--${key}`, value])) as CSSProperties;
  return <div className={styles.page} dir={ar ? 'rtl' : 'ltr'} style={vars}>
    <a className={styles.skipLink} href="#study">{ar ? 'انتقل إلى الدراسة' : 'Skip to the study'}</a>
    <header className={styles.nav}>
      <Link href={`/${locale}`} className={styles.brand} aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}><Seal variant="full" idSuffix={`${study.slug}-study-nav`} /><span>ATHR BRANDS</span></Link>
      <div className={styles.navLinks}>
        <Link href={`/${locale}#work`}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link>
        <Link href={`/${ar ? 'en' : 'ar'}/work/${study.slug}`} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'العربية'}</Link>
      </div>
    </header>
    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{ar ? `${study.concept ? 'مشروع تصوري من أثر' : 'هوية استوديو أثر'} · ${study.sector}` : `${study.concept ? 'A concept project by ATHR' : 'The ATHR studio identity'} · ${study.sectorEn}`}</p>
          <h1>{ar ? study.name : study.latinName}<span lang={ar ? 'en' : 'ar'} dir={ar ? 'ltr' : 'rtl'}>{ar ? study.latinName : study.name}</span></h1>
          <p className={styles.tagline}>{ar ? study.tagline : study.taglineEn}</p>
          <p className={styles.heroBody}>{ar ? study.summary : study.summaryEn}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#study">{ar ? 'اقرأ الدراسة كاملة' : 'Read the full Arabic study'}<span aria-hidden="true">↓</span></a>
            <a className={styles.downloadButton} href={study.download} download>{ar ? 'تحميل الدليل الكامل' : 'Download the Arabic guide'}<span>PDF · {ar ? '٤١ صفحة' : '41 pages'}</span></a>
          </div>
        </div>
        <figure className={styles.heroVisual}><Image src={`/assets/studies/${study.slug}/${study.hero}.webp`} alt={ar ? `الهوية المعتمدة لعلامة ${study.name}` : `${study.latinName} identity concept`} width={study.heroWidth} height={study.heroHeight} priority sizes="(max-width: 900px) 100vw, 55vw" /></figure>
      </section>
      <div className={styles.scope} lang="ar" dir="rtl">
        <p><strong>الاستراتيجية والهوية والتجربة.</strong> تسعة فصول، و٣٩ قسمًا تفصيليًا، ودليل من ٤١ صفحة.</p>
        <p>{study.concept ? 'مشروع تصوري يعرض منهجية أثر. بُنيت الدراسة على هوية العلامة القائمة، مع مقترحات للجمهور والتطبيق والتشغيل والتحقق. لم يُجرَ بحث ميداني أو تشغيل فعلي؛ وتُبيّن الفصول حدود كل مثال.' : 'دراسة لهوية استوديو أثر الفعلية، مبنية على مراجعها المعتمدة، مع توسعة للرحلة والتطبيق والقياس. الخطط والمؤشرات مقترحة، وأي نتائج تحتاج إلى قياس موثق.'}</p>
      </div>
      <div className={styles.studyLayout} lang="ar" dir="rtl" id="study">
        <aside className={styles.contents}>
          <nav aria-label={`فهرس دراسة ${study.name}`}>
            <p className={styles.contentsLabel}>فهرس الدراسة</p>
            <ol>{study.chapters.map((chapter, index) => <li key={chapter.id}><a href={`#${chapter.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{chapter.title}</a></li>)}</ol>
            <a className={styles.contentsDownload} href={study.download} download>تحميل الدليل<span>PDF ↓</span></a>
          </nav>
        </aside>
        <div className={styles.study}>
          {study.chapters.map((chapter, index) => <section className={styles.chapter} id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-heading`}>
            <header className={styles.chapterHeading}><span className={styles.chapterNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h2 id={`${chapter.id}-heading`}>{chapter.title}</h2><p>{chapter.description}</p></div></header>
            {study.sections.filter(section => section.page >= chapter.start && section.page <= chapter.end).map(section => <article className={`${styles.guideSection} ${section.theme === 'dark' ? styles.darkSection : ''}`} id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
              <header><p className={styles.eyebrow}>{section.kicker} · صفحة {section.page} من الدليل</p><h3 id={`${section.id}-heading`}>{section.title}</h3></header>
              <div className={styles.blocks}>{section.blocks.map((block, blockIndex) => <StudyBlock key={blockIndex} block={block} title={section.title} />)}</div>
            </article>)}
          </section>)}
        </div>
      </div>
      <section className={styles.closing} lang="ar" dir="rtl"><p className={styles.eyebrow}>{study.name} · الاستراتيجية والهوية البصرية</p><h2>{study.tagline}</h2><div className={styles.actions}><a className={styles.downloadButton} href={study.download} download>تحميل الدليل الكامل<span>PDF · ٤١ صفحة</span></a><a className={styles.backTop} href="#top">العودة إلى البداية ↑</a></div></section>
      <ProjectContact locale={locale} project={study.latinName} />
    </main>
  </div>;
}
