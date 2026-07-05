'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Impact counter — animates from 0 → `target` over 1.6s using an
 * ease-out cubic curve, matching legacy/main.js.
 */
export function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        const t0 = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <>
      <span ref={ref} data-count={target}>
        {val}
      </span>
      {suffix ? <span className="suf">{suffix}</span> : null}
    </>
  );
}
