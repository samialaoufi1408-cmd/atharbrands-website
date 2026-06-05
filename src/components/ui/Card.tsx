import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  tone = "light",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  /** "light" = for ivory/light sections, "dark" = for midnight sections. */
  tone?: "light" | "dark";
  hover?: boolean;
}) {
  const elevated = tone === "light";
  return (
    <div
      className={cn(
        "rounded-card border border-ink/10 p-6 sm:p-8",
        elevated ? "bg-white shadow-soft" : "bg-white/80",
        hover && "card-lift hover:border-gold/40 hover:shadow-gold",
        className
      )}
    >
      {children}
    </div>
  );
}
