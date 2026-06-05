/**
 * أثر ripple mark — the droplet-into-water symbol as crisp vector (matches the
 * brand book's icon). Tints via currentColor; size via className, e.g.
 * <RippleMark className="h-10 w-auto text-gold" />. Razor-sharp at any scale.
 */
export function RippleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 92" className={className} fill="none" aria-hidden="true">
      {/* falling droplet + trail */}
      <circle cx="50" cy="12" r="3" fill="currentColor" />
      <circle cx="50" cy="21" r="1.4" fill="currentColor" />
      <circle cx="50" cy="28" r="1.4" fill="currentColor" />
      <circle cx="50" cy="35" r="1.4" fill="currentColor" />
      {/* concentric ripples */}
      <g stroke="currentColor">
        <ellipse cx="50" cy="61" rx="42" ry="15.5" strokeWidth="1.3" opacity="0.4" />
        <ellipse cx="50" cy="61" rx="28" ry="10.5" strokeWidth="1.5" opacity="0.68" />
        <ellipse cx="50" cy="61" rx="14.5" ry="5.6" strokeWidth="1.8" />
      </g>
      {/* point of impact */}
      <ellipse cx="50" cy="61" rx="5" ry="2.2" fill="currentColor" />
    </svg>
  );
}
