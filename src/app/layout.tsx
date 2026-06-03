import type { Metadata, Viewport } from "next";
import { Cairo, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE, BRAND_COLORS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jost",
});

const description =
  "استوديو سعودي متخصص في استراتيجية العلامات التجارية، تصميم الهوية البصرية، الشعارات، البروفايلات، والمواقع التعريفية للمشاريع الطموحة في السعودية والخليج.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "أثر | ATHAR Brands — استوديو بناء العلامات التجارية",
    template: "%s — أثر | ATHAR Brands",
  },
  description,
  keywords: [
    "أثر",
    "ATHAR",
    "branding Saudi Arabia",
    "تصميم هوية بصرية",
    "تصميم شعار",
    "استراتيجية علامة تجارية",
    "براندنق",
    "شركة براندنق",
    "هوية تجارية",
  ],
  applicationName: "ATHAR Brands",
  authors: [{ name: "ATHAR Brands", url: SITE.url }],
  creator: "ATHAR Brands",
  publisher: "ATHAR Brands",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: SITE.url,
    siteName: "ATHAR Brands",
    title: "أثر | ATHAR Brands — استوديو بناء العلامات التجارية",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "أثر | ATHAR Brands",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "design",
};

export const viewport: Viewport = {
  themeColor: BRAND_COLORS.midnight,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="bg-charcoal text-ivory min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
