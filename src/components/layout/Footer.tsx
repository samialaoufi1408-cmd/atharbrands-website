import { NAV_LINKS, SITE } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { Logo, LogoMark } from "../ui/Logo";
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
    <footer className="relative overflow-hidden bg-midnight text-ivory">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="footer-geo" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/45 to-transparent" />
      {/* large monogram watermark */}
      <div className="pointer-events-none absolute -left-10 bottom-[-3rem] opacity-[0.04]">
        <LogoMark className="h-72 w-72 text-gold" />
      </div>

      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/65">
              استوديو سعودي لبناء العلامات التجارية والاستراتيجيات البصرية، نخدم المشاريع الطموحة
              في السعودية والخليج.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="روابط سريعة">
            <h3 className="label-latin text-[0.62rem] text-gold">Navigate</h3>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ivory/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="label-latin text-[0.62rem] text-gold">Services</h3>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ivory/70">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <a href="#services" className="transition-colors hover:text-gold">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="label-latin text-[0.62rem] text-gold">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2">
                <Icon name="location" className="size-4 shrink-0 text-gold/70" />
                {SITE.locationEn}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Icon name="mail" className="size-4 shrink-0 text-gold/70" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات أثر.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Icon name="whatsapp" className="size-4 shrink-0 text-gold/70" />
                  واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/55 sm:flex-row">
          <p>© ATHAR Brands 2026. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="label-latin text-[0.6rem] text-gold/70">ATHAR</span>
            <span className="h-3 w-px bg-ivory/20" />
            <span>صُنع بعناية في الرياض</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
