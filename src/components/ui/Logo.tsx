import { cn } from "@/lib/utils";

/**
 * أثر | ATHAR — Primary symbol: "The Seal of Impact / ختم الأثر".
 * A bold gold ring at the centre, a radiant sunburst around it, a vertical
 * spire up & down ending in diamond finials, and horizontal arms with dots.
 * Rebuilt exactly from the brand board. Drawn in currentColor (champagne gold).
 */
export function AtharSymbol({ className }: { className?: string }) {
  const cx = 100;
  const cy = 130;
  const r = 30;
  const rayAngles = [
    15, 30, 45, 60, 75, 105, 120, 135, 150, 165, 195, 210, 225, 240, 255, 285, 300, 315, 330, 345,
  ];
  const rays = rayAngles.map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const inner = r + 9;
    const outer = inner + (i % 2 === 0 ? 24 : 12);
    return (
      <line
        key={deg}
        x1={(cx + inner * Math.cos(a)).toFixed(2)}
        y1={(cy + inner * Math.sin(a)).toFixed(2)}
        x2={(cx + outer * Math.cos(a)).toFixed(2)}
        y2={(cy + outer * Math.sin(a)).toFixed(2)}
        strokeWidth="2"
      />
    );
  });

  return (
    <svg viewBox="0 0 200 260" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <g opacity="0.85">{rays}</g>
        <circle cx={cx} cy={cy} r={r} strokeWidth="8" />
        <path d="M100 96 V54" strokeWidth="3.4" />
        <path d="M100 164 V206" strokeWidth="3.4" />
        <path d="M66 130 H40" strokeWidth="3" />
        <path d="M134 130 H160" strokeWidth="3" />
      </g>
      <path d="M100 32 L105 45 L100 58 L95 45 Z" fill="currentColor" />
      <path d="M100 202 L105 215 L100 228 L95 215 Z" fill="currentColor" />
      <circle cx="34" cy="130" r="4.5" fill="currentColor" />
      <circle cx="166" cy="130" r="4.5" fill="currentColor" />
    </svg>
  );
}

/** Compact mark (ring + axis + dots + small finials, no sunburst). */
export function AtharMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="75" r="21" strokeWidth="6" />
        <path d="M60 54 V36" strokeWidth="3" />
        <path d="M60 96 V114" strokeWidth="3" />
        <path d="M39 75 H26" strokeWidth="2.6" />
        <path d="M81 75 H94" strokeWidth="2.6" />
      </g>
      <path d="M60 24 L64 31 L60 38 L56 31 Z" fill="currentColor" />
      <path d="M60 112 L64 119 L60 126 L56 119 Z" fill="currentColor" />
      <circle cx="22" cy="75" r="3.4" fill="currentColor" />
      <circle cx="98" cy="75" r="3.4" fill="currentColor" />
    </svg>
  );
}

/** Wordmark: «أثر │ ATHAR». Gold/ivory on dark (tone="light"), charcoal on light. */
export function AtharWordmark({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "font-kufi text-xl font-bold leading-none",
          tone === "light" ? "text-ivory" : "text-charcoal"
        )}
      >
        أثر
      </span>
      <span className="h-5 w-px bg-gold/55" />
      <span
        className={cn(
          "font-serif text-base font-medium leading-none tracking-[0.3em]",
          tone === "light" ? "text-gold" : "text-gold-deep"
        )}
      >
        ATHAR
      </span>
    </span>
  );
}

/** Full lockup: compact mark + wordmark. Header / Footer. */
export function AtharLogo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label="أثر | ATHAR">
      <AtharMonogram className="h-8 w-auto shrink-0 text-gold" />
      <AtharWordmark tone={tone} />
    </span>
  );
}

/** Circular embossed seal: «ATHAR» curved on top, symbol centre, motto below. */
export function AtharSeal({
  className,
  id = "athar-seal",
  spin = false,
}: {
  className?: string;
  id?: string;
  spin?: boolean;
}) {
  return (
    <span
      className={cn(
        "emboss relative inline-grid shrink-0 place-items-center rounded-full border border-gold/25 bg-charcoal-700 text-gold",
        className
      )}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-[7%] rounded-full border border-gold/20" />
      <span className="pointer-events-none absolute inset-[12%] rounded-full border border-gold/12" />
      <svg
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 h-full w-full", spin && "motion-safe:animate-[spin_70s_linear_infinite]")}
      >
        <defs>
          <path id={`${id}-top`} d="M50,50 m-40,0 a40,40 0 0,1 80,0" fill="none" />
        </defs>
        <text
          fill="currentColor"
          className="font-serif"
          style={{ fontSize: "9px", letterSpacing: "5px", fontWeight: 500 }}
        >
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
            ATHAR
          </textPath>
        </text>
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="currentColor"
          className="font-latin"
          style={{ fontSize: "4.6px", letterSpacing: "1.6px", fontWeight: 500 }}
        >
          LEGACY IN EVERY IMPACT
        </text>
      </svg>
      <AtharSymbol className="relative h-[48%] w-auto" />
    </span>
  );
}

/* ---- Backward-compatible aliases ---- */
export const Logo = AtharLogo;
export const LogoMark = AtharSymbol;
export const Monogram = AtharMonogram;
