import { cn } from "@/lib/utils";

/**
 * أثر | ATHAR — an original logo system derived from the letters & meaning of «أثر»
 * (a trace / lasting impression):
 *   ا (alef)  → the upright pillar — a gateway / lighthouse: beginning & stability.
 *   ء (hamza) → a small gold diamond resting above the pillar.
 *   ث (thaa)  → three dots — the spreading impact (Strategy · Identity · Impact).
 *   ر (raa)   → a soft arc beneath — the path / trace the brand leaves behind.
 * Set inside a calm contemporary Arabic gateway. Drawn in currentColor (gold).
 */
export function AtharSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* gateway */}
        <path d="M11 50 V22 C11 13 16.4 7.5 24 7.5 C31.6 7.5 37 13 37 22 V50" strokeWidth="1.6" />
        {/* alef — the pillar */}
        <path d="M24 16 V37" strokeWidth="2.4" />
        {/* raa — the trace */}
        <path d="M14.5 46 Q24 51.5 33.5 46" strokeWidth="2" />
      </g>
      {/* hamza — diamond */}
      <path d="M24 10.5 L26.5 13 L24 15.5 L21.5 13 Z" fill="currentColor" />
      {/* thaa — three dots of impact */}
      <circle cx="17.5" cy="41.5" r="1.5" fill="currentColor" />
      <circle cx="24" cy="41.5" r="1.5" fill="currentColor" />
      <circle cx="30.5" cy="41.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Wordmark: «أثر | ATHAR». Gold on dark (tone="light"), midnight on light (tone="dark"). */
export function AtharWordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-kufi text-xl font-semibold leading-none",
          tone === "light" ? "text-gold" : "text-midnight"
        )}
      >
        أثر
      </span>
      <span className="h-4 w-px bg-gold/50" />
      <span
        className={cn(
          "label-latin text-[0.62rem] leading-none",
          tone === "light" ? "text-gold/85" : "text-gold-deep"
        )}
      >
        ATHAR
      </span>
    </span>
  );
}

/** Full lockup: symbol + wordmark. Used in Header / Hero / Footer. */
export function AtharLogo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="أثر | ATHAR">
      <AtharSymbol className="h-9 w-auto shrink-0 text-gold" />
      <AtharWordmark tone={tone} />
    </span>
  );
}

/** Compact mark inside a geometric seal frame. Favicon / preview board / cards / pattern. */
export function AtharMonogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-2xl border border-gold/45 text-gold",
        className
      )}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-[6px] rounded-xl border border-gold/25" />
      <svg viewBox="0 0 48 56" fill="none" className="h-[66%] w-[66%]">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 14 V38" strokeWidth="2.6" />
          <path d="M14 46 Q24 51.5 34 46" strokeWidth="2.2" />
        </g>
        <path d="M24 8 L26.7 11 L24 14 L21.3 11 Z" fill="currentColor" />
        <circle cx="17.5" cy="42" r="1.6" fill="currentColor" />
        <circle cx="24" cy="42" r="1.6" fill="currentColor" />
        <circle cx="30.5" cy="42" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

/** Circular seal: curved «ATHAR BRANDS · BRAND STUDIO» around the mark. */
export function AtharSeal({
  className,
  id = "athar-seal",
  text = "ATHAR  BRANDS   ·   BRAND  STUDIO   ·   ",
  spin = false,
}: {
  className?: string;
  id?: string;
  text?: string;
  spin?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-full border border-gold/40 text-gold",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 h-full w-full", spin && "motion-safe:animate-[spin_60s_linear_infinite]")}
      >
        <defs>
          <path id={`${id}-path`} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text
          fill="currentColor"
          className="font-latin"
          style={{ fontSize: "7.5px", letterSpacing: "1.3px", fontWeight: 600 }}
        >
          <textPath href={`#${id}-path`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <AtharSymbol className="h-[42%] w-auto" />
    </span>
  );
}

/* ---- Backward-compatible aliases (every existing usage renders the new logo) ---- */
export const Logo = AtharLogo;
export const LogoMark = AtharSymbol;
export const Monogram = AtharMonogram;
