'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Locale } from '@/content/site';

const SUMRA_CUPS = '/assets/sumra/cups.svg';
const SUMRA_FALLBACK = '/assets/sumra/full.svg';

export function SumraWorkInjector({ locale }: { locale: Locale }) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const section = document.querySelector('#work');
    if (!section) return;

    section.setAttribute('data-athr-work-section', 'true');

    const intro = section.firstElementChild;
    const eyebrow = intro?.querySelector('p');
    const heading = intro?.querySelector('h2');
    const description = intro?.querySelector('div');

    if (eyebrow) eyebrow.textContent = '04';
    if (heading) heading.textContent = locale === 'ar' ? 'أعمال' : 'Work';
    if (description) {
      description.textContent =
        locale === 'ar'
          ? 'نحوّل الفكرة إلى هوية متكاملة تنمو مع الوقت، وتصنع أثرًا حقيقيًا في السوق.'
          : 'We turn an idea into a complete identity that grows over time and creates real market impact.';
    }

    const firstArticle = section.querySelector('article');
    const grid = firstArticle?.parentElement;
    if (grid) {
      grid.setAttribute('data-athr-work-grid', 'true');
      setTarget(grid);
    }
  }, [locale]);

  if (!target) return null;

  const ar = locale === 'ar';

  return createPortal(
    <>
      <article className="sumraPortfolioCard" data-project="sumra">
        <div className="sumraPortfolioImage">
          <img
            src={SUMRA_CUPS}
            alt={
              ar
                ? 'تطبيقات هوية سُمرة على أكواب القهوة'
                : 'SUMRA identity applied to coffee cups'
            }
            loading="lazy"
            decoding="async"
            onError={(event) => {
              if (!event.currentTarget.src.endsWith(SUMRA_FALLBACK)) {
                event.currentTarget.src = SUMRA_FALLBACK;
              }
            }}
          />
        </div>

        <div className="sumraPortfolioCopy" dir={ar ? 'rtl' : 'ltr'}>
          <div className="sumraPortfolioTopline">
            <span>04</span>
            <small>
              {ar ? 'مشروع تصوري من ATHRBRANDS' : 'Concept project by ATHRBRANDS'}
            </small>
          </div>

          <p className="sumraPortfolioSector">
            {ar
              ? 'محمصة ومقهى قهوة مختصة · الرياض'
              : 'Specialty coffee roastery & café · Riyadh'}
          </p>

          <h3>{ar ? 'سُمرة' : 'SUMRA'}</h3>

          <p className="sumraPortfolioDescription">
            {ar
              ? 'هوية تحتفي بدرجات التحميص وتحول الحبة إلى تجربة يفهمها الجميع.'
              : 'An identity celebrating roast levels and turning the bean into an experience everyone can understand.'}
          </p>

          <Link href={`/${locale}/work/sumra`} className="sumraPortfolioLink">
            <span>{ar ? 'استكشف المشروع' : 'Explore the project'}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>

      <style>{`
        #work[data-athr-work-section="true"] {
          background: #f4efe7 !important;
          color: #211712 !important;
          padding-inline: clamp(22px, 4vw, 72px) !important;
        }

        #work[data-athr-work-section="true"] > div:first-child {
          display: grid !important;
          grid-template-columns: minmax(220px, .75fr) minmax(280px, 1.25fr) !important;
          gap: clamp(28px, 6vw, 110px) !important;
          align-items: end !important;
          padding-block: clamp(64px, 9vw, 130px) clamp(38px, 5vw, 72px) !important;
        }

        #work[data-athr-work-section="true"] > div:first-child > p {
          color: #a56e45 !important;
          font-size: 14px !important;
          letter-spacing: .2em !important;
        }

        #work[data-athr-work-section="true"] > div:first-child > h2 {
          font-size: clamp(54px, 8vw, 118px) !important;
          line-height: .95 !important;
          margin: 0 !important;
          font-weight: 500 !important;
        }

        #work[data-athr-work-section="true"] > div:first-child > div {
          color: rgba(33, 23, 18, .62) !important;
          line-height: 1.9 !important;
          font-size: clamp(16px, 1.5vw, 22px) !important;
          max-width: 520px !important;
        }

        #work [data-athr-work-grid="true"] {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: clamp(20px, 3vw, 38px) !important;
          align-items: stretch !important;
          padding-bottom: clamp(70px, 9vw, 130px) !important;
        }

        #work [data-athr-work-grid="true"] > article {
          min-width: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          background: rgba(255, 253, 248, .72) !important;
          border: 1px solid rgba(112, 76, 52, .18) !important;
          border-radius: 18px !important;
          overflow: hidden !important;
          box-shadow: 0 16px 42px rgba(65, 43, 28, .05) !important;
        }

        #work [data-athr-work-grid="true"] > article > div:first-child {
          width: 100% !important;
          min-height: 0 !important;
          aspect-ratio: 16 / 10 !important;
          overflow: hidden !important;
          border-radius: 0 !important;
        }

        #work [data-athr-work-grid="true"] > article > div:nth-child(2) {
          flex: 1 !important;
          padding: clamp(24px, 3vw, 42px) !important;
          display: flex !important;
          flex-direction: column !important;
          min-width: 0 !important;
        }

        #work [data-athr-work-grid="true"] > article h3 {
          font-size: clamp(34px, 4vw, 58px) !important;
          line-height: 1.08 !important;
          margin-block: 10px 16px !important;
        }

        #work [data-athr-work-grid="true"] > article a {
          margin-top: auto !important;
        }

        .sumraPortfolioImage {
          position: relative;
          background: #e8d6be;
        }

        .sumraPortfolioImage img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 54%;
        }

        .sumraPortfolioCopy {
          flex: 1;
          padding: clamp(24px, 3vw, 42px);
          display: flex;
          flex-direction: column;
        }

        .sumraPortfolioTopline {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: rgba(33, 23, 18, .48);
          font-size: 12px;
          letter-spacing: .04em;
        }

        .sumraPortfolioSector {
          color: #9b6740;
          font-size: 15px;
          margin: 24px 0 6px;
        }

        .sumraPortfolioCopy h3 {
          font-size: clamp(38px, 5vw, 66px);
          line-height: 1;
          font-weight: 500;
          margin: 8px 0 18px;
        }

        .sumraPortfolioDescription {
          color: rgba(33, 23, 18, .7);
          line-height: 1.9;
          margin: 0 0 28px;
        }

        .sumraPortfolioLink {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border: 1px solid #b7794d;
          color: #8f5b36;
          padding: 16px 20px;
          text-decoration: none;
          border-radius: 8px;
          margin-top: auto;
        }

        @media (min-width: 1280px) {
          #work [data-athr-work-grid="true"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          #work [data-athr-work-grid="true"] > article > div:first-child {
            aspect-ratio: 4 / 3 !important;
          }
        }

        @media (max-width: 760px) {
          #work[data-athr-work-section="true"] {
            padding-inline: 16px !important;
          }

          #work[data-athr-work-section="true"] > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
            padding-block: 54px 30px !important;
          }

          #work[data-athr-work-section="true"] > div:first-child > h2 {
            font-size: clamp(58px, 19vw, 92px) !important;
          }

          #work [data-athr-work-grid="true"] {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
          }

          #work [data-athr-work-grid="true"] > article > div:first-child {
            aspect-ratio: 4 / 3 !important;
          }

          .sumraPortfolioImage img {
            object-position: center;
          }
        }
      `}</style>
    </>,
    target,
  );
}
