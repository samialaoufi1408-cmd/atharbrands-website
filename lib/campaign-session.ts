import { campaignParameters, type CampaignParameters } from './campaign-attribution';

const STORAGE_KEY = 'athr:campaign:v1';
let memoryCampaign: CampaignParameters = {};
let memoryOnly = false;

/** Last tagged visit in this tab's session. Untagged navigation keeps its source. */
export function sessionCampaign(search?: string): CampaignParameters {
  if (typeof window === 'undefined') return {};

  let saved = memoryCampaign;
  try {
    // Revalidate stored labels and discard everything outside the UTM allowlist.
    if (!memoryOnly) saved = campaignParameters(window.sessionStorage.getItem(STORAGE_KEY) || '');
  } catch {
    // Some browsers disable storage. Retain attribution in memory while mounted.
    memoryOnly = true;
  }

  const incoming = campaignParameters(search ?? window.location.search);
  const tagged = Object.keys(incoming).length > 0;
  memoryCampaign = tagged ? incoming : saved;
  if (tagged) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, new URLSearchParams(incoming).toString());
      memoryOnly = false;
    } catch {
      // Attribution must never stop navigation or contact-form submission.
      memoryOnly = true;
    }
  }
  return { ...memoryCampaign };
}
