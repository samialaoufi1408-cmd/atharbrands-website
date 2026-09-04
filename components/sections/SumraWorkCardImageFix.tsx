'use client';

import { useEffect } from 'react';
import sumraCups from './assets/sumra-cups.webp';

export function SumraWorkCardImageFix() {
  useEffect(() => {
    let observer: MutationObserver | null = null;
    const timers: number[] = [];

    const apply = () => {
      const card = document.querySelector(
        '#work article[data-project="sumra"]',
      ) as HTMLElement | null;
      if (!card) return false;

      const frame = card.querySelector('.sumraPortfolioImage') as HTMLElement | null;
      const image = card.querySelector('.sumraPortfolioImage img') as HTMLImageElement | null;
      if (!frame || !image) return false;

      image.src = sumraCups.src;
      image.removeAttribute('srcset');
      image.removeAttribute('sizes');
      image.loading = 'eager';
      image.decoding = 'async';
      image.alt = 'تطبيقات هوية سُمرة على أكواب القهوة';
      image.style.display = 'block';
      frame.removeAttribute('data-image-error');
      card.setAttribute('data-sumra-photo-ready', 'true');
      return true;
    };

    const schedule = () => {
      [0, 60, 250, 800, 1800].forEach((delay) => {
        timers.push(window.setTimeout(apply, delay));
      });
    };

    schedule();
    observer = new MutationObserver(() => apply());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach(window.clearTimeout);
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
        background: #d8c1a5 !important;
      }

      #work article[data-project="sumra"] .sumraPortfolioImage img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center 52% !important;
        opacity: 1 !important;
        filter: none !important;
      }

      #work article[data-project="sumra"] .sumraPortfolioImage::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 28%;
        pointer-events: none;
        background: linear-gradient(to top, rgba(36, 22, 17, .2), transparent);
      }

      @media (max-width: 760px) {
        #work article[data-project="sumra"] .sumraPortfolioImage {
          aspect-ratio: 3 / 2 !important;
        }

        #work article[data-project="sumra"] .sumraPortfolioImage img {
          object-position: center !important;
        }
      }
    `}</style>
  );
}
