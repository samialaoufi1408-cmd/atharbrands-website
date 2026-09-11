const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

// Retain campaign labels only, never the complete query string or ad click IDs.
export function campaignAttribution(search: string): string {
  const params = new URLSearchParams(search);
  return CAMPAIGN_KEYS.flatMap(key => {
    const value = params.get(key);
    return value && /^[a-zA-Z0-9_.-]{1,80}$/.test(value) ? [`${key}: ${value}`] : [];
  }).join('\n');
}
