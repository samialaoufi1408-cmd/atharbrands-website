import { track, type BeforeSendEvent } from '@vercel/analytics';
import { campaignParameters, type CampaignParameters } from './campaign-attribution';
import { sessionCampaign } from './campaign-session';

type ConversionDetails = {
  locale: 'ar' | 'en';
  placement?: string;
  form?: 'general' | 'loyalty';
};

/** Keep approved UTM labels, without raw query parameters or URL fragments. */
export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url);
    url.search = new URLSearchParams(campaignParameters(url.search)).toString();
    url.hash = '';
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}

export function trackConversion(
  name: 'whatsapp_click' | 'enquiry_submitted',
  details: ConversionDetails,
  campaign: CampaignParameters = sessionCampaign(),
): void {
  try {
    // Only fixed UI labels and sanitized campaign labels; never form fields or links.
    track(name, { ...details, ...campaign });
  } catch {
    // A tracking failure must not turn a successful enquiry into a visible error.
  }
}
