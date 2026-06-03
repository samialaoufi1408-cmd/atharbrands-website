"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-gold/15 bg-charcoal/85 py-3 backdrop-blur-md"
            : "border-transparent bg-transparent py-5"
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          <a href="#home" aria-label="أثر | ATHAR — الرئيسية" className="shrink-0">
            <Logo tone="light" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-button px-3.5 py-2 text-sm text-ivory/65 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="#contact" variant="outlineLight" size="sm" className="hidden sm:inline-flex">
              تواصل معنا
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              className="grid size-10 place-items-center rounded-button border border-ivory/20 text-ivory transition-colors hover:border-gold/50 hover:text-gold lg:hidden"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
