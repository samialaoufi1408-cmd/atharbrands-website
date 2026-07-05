import schema from '@/content/schema.json';

/**
 * Per-key font-size overrides chosen in the control panel (`key__size` rows
 * in site_content). The v2 markup kept the legacy class names, so each key's
 * original CSS selector still targets the right element — one generated
 * <style> tag replays every override exactly like legacy cms.js did with
 * el.style.fontSize.
 */
const SELECTOR_BY_KEY = new Map(schema.map((s) => [s.key, s.selector]));

/** Accept simple CSS lengths only (e.g. 1.4rem, 18px, 90%). */
const SAFE_SIZE = /^\d+(\.\d+)?(rem|em|px|%|vw|vh)$/;

export function CmsSizeStyles({ overrides }: { overrides: Record<string, string> }) {
  const rules: string[] = [];
  for (const [key, value] of Object.entries(overrides)) {
    if (!key.endsWith('__size') || !value || !SAFE_SIZE.test(value)) continue;
    const selector = SELECTOR_BY_KEY.get(key.slice(0, -'__size'.length));
    if (selector) rules.push(`${selector}{font-size:${value}}`);
  }
  if (!rules.length) return null;
  return <style dangerouslySetInnerHTML={{ __html: rules.join('\n') }} />;
}
