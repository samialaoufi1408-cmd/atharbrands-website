/**
 * Small process icons — Listen / Distill / Craft / Endure.
 * Paths lifted from legacy/main.js `icons` map (lines 80–85).
 */
import * as React from 'react';

export type ProcessName = 'listen' | 'distill' | 'craft' | 'endure';

interface IconProps {
  name: ProcessName;
  className?: string;
}

export function ProcessIcon({ name, className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF7A" strokeWidth="1.2" className={className}>
      {name === 'listen' && (
        <>
          <circle cx="24" cy="24" r="4" />
          <path d="M24 14a10 10 0 0 1 0 20" opacity=".8" />
          <path d="M24 8a16 16 0 0 1 0 32" opacity=".5" />
          <path d="M24 14a10 10 0 0 0 0 20" opacity=".8" />
          <path d="M24 8a16 16 0 0 0 0 32" opacity=".5" />
        </>
      )}
      {name === 'distill' && (
        <>
          <path d="M14 10h20l-7 12v9l-6 4v-13z" />
          <circle cx="24" cy="40" r="2.4" fill="#D4AF7A" stroke="none" />
        </>
      )}
      {name === 'craft' && (
        <>
          <path d="M24 6l3 15 15 3-15 3-3 15-3-15-15-3 15-3z" />
          <circle cx="24" cy="24" r="3" />
        </>
      )}
      {name === 'endure' && (
        <>
          <circle cx="24" cy="24" r="9" />
          <path d="M24 6v9M24 33v9" opacity=".8" />
          <circle cx="9" cy="24" r="1.8" fill="#D4AF7A" stroke="none" />
          <circle cx="39" cy="24" r="1.8" fill="#D4AF7A" stroke="none" />
        </>
      )}
    </svg>
  );
}
