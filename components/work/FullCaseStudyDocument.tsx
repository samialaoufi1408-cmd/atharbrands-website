import type { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './full-case-study-document.module.css';

type FullCaseStudyDocumentProps = {
  locale: 'ar' | 'en';
  titleAr: string;
  titleEn: string;
  fileName: string;
  pdfSrc: string;
  pageCount: number;
  accent?: string;
};

export function FullCaseStudyDocument({
  locale,
  titleAr,
  titleEn,
  fileName,
  pdfSrc,
  pageCount,
  accent = '#9f7448',
}: FullCaseStudyDocumentProps) {
  const ar = locale === 'ar';
  const title = ar ? titleAr : titleEn;
  const viewerSrc = `${pdfSrc}#view=FitH&toolbar=1&navpanes=0`;

  return (
    <main
      className={styles.page}
      dir={ar ? 'rtl' : 'ltr'}
      style={{ '--case-accent': accent } as CSSProperties}
    >
      <header className={styles.header}>
        <Link href={`/${locale}#work`} className={styles.backLink}>
          {ar ? 'العودة إلى الأعمال' : 'Back to work'}
        </Link>

        <div className={styles.identity}>
          <span>ATHR BRANDS</span>
          <strong>{title}</strong>
        </div>
      </header>

      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>
            {ar ? 'ملف العمل الكامل' : 'Full case-study document'}
          </p>
          <h1>{title}</h1>
          <p className={styles.meta}>
            {ar
              ? `${pageCount} صفحة · الملف الأصلي كاملًا دون اختصار`
              : `${pageCount} pages · the complete original document without abridgement`}
          </p>
        </div>

        <div className={styles.actions}>
          <a href={pdfSrc} target="_blank" rel="noreferrer">
            {ar ? 'فتح الملف كاملًا' : 'Open full document'}
          </a>
          <a href={pdfSrc} download={fileName}>
            {ar ? 'تحميل PDF' : 'Download PDF'}
          </a>
        </div>
      </section>

      <section
        className={styles.viewerSection}
        aria-label={ar ? `ملف ${title} الكامل` : `${title} full document`}
      >
        <iframe
          className={styles.viewer}
          src={viewerSrc}
          title={ar ? `ملف ${title} الكامل` : `${title} full case study`}
          loading="eager"
        />

        <noscript>
          <p className={styles.fallback}>
            <a href={pdfSrc}>{ar ? 'فتح ملف PDF الكامل' : 'Open the complete PDF'}</a>
          </p>
        </noscript>
      </section>

      <footer className={styles.footer}>
        <span>{fileName}</span>
        <span>{ar ? `${pageCount} صفحة` : `${pageCount} pages`}</span>
      </footer>
    </main>
  );
}
