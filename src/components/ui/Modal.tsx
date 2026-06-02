"use client";

import { useEffect, type ReactNode } from "react";
import { Icon } from "./Icon";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="bg-midnight/70 absolute inset-0 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-rise bg-ivory relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl shadow-2xl sm:rounded-3xl"
      >
        <div className="border-midnight/10 bg-ivory/95 sticky top-0 flex items-center justify-between border-b px-6 py-4 backdrop-blur">
          <h3 className="font-kufi text-midnight text-lg">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="border-midnight/15 text-midnight/60 hover:border-gold/50 hover:text-gold-deep grid size-9 place-items-center rounded-full border transition-colors"
          >
            <Icon name="close" className="size-4" />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
