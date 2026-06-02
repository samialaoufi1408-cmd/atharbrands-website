"use client";

import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className={cn(
          "bg-midnight/70 absolute inset-0 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "bg-midnight absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="border-ivory/10 flex items-center justify-between border-b px-6 py-5">
          <Logo tone="light" />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="border-ivory/20 text-ivory hover:border-gold/50 hover:text-gold grid size-10 place-items-center rounded-full border transition-colors"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-ivory/85 hover:bg-ivory/5 hover:text-gold rounded-xl px-4 py-3 text-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="border-ivory/10 flex flex-col gap-3 border-t px-6 py-6">
          <Button href="#contact" onClick={onClose} className="w-full">
            ابدأ مشروعك
          </Button>
          <Button
            href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات أثر.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            className="w-full"
          >
            <Icon name="whatsapp" className="size-5" />
            تواصل عبر واتساب
          </Button>
        </div>
      </aside>
    </div>
  );
}
