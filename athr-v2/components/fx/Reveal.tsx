'use client';
import { useEffect, useRef, ElementType, PropsWithChildren, HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: ElementType;
}

/**
 * Adds `visible` (and `in`, matching the legacy stylesheet alias) once the
 * element enters the viewport. Honors `prefers-reduced-motion` by
 * marking as visible immediately.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible', 'in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible', 'in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as any}
      className={`reveal ${className}`}
      data-d={delay || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
