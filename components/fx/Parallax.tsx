'use client';
import { useEffect, useRef, PropsWithChildren } from 'react';

interface ParallaxProps {
  factor: number;
  className?: string;
}

/**
 * Vertical scroll-driven translate. Disabled when the user prefers reduced motion.
 * Matches legacy hero's 0.12 (seal) and 0.06 (glow) factors.
 */
export function Parallax({ factor, className, children }: PropsWithChildren<ParallaxProps>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translateY(${(window.scrollY * factor).toFixed(1)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
