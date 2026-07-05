import type { Metadata } from 'next';
import { locales, Locale } from '@/content/site';
import { LightboxProvider } from '@/components/fx/Lightbox';
import { LightboxRoot } from '@/components/fx/Lightbox';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export function htmlAttrs(locale: Locale) {
  return locale === 'ar'
    ? { lang: 'ar', dir: 'rtl' as const, className: 'font-ar' }
    : { lang: 'en', dir: 'ltr' as const, className: 'font-sans' };
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const ar = params.locale === 'ar';
  return {
    metadataBase: new URL('https://athrbrands.sa'),
    title: ar ? 'أثر — إرث في كل أثر' : 'ATHR — Legacy in Every Impact',
    description: ar
      ? 'أثر بيت خبرة لبناء العلامات التجارية — هوياتٌ تُصاغ لتُذكر لأجيال.'
      : 'ATHR is a luxury brand atelier — identities crafted to be remembered for generations.',
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: {
      type: 'website',
      locale: ar ? 'ar_SA' : 'en_US',
      siteName: 'ATHR',
      images: ['/assets/aura-featured.png'],
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const a = htmlAttrs(params.locale);
  return (
    <html lang={a.lang} dir={a.dir} className={a.className}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'ATHR — أثر',
              url: 'https://athrbrands.sa',
              description:
                params.locale === 'ar'
                  ? 'أثر بيت خبرة لبناء العلامات التجارية'
                  : 'ATHR luxury brand identity atelier',
              address: [
                { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
                { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
              ],
            }),
          }}
        />
      </head>
      <body>
        <LightboxProvider>
          {children}
          <LightboxRoot />
        </LightboxProvider>
      </body>
    </html>
  );
}
