import { NAV_LINKS, SITE } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { AtharWordmark } from "../ui/Logo";
import { Pattern } from "../ui/Pattern";
import { Icon } from "../ui/Icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/12 bg-charcoal text-ivory">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.04]" id="footer-geo" />
      </div>

      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <AtharWordmark tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">{SITE.essenceAr}</p>
            <p className="mt-2 max-w-sm font-serif text-sm italic text-gold/70">{SITE.taglineEn}</p>
          </div>

          <nav className="md:col-span-3" aria-label="روابط">
            <h3 className="label-latin text-[0.6rem] text-gold/80">Navigate</h3>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ivory/65">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="label-latin text-[0.6rem] text-gold/80">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-ivory/65">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row">
          <p>© ATHAR Brands 2026. All rights reserved.</p>
          <p className="label-latin text-[0.58rem] text-gold/60">Legacy in Every Impact</p>
        </div>
      </Container>
    </footer>
  );
}
