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
  const light = tone === "light";
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8",
        light ? "border-midnight/10 bg-white" : "border-ivory/10 bg-ivory/[0.035]",
        hover && "card-lift",
        hover &&
          (light
            ? "hover:border-gold/45 hover:shadow-[0_30px_70px_-34px_rgba(13,27,42,0.3)]"
            : "hover:border-gold/45 hover:bg-ivory/[0.06]"),
        className
      )}
    >
      {children}
    </div>
  );
}
