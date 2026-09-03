'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Locale } from '@/content/site';
import sumraCups from '@/lib/sumra-v2/cups';

export function SumraWorkInjector({ locale }: { locale: Locale }) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const section = document.querySelector('#work');
    if (!section) return;

    const intro = section.firstElementChild;
    const eyebrow = intro?.querySelector('p');
    const heading = intro?.querySelector('h2');
    const description = intro?.querySelector('div');

    if (eyebrow) eyebrow.textContent = '04';
    if (heading) heading.textContent = locale === 'ar' ? 'أعمال' : 'Work';
    if (description) {
      description.textContent = locale === 'ar'
        ? 'نحوّل الفكرة إلى هوية متكاملة تنمو مع الوقت، وتصنع أثرًا حقيقيًا في السوق.'
        : 'We turn ideas into complete identities that grow over time and create real market impact.';
    }

    const firstArticle = section.querySelector('article');
    const list = firstArticle?.parentElement;
    if (!list) return;

    list.classList.add('athrWorkGridV2');
    Array.from(list.children).forEach((item) => item.classList.add('athrWorkCardV2'));
    setTarget(list);
  }, [locale]);

  if (!target) return null;
  const ar = locale === 'ar';

  return createPortal(
    <>
      <article className="athrWorkCardV2 sumraPortfolioCard">
        <div className="sumraPortfolioImage">
          <img
            src={sumraCups}
            alt={ar ? 'تطبيق هوية سُمرة على أكواب القهوة' : 'SUMRA identity applied to coffee cups'}
          />
        </div>
        <div className="sumraPortfolioCopy" dir={ar ? 'rtl' : 'ltr'}>
          <div className="sumraPortfolioTopline">
            <span>04</span>
            <small>{ar ? 'مشروع تصوري من ATHR BRANDS' : 'Concept project by ATHR BRANDS'}</small>
          </div>
          <p className="sumraPortfolioSector">
            {ar ? 'محمصة ومقهى قهوة مختصة · الرياض' : 'Specialty coffee roastery & café · Riyadh'}
          </p>
          <h3>{ar ? 'سُمرة' : 'SUMRA'}</h3>
          <p className="sumraPortfolioDescription">
            {ar
              ? 'هوية تحتفي بدرجات التحميص، وتحول الحبة إلى تجربة واضحة ودافئة يفهمها الجميع.'
              : 'An identity celebrating roast levels and turning each bean into a clear, warm experience.'}
          </p>
          <Link href={`/${locale}/work/sumra`} className="sumraPortfolioLink">
            {ar ? 'استكشف المشروع' : 'Explore the project'}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>

      <style>{`
        .athrWorkGridV2 {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: clamp(16px, 2vw, 26px) !important;
          align-items: stretch !important;
        }

        .athrWorkGridV2 > .athrWorkCardV2 {
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          border: 1px solid rgba(31, 25, 20, .12) !important;
          border-radius: 18px !important;
          background: #f7f1e8 !important;
          box-shadow: 0 18px 48px rgba(50, 35, 24, .06) !important;
        }

        .athrWorkGridV2 > .athrWorkCardV2 > div:first-child {
          width: 100% !important;
          min-height: 0 !important;
          aspect-ratio: 4 / 3 !important;
          overflow: hidden !important;
          border-radius: 0 !important;
        }

        .athrWorkGridV2 > .athrWorkCardV2 > div:nth-child(2) {
          flex: 1 !important;
          min-width: 0 !important;
          padding: clamp(22px, 2.2vw, 34px) !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .athrWorkGridV2 .sumraPortfolioImage {
          background: #d9c6ae !important;
        }

        .sumraPortfolioImage img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .sumraPortfolioTopline {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
          color: rgba(32, 24, 18, .48);
          margin-bottom: 20px;
        }

        .sumraPortfolioSector {
          margin: 0 0 10px;
          color: #96683f;
          font-size: 14px;
          line-height: 1.7;
        }

        .sumraPortfolioCopy h3 {
          margin: 0 0 16px;
          font-size: clamp(34px, 3.2vw, 54px);
          font-weight: 500;
          color: #211813;
        }

        .sumraPortfolioDescription {
          margin: 0;
          color: rgba(33, 24, 19, .68);
          line-height: 1.9;
        }

        .sumraPortfolioLink {
          margin-top: auto;
          padding-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          color: #8d5f39;
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          padding-bottom: 10px;
        }

        @media (max-width: 1180px) {
          .athrWorkGridV2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 700px) {
          .athrWorkGridV2 {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
          }

          .athrWorkGridV2 > .athrWorkCardV2 > div:first-child {
            aspect-ratio: 3 / 2 !important;
          }
        }
      `}</style>
    </>,
    target,
  );
}
