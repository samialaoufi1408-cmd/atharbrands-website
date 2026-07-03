import { notFound } from 'next/navigation';
import { Locale, locales } from '@/content/site';
import { fetchCms } from '@/lib/cms';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Statement } from '@/components/sections/Statement';
import { Philosophy } from '@/components/sections/Philosophy';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { Process } from '@/components/sections/Process';
import { Impact } from '@/components/sections/Impact';
import { Journal } from '@/components/sections/Journal';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

/** ISR — control-panel edits show up within 5 minutes without a redeploy. */
export const revalidate = 300;

export default async function Page({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const cms = await fetchCms();
  const ov = cms.overrides;
  return (
    <>
      <Nav locale={locale} />
      <main id="top">
        <Hero locale={locale} ov={ov} />
        <Statement locale={locale} ov={ov} />
        <Philosophy locale={locale} ov={ov} />
        <Services locale={locale} ov={ov} />
        <Work locale={locale} ov={ov} extra={cms.work} />
        <Process locale={locale} ov={ov} />
        <Impact locale={locale} ov={ov} />
        <Journal locale={locale} ov={ov} extra={cms.journal} />
        <Contact locale={locale} ov={ov} />
      </main>
      <Footer locale={locale} ov={ov} />
    </>
  );
}
