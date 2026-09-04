import type { Locale } from '@/content/site';

// Reuse the studio's existing, published contact details.
export const CONTACT_EMAIL = 'admin@atharbrands.com';
export const CONTACT_PHONE = '+966599444486';
export const CONTACT_LINKEDIN = 'https://www.linkedin.com/in/sami-alaoufi';

export function whatsappUrl(locale: Locale, project?: string) {
  const message = locale === 'ar'
    ? `السلام عليكم، أرغب في مناقشة مشروع هوية بصرية مع أثر.${project ? ` أعجبني مشروع ${project}.` : ''}`
    : `Hello, I would like to discuss a brand identity project with ATHR.${project ? ` I liked the ${project} project.` : ''}`;
  return `https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`;
}
