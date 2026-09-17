import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  window.sessionStorage.clear();
  window.history.replaceState({}, '', '/ar');
});
afterEach(() => vi.restoreAllMocks());

describe('campaign session', () => {
  it('keeps the landing campaign through clean URLs, language changes and reloads', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    window.history.replaceState({}, '', '/ar?utm_source=tiktok&utm_campaign=loyalty&gclid=private&email=private%40example.com');
    expect(sessionCampaign()).toEqual({ utm_source: 'tiktok', utm_campaign: 'loyalty' });
    window.history.replaceState({}, '', '/en/services/loyalty');
    expect(sessionCampaign()).toEqual({ utm_source: 'tiktok', utm_campaign: 'loyalty' });
    expect(window.sessionStorage.getItem('athr:campaign:v1')).not.toMatch(/private|gclid|email/);
    vi.resetModules();
    const reloaded = await import('@/lib/campaign-session');
    expect(reloaded.sessionCampaign()).toEqual({ utm_source: 'tiktok', utm_campaign: 'loyalty' });
  });

  it('replaces the previous campaign without mixing labels when another tagged visit arrives', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    sessionCampaign('?utm_source=tiktok&utm_campaign=old&utm_content=video01');
    expect(sessionCampaign('?utm_source=linkedin&utm_campaign=new')).toEqual({ utm_source: 'linkedin', utm_campaign: 'new' });
    expect(sessionCampaign('')).toEqual({ utm_source: 'linkedin', utm_campaign: 'new' });
  });

  it('does not invent a campaign for a new direct session', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    expect(sessionCampaign('')).toEqual({});
  });

  it('revalidates stored attribution instead of trusting arbitrary stored values', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    window.sessionStorage.setItem('athr:campaign:v1', 'utm_source=x&utm_campaign=person%40example.com&email=private');
    expect(sessionCampaign('')).toEqual({ utm_source: 'x' });
  });

  it('keeps attribution in memory when storage access is denied', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => { throw new DOMException('Denied', 'SecurityError'); });
    expect(sessionCampaign('?utm_source=tiktok')).toEqual({ utm_source: 'tiktok' });
    expect(sessionCampaign('')).toEqual({ utm_source: 'tiktok' });
  });

  it('uses the new campaign when storage is readable but writes fail', async () => {
    const { sessionCampaign } = await import('@/lib/campaign-session');
    sessionCampaign('?utm_source=old');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Full', 'QuotaExceededError'); });
    expect(sessionCampaign('?utm_source=new')).toEqual({ utm_source: 'new' });
    expect(sessionCampaign('')).toEqual({ utm_source: 'new' });
  });
});
