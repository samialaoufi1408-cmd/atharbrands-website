import { NAV_LINKS, SITE } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Pattern } from "../ui/Pattern";
import { Icon } from "../ui/Icon";

const FOOTER_SERVICES = [
  "استراتيجية العلامة",
  "الهوية البصرية",
  "بروفايل الشركات",
  "المواقع التعريفية",
  "إطلاق العلامة",
];

export function Footer() {
  return (
    <footer className="bg-midnight text-ivory relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="text-gold/[0.05] h-full w-full" id="footer-geo" />
      </div>
      <div className="via-gold/40 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent to-transparent" />

      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="text-ivory/65 mt-5 max-w-sm text-sm leading-relaxed">
              استوديو سعودي لبناء العلامات التجارية والاستراتيجيات البصرية، نخدم المشاريع الطموحة في
              السعودية والخليج.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="روابط سريعة">
            <h3 className="font-kufi text-gold text-sm">روابط</h3>
            <ul className="text-ivory/70 mt-4 flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="font-kufi text-gold text-sm">خدماتنا</h3>
            <ul className="text-ivory/70 mt-4 flex flex-col gap-2.5 text-sm">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-gold transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-kufi text-gold text-sm">تواصل</h3>
            <ul className="text-ivory/70 mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="location" className="text-gold/70 size-4 shrink-0" />
                {SITE.locationEn}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-gold flex items-center gap-2 transition-colors"
                >
                  <Icon name="mail" className="text-gold/70 size-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات أثر.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold flex items-center gap-2 transition-colors"
                >
                  <Icon name="whatsapp" className="text-gold/70 size-4 shrink-0" />
                  واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-ivory/10 text-ivory/55 mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>© ATHAR Brands 2026. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="text-gold/70 font-serif tracking-[0.3em]">ATHAR</span>
            <span>·</span>
            <span>صُنع بعناية في الرياض</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
