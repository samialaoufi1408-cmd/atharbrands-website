import type { ReactNode, SVGProps } from "react";

/**
 * Single source of truth for line icons. Stroke-based, 24×24, currentColor.
 * A couple of glyphs (whatsapp, spark) are solid — listed in FILLED.
 */

const FILLED = new Set(["whatsapp", "spark"]);

const PATHS: Record<string, ReactNode> = {
  // ---- Services ----
  strategy: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    </>
  ),
  identity: (
    <>
      <rect x="4" y="4" width="11" height="11" rx="2.4" />
      <circle cx="15" cy="15" r="4.8" />
    </>
  ),
  naming: (
    <>
      <path d="M3.6 12.4l8-8a1.5 1.5 0 011.06-.44h5.84A1.5 1.5 0 0120 5.5v5.84a1.5 1.5 0 01-.44 1.06l-8 8a1.5 1.5 0 01-2.12 0L3.6 14.5a1.5 1.5 0 010-2.1z" />
      <circle cx="15.4" cy="8.6" r="1.3" />
    </>
  ),
  profile: (
    <>
      <path d="M6 3.5h7L18.5 9v9.5a2 2 0 01-2 2H6a2 2 0 01-2-2V5.5a2 2 0 012-2z" />
      <path d="M12.5 3.5V9h5.5" />
      <path d="M7.5 13h7M7.5 16.5h5" />
    </>
  ),
  web: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 9h17" />
      <path d="M6.4 7h0M8.4 7h0" />
    </>
  ),
  launch: (
    <>
      <path d="M20.5 3.5L10.5 13.5" />
      <path d="M20.5 3.5l-6.2 16.8-3.8-7-7-3.8z" />
    </>
  ),
  // ---- Industries ----
  restaurant: (
    <>
      <path d="M6.5 3v6a2 2 0 002 2 2 2 0 002-2V3" />
      <path d="M8.5 11v10" />
      <path d="M16.5 3c-1.4 1.4-2 3.8-2 6.2 0 1.5 1 2.6 2 2.6m0 0V21" />
    </>
  ),
  clinic: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V6.2L13 3v18" />
      <path d="M13 21V9.2L19 11.4V21" />
      <path d="M4 21h16" />
      <path d="M8.4 8.5h0M8.4 11.5h0M8.4 14.5h0" />
    </>
  ),
  tech: (
    <>
      <path d="M8.5 8L4.5 12l4 4" />
      <path d="M15.5 8l4 4-4 4" />
      <path d="M13.4 5.5l-2.8 13" />
    </>
  ),
  retail: (
    <>
      <path d="M6 8h12l-1 12.3a1 1 0 01-1 .9H8a1 1 0 01-1-.9z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </>
  ),
  luxury: (
    <>
      <path d="M5 9l3-4.5h8L19 9l-7 10.5z" />
      <path d="M5 9h14" />
      <path d="M9.6 4.5L8 9l4 10.5M14.4 4.5L16 9l-4 10.5" />
    </>
  ),
  startup: (
    <>
      <path d="M9.5 18.5h5M10.5 21.5h3" />
      <path d="M12 2.5a6 6 0 00-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0012 2.5z" />
    </>
  ),
  services: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.4v2.4M12 18.2v2.4M3.4 12h2.4M18.2 12h2.4M6 6l1.7 1.7M16.3 16.3L18 18M18 6l-1.7 1.7M7.7 16.3L6 18" />
    </>
  ),
  // ---- UI ----
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrow: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  "chevron-down": <path d="M6 9.5l6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h11M4 17h16" />,
  mail: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.2l1.6 4.4-2.2 1.3a11.5 11.5 0 005.4 5.4l1.3-2.2L18.7 16V19a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
  ),
  spark: <path d="M12 2l1.9 6.5L20.5 12l-6.6 1.9L12 22l-1.9-6.1L3.5 12l6.6-1.9z" />,
  whatsapp: (
    <path d="M19.05 4.91A9.82 9.82 0 0012.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.78 1.22h.01c5.46 0 9.9-4.45 9.91-9.91A9.84 9.84 0 0019.05 4.9zm-7.01 15.24h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 015.82 2.42 8.18 8.18 0 012.41 5.82c-.01 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: string;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const filled = FILLED.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
