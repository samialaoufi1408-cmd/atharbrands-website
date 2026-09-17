const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
export type CampaignParameters = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

// Campaign labels only: do not use personal details as UTM values.
// Reject control characters, URLs and email addresses; allow Arabic and spaces.
export function campaignParameters(search: string): CampaignParameters {
  const params = new URLSearchParams(search);
  const campaign: CampaignParameters = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (!value || !/^[\p{L}\p{M}\p{N}_. -]{1,80}$/u.test(value)) continue;
    const label = value.normalize('NFC').trim().replace(/ +/g, ' ');
    if (label) campaign[key] = label;
  }
  return campaign;
}

export function formatCampaignAttribution(campaign: CampaignParameters): string {
  return CAMPAIGN_KEYS.flatMap(key => campaign[key] ? [`${key}: ${campaign[key]}`] : []).join('\n');
}

export function campaignAttribution(search: string): string {
  return formatCampaignAttribution(campaignParameters(search));
}
