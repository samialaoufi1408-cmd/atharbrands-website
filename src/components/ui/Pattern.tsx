/**
 * ATHAR brand pattern — tiled droplet-into-ripple motif (the brand book's
 * "Brand Pattern"). Tints via currentColor; set colour + opacity on the element,
 * e.g. <Pattern className="text-gold/[0.05]" />. Place inside a positioned,
 * overflow-hidden parent. Subtle background texture — never shown as content.
 */
export function Pattern({ className, id = "athar-ripple" }: { className?: string; id?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="120" height="135" patternUnits="userSpaceOnUse">
          <g fill="currentColor" stroke="none">
            <circle cx="60" cy="30" r="2.2" />
            <circle cx="60" cy="39" r="1" />
            <circle cx="60" cy="46" r="1" />
            <ellipse cx="60" cy="90" rx="4" ry="1.8" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <ellipse cx="60" cy="90" rx="38" ry="13" />
            <ellipse cx="60" cy="90" rx="25" ry="9" />
            <ellipse cx="60" cy="90" rx="13" ry="4.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
