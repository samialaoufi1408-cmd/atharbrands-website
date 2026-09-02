import { notFound } from 'next/navigation';
import { Locale, locales } from '@/content/site';
import { StudioHome } from '@/components/sections/StudioHome';

export const revalidate = 300;

export default async function Page({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  return <StudioHome locale={params.locale as Locale} />;
}
