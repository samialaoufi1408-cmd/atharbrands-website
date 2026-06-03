/**
 * ATHAR brand pattern — a fine gold star/diamond lattice (rebuilt from the
 * board's "Brand Pattern"). Tints via currentColor; set colour + opacity on the
 * element, e.g. <Pattern className="text-gold/[0.07]" />. Place inside a
 * positioned, overflow-hidden parent.
 */
export function Pattern({ className, id = "athar-geo" }: { className?: string; id?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {/* diamond grid */}
            <path d="M30 0 L60 30 L30 60 L0 30 Z" />
            {/* centre 8-point star (khatam) */}
            <path d="M30 22 L38 30 L30 38 L22 30 Z" />
            <path d="M24 24 H36 V36 H24 Z" />
            {/* star nodes at the lattice points (edge midpoints) */}
            <path d="M30 -5 L35 0 L30 5 L25 0 Z" />
            <path d="M30 55 L35 60 L30 65 L25 60 Z" />
            <path d="M-5 30 L0 25 L5 30 L0 35 Z" />
            <path d="M55 30 L60 25 L65 30 L60 35 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
