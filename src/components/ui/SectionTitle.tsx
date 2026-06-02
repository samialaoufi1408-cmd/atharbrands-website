import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small-caps LATIN eyebrow over a large, confident Arabic heading.
 * `tone="light"` for dark sections.
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
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-right",
        className
      )}
    >
      {eyebrow && (
        <span className="label-latin inline-flex items-center gap-3 text-gold">
          <span className="h-px w-8 bg-gold/55" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl leading-[1.12] sm:text-4xl md:text-5xl",
          light ? "text-ivory" : "text-midnight"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/70" : "text-midnight/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
