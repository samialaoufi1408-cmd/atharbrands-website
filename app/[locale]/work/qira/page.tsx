import { permanentRedirect } from 'next/navigation';
import type { Locale } from '@/content/site';

/** Keep previously shared project links useful after the portfolio replacement. */
export default function PreviousProject({ params }: { params: { locale: Locale } }) {
  permanentRedirect(`/${params.locale}/work/naysar`);
}
