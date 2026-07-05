import '@testing-library/jest-dom/vitest';

/** IntersectionObserver shim for jsdom. Tracks observed targets per instance
 *  so the contract can `fireIO()` to trigger callbacks explicitly. */
class IO {
  cb: IntersectionObserverCallback;
  targets: Element[] = [];
  static instances: IO[] = [];
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
    IO.instances.push(this);
  }
  observe(t: Element) {
    this.targets.push(t);
  }
  unobserve(t: Element) {
    this.targets = this.targets.filter((x) => x !== t);
  }
  disconnect() {
    this.targets = [];
  }
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds = [];
}

(globalThis as any).IntersectionObserver = IO;
(globalThis as any).__IO = IO;

if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
  if (!window.matchMedia) {
    (window as any).matchMedia = (q: string) => ({
      matches: false,
      media: q,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
}
