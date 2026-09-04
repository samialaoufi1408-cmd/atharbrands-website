'use client';

import { useEffect } from 'react';

export function SumraWorkCardImageFix() {
  useEffect(() => {
    const timers: number[] = [];
    let observer: MutationObserver | null = null;

    const apply = () => {
      const card = document.querySelector(
        '#work article[data-project="sumra"]',
      ) as HTMLElement | null;
      if (!card) return;

      const frame = card.querySelector(
        '.sumraPortfolioImage',
      ) as HTMLElement | null;
      const image = frame?.querySelector('img') as HTMLImageElement | null;
      if (!frame) return;

      frame.style.backgroundImage =
        'url("/assets/sumra/cups.webp?v=11"), url("/assets/sumra/full.webp?v=11")';
      frame.style.backgroundSize = 'cover, cover';
      frame.style.backgroundPosition = 'center 52%, center';
      frame.style.backgroundRepeat = 'no-repeat, no-repeat';

      if (image) {
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
        image.style.display = 'none';
        image.setAttribute('aria-hidden', 'true');
      }

      card.setAttribute('data-sumra-photo-ready', 'true');
    };

    [0, 80, 300, 900, 2000].forEach((delay) => {
      timers.push(window.setTimeout(apply, delay));
    });

    observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer?.disconnect();
    };
  }, []);

  return (
    <style>{`
      #work article[data-project="sumra"] .sumraPortfolioImage {
        position: relative !important;
        width: 100% !important;
        min-height: 0 !important;
        aspect-ratio: 3 / 2 !important;
        overflow: hidden !important;
        background-color: #d8c1a5 !important;
        background-size: cover !important;
        background-position: center 52% !important;
        background-repeat: no-repeat !important;
      }

      #work article[data-project="sumra"] .sumraPortfolioImage img {
        display: none !important;
      }

      #work article[data-project="sumra"] .sumraPortfolioImage::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 24%;
        pointer-events: none;
        background: linear-gradient(to top, rgba(36, 22, 17, .18), transparent);
      }

      @media (max-width: 760px) {
        #work article[data-project="sumra"] .sumraPortfolioImage {
          aspect-ratio: 3 / 2 !important;
          background-position: center !important;
        }
      }
    `}</style>
  );
}
