import { cn } from "@/lib/utils";

/**
 * The ATHAR mark: a pointed gateway (بوابة) with a central Alef beam (ا) rising
 * to a finial — a "trace" left on a threshold. Drawn in currentColor.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 41V24C12 13.5 17 6 24 6" />
        <path d="M36 41V24C36 13.5 31 6 24 6" />
        <path d="M24 12.5V41" />
        <path d="M7.5 41H40.5" />
      </g>
      <circle cx="24" cy="6" r="1.9" fill="currentColor" />
    </svg>
  );
}

/**
 * Full lockup: gold mark + stacked wordmark (أثر / ATHAR).
 * `tone="light"` is for dark backgrounds (ivory Arabic word);
 * `tone="dark"` is for light backgrounds (midnight Arabic word).
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="أثر | ATHAR">
      <LogoMark className="text-gold h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-kufi text-[1.35rem] leading-none tracking-tight",
            tone === "light" ? "text-ivory" : "text-midnight"
          )}
        >
          أثر
        </span>
        <span className="text-gold/90 font-serif text-[0.6rem] font-medium tracking-[0.45em] uppercase">
          ATHAR
        </span>
      </span>
    </span>
  );
}
