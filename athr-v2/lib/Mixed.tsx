import { wrapArabic } from './arabic';

/**
 * Renders a plain bilingual string with Arabic runs wrapped in
 * `.ar-run` spans so tracked (letter-spaced) containers don't
 * disconnect the Arabic glyph joining. For hardcoded UI labels only —
 * CMS/dictionary content goes through tHtml() instead.
 */
export function Mixed({
  text,
  as: Tag = 'span',
  className,
}: {
  text: string;
  as?: 'span' | 'div' | 'p' | 'label' | 'h4' | 'small';
  className?: string;
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: wrapArabic(text) }} />;
}
