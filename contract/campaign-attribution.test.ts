import { describe, expect, it } from 'vitest';
import { campaignAttribution } from '@/lib/campaign-attribution';

describe('campaign attribution', () => {
  it('preserves approved campaign labels in a stable order', () => {
    expect(campaignAttribution('?utm_content=video_01&utm_source=tiktok&utm_medium=organic_social&utm_campaign=loyalty_cafes_202609'))
      .toBe('utm_source: tiktok\nutm_medium: organic_social\nutm_campaign: loyalty_cafes_202609\nutm_content: video_01');
  });
  it('does not retain personal query parameters, click IDs or invalid labels', () => {
    expect(campaignAttribution('?email=sami@example.com&gclid=secret&utm_source=person%40example.com&utm_medium=%3Cscript%3E&utm_campaign=' + 'a'.repeat(81))).toBe('');
  });
  it('allows direct visits without manufacturing a campaign', () => {
    expect(campaignAttribution('')).toBe('');
  });
  it('retains Arabic campaign labels, spaces and search terms', () => {
    const search = new URLSearchParams({ utm_source: 'x', utm_campaign: 'بطاقات الولاء', utm_term: 'متاجر الرياض' });
    expect(campaignAttribution(search.toString())).toBe('utm_source: x\nutm_campaign: بطاقات الولاء\nutm_term: متاجر الرياض');
  });
  it('rejects control characters, links and whitespace-only labels', () => {
    expect(campaignAttribution('?utm_source=hello%0Aworld&utm_campaign=https%3A%2F%2Fexample.com&utm_medium=%20%20')).toBe('');
  });
});
