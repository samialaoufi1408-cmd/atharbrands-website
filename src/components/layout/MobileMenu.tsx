"use client";

import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { AtharWordmark } from "../ui/Logo";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Pattern } from "../ui/Pattern";

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
      className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-midnight/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-hidden bg-midnight shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Pattern className="pointer-events-none absolute inset-0 h-full w-full text-gold/[0.05]" id="menu-geo" />

        <div className="relative flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <AtharWordmark tone="light" />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="grid size-10 place-items-center rounded-button border border-ivory/20 text-ivory transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <nav className="relative flex flex-1 flex-col gap-0.5 overflow-y-auto px-5 py-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-center justify-between border-b border-ivory/[0.08] px-2 py-3.5 text-lg text-ivory/85 transition-colors hover:text-gold"
            >
              <span>{link.label}</span>
              <span className="label-latin text-[0.6rem] text-gold/45 transition-colors group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </nav>

        <div className="relative flex flex-col gap-3 border-t border-ivory/10 px-6 py-6">
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
