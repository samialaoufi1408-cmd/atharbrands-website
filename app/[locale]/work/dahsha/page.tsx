import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/content/site';
import { caseMetadata } from '@/lib/case-metadata';
import { ProjectContact } from '@/components/sections/ProjectContact';
import styles from './dahsha.module.css';

const PAGES = [
  ['الغلاف', 'Cover'],
  ['موجز المشروع', 'Project brief'],
  ['اسم العلامة', 'Brand name'],
  ['الجمهور', 'Audience'],
  ['منصة العلامة', 'Brand platform'],
  ['شخصية العلامة', 'Brand personality'],
  ['التوجهات الإبداعية', 'Creative directions'],
  ['التوجه المختار', 'Selected direction'],
  ['تطوير الشعار', 'Logo development'],
  ['الشعار المعتمد', 'Selected logo'],
  ['نسخ الشعار', 'Logo variations'],
  ['المساحة الآمنة والأحجام', 'Clear space and sizes'],
  ['الألوان', 'Color system'],
  ['الخطوط', 'Typography'],
  ['النمط البصري', 'Visual pattern'],
  ['الأيقونات', 'Iconography'],
  ['أسلوب الصور', 'Image direction'],
  ['التغليف', 'Packaging'],
  ['الواجهة ونقطة البيع', 'Storefront and point of sale'],
  ['المطبوعات', 'Print applications'],
  ['المحتوى الرقمي', 'Digital content'],
  ['التحقق النهائي', 'Final review'],
] as const;

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return caseMetadata(params.locale, 'dahsha');
}

export default function DahshaCase({ params }: { params: { locale: Locale } }) {
  const ar = params.locale === 'ar';
  return (
    <main className={styles.page} dir={ar ? 'rtl' : 'ltr'}>
      <header className={styles.nav}>
        <Link href={`/${params.locale}`} className={styles.brand}>ATHR BRANDS</Link>
        <Link href={`/${params.locale}#work`}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{ar ? 'مشروع تصوري من أثر' : 'A concept project by ATHR'}</p>
        <h1><span className={styles.srOnly}>{ar ? 'دهشة' : 'DAHSHA'}</span><Image src="/assets/dahsha/logo-negative.png" alt="" width={3250} height={1344} sizes="(max-width: 760px) 80vw, 420px" priority /></h1>
        <h2>{ar ? 'مرح يراه الطفل، وهوية يطمئن لها الوالد.' : 'Joy a child sees. A brand a parent trusts.'}</h2>
        <p>{ar ? 'استراتيجية وهوية بصرية لمتجر ألعاب وتجارب للأطفال، تربط متعة الاكتشاف بوضوح الاختيار.' : 'A strategy and visual identity for children’s toys and experiences, connecting the joy of discovery with clear choices.'}</p>
        <div className={styles.heroActions}>
          <a className={styles.primary} href="#study">{ar ? 'استكشف الدراسة' : 'Explore the study'}</a>
          <a className={styles.secondary} href="/downloads/dahsha-case-study-ar.pdf" download>{ar ? 'تحميل الدراسة — PDF' : 'Download Arabic PDF'}</a>
          <Link href={`/${params.locale}#contact`} className={styles.simpleLink}>{ar ? 'ابدأ مشروعك' : 'Start your project'}</Link>
        </div>
      </section>
      <section id="study" className={styles.study}>
        <div className={styles.studyIntro}>
          <p className={styles.eyebrow}>DAHSHA · ATHR BRANDS</p>
          <h2>{ar ? 'الدراسة الكاملة — 22 صفحة' : 'The complete study — 22 pages'}</h2>
          <p>{ar ? 'من الاستراتيجية والتوجه الإبداعي إلى الشعار والتطبيقات. اختر القسم الذي يهمك، أو افتح أي صفحة بحجمها الكامل.' : 'From strategy and creative direction to the logo and applications. Choose a section or open any page at full size. The original illustrated study is in Arabic.'}</p>
        </div>
        <details className={styles.contents}>
          <summary>{ar ? 'فهرس الدراسة' : 'Study contents'}</summary>
          <nav aria-label={ar ? 'أقسام دراسة دهشة' : 'DAHSHA study sections'}>
            {PAGES.map((labels, index) => <a key={index} href={`#study-page-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{labels[ar ? 0 : 1]}</a>)}
          </nav>
        </details>
        <div className={styles.gallery}>
          {PAGES.map((labels, index) => {
            const number = String(index + 1).padStart(2, '0');
            const src = `/assets/dahsha/page-${number}.jpg`;
            const label = labels[ar ? 0 : 1];
            return (
              <figure id={`study-page-${index + 1}`} key={number} className={styles.studyPage}>
                <figcaption><span>{number} · {label}</span><a href={src} target="_blank" rel="noopener noreferrer" aria-label={ar ? `تكبير الصفحة ${index + 1}: ${label}` : `Open page ${index + 1}: ${label}`}>{ar ? 'تكبير الصفحة' : 'Full size'}</a></figcaption>
                <a href={src} target="_blank" rel="noopener noreferrer" aria-label={ar ? `عرض ${label} بحجمها الكامل` : `View ${label} at full size`}>
                  <Image src={src} alt={ar ? `دراسة دهشة — الصفحة ${index + 1}: ${label}` : `DAHSHA Arabic study — page ${index + 1}: ${label}`} width={1132} height={1600} sizes="(max-width: 760px) 100vw, 960px" unoptimized />
                </a>
              </figure>
            );
          })}
        </div>
        <p className={styles.disclaimer}>{ar ? 'دهشة مشروع تصوري لعلامة خيالية من أثر، وليست متجرًا قائمًا أو عميلًا حقيقيًا. الأسماء والبيانات والتطبيقات لأغراض العرض.' : 'DAHSHA is a fictional concept brand by ATHR, not an operating store or a real client. Names, data and applications are illustrative.'}</p>
      </section>
      <ProjectContact locale={params.locale} project="DAHSHA"/>
      <footer className={styles.footer}><span>DAHSHA · ATHR BRANDS</span><Link href={`/${params.locale}#work`}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link></footer>
    </main>
  );
}
