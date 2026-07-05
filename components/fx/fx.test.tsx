import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Counter } from './Counter';
import { LightboxProvider, LightboxTrigger, LightboxRoot } from './Lightbox';
import { Reveal } from './Reveal';

beforeEach(() => {
  (globalThis as any).__IO.instances.length = 0;
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

function fireIO(el?: Element) {
  const io = (globalThis as any).__IO.instances[0];
  const targets = el ? [el] : io.targets;
  io.cb(
    targets.map((t: Element) => ({ target: t, isIntersecting: true, intersectionRatio: 1 })),
    io,
  );
}

describe('Counter', () => {
  it('animates from 0 to target when observed', async () => {
    vi.useFakeTimers();
    const now = { t: 0 };
    vi.spyOn(performance, 'now').mockImplementation(() => now.t);
    const rafs: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
      rafs.push(fn);
      return rafs.length;
    });

    const { container } = render(<Counter target={90} suffix="+" />);
    expect(container.textContent).toContain('0');

    act(() => {
      fireIO(container.querySelector('[data-count]')!);
    });

    // Drive rAF forward through the 1600ms cubic ease
    for (let step = 0; step <= 1700; step += 16) {
      now.t = step;
      const pending = rafs.splice(0);
      act(() => {
        pending.forEach((fn) => fn(step));
      });
    }

    expect(container.textContent).toBe('90+');
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
});

describe('Lightbox', () => {
  const App = () => (
    <LightboxProvider>
      <LightboxTrigger src="/aura-featured.png">
        <button>open</button>
      </LightboxTrigger>
      <LightboxRoot />
    </LightboxProvider>
  );

  it('opens, locks body scroll, ignores image click, Escape closes and unlocks', () => {
    const { getByText, baseElement } = render(<App />);
    fireEvent.click(getByText('open'));

    const lb = baseElement.querySelector('#lightbox')!;
    expect(lb.getAttribute('aria-hidden')).toBe('false');
    expect(lb.classList.contains('open')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    const img = baseElement.querySelector('#lightbox-img')!;
    fireEvent.click(img);
    expect(lb.getAttribute('aria-hidden')).toBe('false');
    expect(lb.classList.contains('open')).toBe(true);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('');
    // The `open` class + aria-hidden clear immediately; src clears on 300ms delay
    expect(lb.classList.contains('open')).toBe(false);
    expect(lb.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('Reveal', () => {
  it('adds `visible` and `in` when the element intersects', () => {
    const { container } = render(<Reveal delay={2}>hi</Reveal>);
    const el = container.querySelector('.reveal')!;
    expect(el.classList.contains('visible')).toBe(false);
    act(() => fireIO(el));
    expect(el.classList.contains('visible')).toBe(true);
    expect(el.classList.contains('in')).toBe(true);
    expect(el.getAttribute('data-d')).toBe('2');
  });
});
