/**
 * ATHAR brand pattern — concentric "ripple" rings (from the brand book's ripple
 * motif). Tints via currentColor; set colour + opacity on the element, e.g.
 * <Pattern className="text-gold/[0.06]" />. Place inside a positioned,
 * overflow-hidden parent. Used as a subtle background texture — never as content.
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
        <pattern id={id} width="150" height="150" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="75" cy="75" r="14" />
            <circle cx="75" cy="75" r="29" />
            <circle cx="75" cy="75" r="44" />
            <circle cx="75" cy="75" r="59" />
            <circle cx="75" cy="75" r="74" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
