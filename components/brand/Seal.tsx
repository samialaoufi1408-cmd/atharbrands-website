/**
 * The Seal of Impact — a procedural SVG mark.
 *
 * Ported line-for-line from legacy/main.js buildSeal(). Coordinates,
 * ray counts (96 outer / 72 inner), major-tick cadence, opacity, and stroke
 * weights are pixel-identical to the legacy site.
 *
 * `idSuffix` lets you render multiple seals on one page without gradient id
 * collisions (the SVG spec forbids duplicate ids inside a document).
 */
import * as React from 'react';

const CX = 120;
const CY = 150;

function pt(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [+(CX + r * Math.cos(a)).toFixed(1), +(CY + r * Math.sin(a)).toFixed(1)];
}

interface RaysProps {
  teeth: number;
  ri: number;
  ro: number;
  majorEvery: number;
  offset?: number;
  className: string;
  gradientId: string;
}

function Rays({ teeth, ri, ro, majorEvery, offset = 0, className, gradientId }: RaysProps) {
  const isInner = className.endsWith('-2');
  return (
    <g className={className}>
      {Array.from({ length: teeth }, (_, i) => {
        const a = (i * 360) / teeth + offset;
        const major = i % majorEvery === 0;
        const [x1, y1] = pt(ri, a);
        const [x2, y2] = pt(ro, a);
        const strokeWidth = major ? (isInner ? 1.1 : 1.2) : isInner ? 0.75 : 0.8;
        const opacity = major ? (isInner ? 0.9 : 0.95) : isInner ? 0.6 : 0.7;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
}

export interface SealProps {
  variant?: 'full' | 'mono';
  className?: string;
  /** Suffix appended to internal gradient id — unique per rendered seal. */
  idSuffix?: string;
  ariaLabel?: string;
}

let seq = 0;

export function Seal({ variant = 'full', className, idSuffix, ariaLabel = 'ATHR seal' }: SealProps) {
  const autoId = React.useId().replace(/[^a-z0-9]/gi, '') || String(++seq);
  const suffix = idSuffix ?? autoId;
  const gid = `sg-${suffix}`;
  const full = variant === 'full';
  return (
    <svg
      viewBox="0 0 240 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6C998" />
          <stop offset="0.5" stopColor="#D4AF7A" />
          <stop offset="1" stopColor="#B8945E" />
        </linearGradient>
      </defs>
      <g
        transform={full ? undefined : 'scale(0.86)'}
        style={{ transformOrigin: '120px 150px' }}
      >
        {full ? (
          <>
            <Rays teeth={96} ri={60} ro={86} majorEvery={8} className="seal-rays" gradientId={gid} />
            <Rays
              teeth={72}
              ri={38}
              ro={56}
              majorEvery={6}
              offset={180 / 72}
              className="seal-rays-2"
              gradientId={gid}
            />
          </>
        ) : null}
        <line x1="120" y1="52" x2="120" y2="248" stroke={`url(#${gid})`} strokeWidth="2.2" />
        <path d="M120 8 L127.5 32 L120 54 L112.5 32 Z" fill={`url(#${gid})`} />
        <path d="M120 292 L127.5 268 L120 246 L112.5 268 Z" fill={`url(#${gid})`} />
        <g className="seal-core">
          <circle cx="120" cy="150" r="31" fill="none" stroke={`url(#${gid})`} strokeWidth="8.5" />
          <circle
            cx="120"
            cy="150"
            r="31"
            fill="none"
            stroke="#0F1113"
            strokeWidth="2.2"
            opacity="0.5"
          />
          <rect x="116" y="115" width="8" height="5" fill="#0F1113" />
          <rect x="116" y="180" width="8" height="5" fill="#0F1113" />
        </g>
        <circle cx="24" cy="150" r="3.6" fill={`url(#${gid})`} />
        <circle cx="216" cy="150" r="3.6" fill={`url(#${gid})`} />
        <circle cx="40" cy="150" r="2" fill={`url(#${gid})`} opacity="0.7" />
        <circle cx="200" cy="150" r="2" fill={`url(#${gid})`} opacity="0.7" />
      </g>
    </svg>
  );
}
