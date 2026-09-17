'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { sessionCampaign } from '@/lib/campaign-session';
import { sanitizeAnalyticsEvent, trackConversion } from '@/lib/web-analytics';

const PLACEMENTS = new Set([
  'contact-whatsapp', 'project-whatsapp', 'floating-whatsapp', 'loyalty-whatsapp',
]);

export function SiteAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    sessionCampaign(search);
  }, [pathname, search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || (event.type === 'click' ? event.button !== 0 : event.button !== 1)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (url.protocol !== 'https:' || url.hostname !== 'wa.me') return;

      const placement = link.dataset.cta || '';
      trackConversion('whatsapp_click', {
        locale: window.location.pathname.startsWith('/en') ? 'en' : 'ar',
        placement: PLACEMENTS.has(placement) ? placement : 'other-whatsapp',
      });
    };
    document.addEventListener('click', onClick);
    document.addEventListener('auxclick', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('auxclick', onClick);
    };
  }, []);

  return <Analytics beforeSend={sanitizeAnalyticsEvent} />;
}
