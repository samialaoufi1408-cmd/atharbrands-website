import { permanentRedirect } from 'next/navigation';
import type { Locale } from '@/content/site';

export default function RedirectCase({ params }: { params: { locale: Locale } }) {
  permanentRedirect(`/${params.locale}/work/aevu`);
}
