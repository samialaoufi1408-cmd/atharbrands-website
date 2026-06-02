import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow (small, letter-spaced LATIN — spacing breaks Arabic joining) over an
 * Arabic heading, with an optional description. `tone="light"` for dark sections.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-right",
        className
      )}
    >
      {eyebrow && (
        <span className="text-gold inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.32em] uppercase">
          <span className="bg-gold/55 h-px w-7" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl leading-[1.15] text-balance sm:text-4xl md:text-[2.6rem]",
          light ? "text-ivory" : "text-midnight"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            light ? "text-ivory/70" : "text-midnight/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
