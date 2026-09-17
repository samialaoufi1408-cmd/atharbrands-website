import { StrictMode } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
vi.mock('@vercel/analytics/next', () => ({ Analytics: () => null }));
vi.mock('next/navigation', () => ({
  usePathname: () => window.location.pathname,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
import { track } from '@vercel/analytics';
import { SiteAnalytics } from './SiteAnalytics';
import { sanitizeAnalyticsEvent } from '@/lib/web-analytics';

beforeEach(() => {
  vi.mocked(track).mockReset();
  window.sessionStorage.clear();
  window.history.replaceState({}, '', '/ar?utm_source=tiktok&utm_campaign=loyalty');
});
afterEach(() => cleanup());

function page() {
  return <StrictMode>
    <SiteAnalytics />
    <a href="https://wa.me/966580144451?text=private" target="_blank" data-cta="contact-whatsapp"><span>WhatsApp</span></a>
    <a href="https://wa.me.evil.example/966580144451" target="_blank">Unrelated link</a>
    <a href="http://[" target="_blank">Malformed link</a>
  </StrictMode>;
}

describe('site analytics', () => {
  it('tracks one WhatsApp click with the original campaign after client navigation', () => {
    const ui = render(page());
    window.history.replaceState({}, '', '/en/services/loyalty');
    ui.rerender(page());
    fireEvent.click(ui.getByText('WhatsApp'));
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith('whatsapp_click', {
      locale: 'en', placement: 'contact-whatsapp', utm_source: 'tiktok', utm_campaign: 'loyalty',
    });
    expect(JSON.stringify(vi.mocked(track).mock.calls)).not.toMatch(/private|966580144451/);
  });

  it('tracks middle clicks but ignores right clicks, unrelated links and malformed URLs', () => {
    const ui = render(page());
    fireEvent(ui.getByText('WhatsApp'), new MouseEvent('auxclick', { bubbles: true, button: 1 }));
    fireEvent(ui.getByText('WhatsApp'), new MouseEvent('auxclick', { bubbles: true, button: 2 }));
    fireEvent.click(ui.getByText('Unrelated link'));
    fireEvent.click(ui.getByText('Malformed link'));
    expect(track).toHaveBeenCalledTimes(1);
  });

  it('removes the listener when unmounted', () => {
    const ui = render(page());
    ui.rerender(<a href="https://wa.me/966580144451" target="_blank">WhatsApp</a>);
    fireEvent.click(ui.getByText('WhatsApp'));
    expect(track).not.toHaveBeenCalled();
  });

  it('redacts arbitrary queries and fragments while keeping supported UTM parameters', () => {
    const result = sanitizeAnalyticsEvent({
      type: 'pageview', url: 'https://www.athrbrands.sa/ar?utm_source=tiktok&utm_campaign=بطاقات%20الولاء&email=private%40example.com&gclid=secret#private',
    });
    const url = new URL(result!.url);
    expect(Object.fromEntries(url.searchParams)).toEqual({ utm_source: 'tiktok', utm_campaign: 'بطاقات الولاء' });
    expect(url.hash).toBe('');
    expect(result!.url).not.toMatch(/private|secret|gclid|email/);
  });
});
