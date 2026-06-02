/**
 * Subtle Arabic geometric lattice (8-point khatam stars). Tints via currentColor —
 * set color + opacity on the element, e.g. <Pattern className="text-gold/[0.07]" />.
 * Place inside a positioned, overflow-hidden parent.
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
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M32 12l20 20-20 20-20-20z" />
            <path d="M18 18h28v28H18z" />
            <path d="M32 0l6 6-6 6-6-6z" />
            <path d="M0 32l6-6 6 6-6 6z" />
            <path d="M64 32l-6-6-6 6 6 6z" />
            <path d="M32 64l6-6-6-6-6 6z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
