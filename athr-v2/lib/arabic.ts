/**
 * Arabic scripts are cursive: applying letter-spacing (which the ATHR design
 * uses heavily for Latin tracking — eyebrows .42em, buttons .28em, labels
 * .24em) visually disconnects the letters. The fix is to wrap every
 * contiguous Arabic run in <span class="ar-run"> which resets letter-spacing
 * to 0 and forces the Tajawal family, leaving the Latin tracking untouched.
 */

// Arabic + Arabic Supplement + Extended-A + presentation forms.
const AR_CHAR = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
// A run = Arabic chars possibly separated by plain spaces, ending on an Arabic char.
const AR_RUN = new RegExp(`[${AR_CHAR}](?:[${AR_CHAR} ]*[${AR_CHAR}])?`, 'g');

/**
 * Wrap Arabic runs in `<span class="ar-run">…</span>`. Safe to call on
 * strings containing the inline tags the CMS allows (em/br/span): tag
 * markup is skipped, only text segments are processed.
 */
export function wrapArabic(html: string): string {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) =>
      part.startsWith('<')
        ? part
        : part.replace(AR_RUN, (m) => `<span class="ar-run">${m}</span>`),
    )
    .join('');
}
