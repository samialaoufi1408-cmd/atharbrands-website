'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  MouseEvent,
} from 'react';

interface Ctx {
  isOpen: boolean;
  src: string | null;
  alt: string | null;
  open: (src: string, alt?: string) => void;
  close: () => void;
}

const LightboxCtx = createContext<Ctx | null>(null);

/**
 * Provider must wrap any subtree that uses <LightboxTrigger>. The <LightboxRoot>
 * renders the actual overlay and must be present in the tree exactly once.
 *
 * Behavior mirrors legacy/main.js exactly:
 *  - open()  → classList.add('open'), aria-hidden=false, body scroll locked
 *  - close() → classList.remove('open') + aria-hidden=true + body scroll restored
 *              are all synchronous; the image src is cleared on a 300ms delay
 *              so the fade-out animation has an image to fade.
 */
export function LightboxProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((s: string, a?: string) => {
    if (clearTimer.current) {
      clearTimeout(clearTimer.current);
      clearTimer.current = null;
    }
    setSrc(s);
    setAlt(a ?? null);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    clearTimer.current = setTimeout(() => {
      setSrc(null);
      setAlt(null);
      clearTimer.current = null;
    }, 300);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, []);

  return (
    <LightboxCtx.Provider value={{ isOpen, src, alt, open, close }}>{children}</LightboxCtx.Provider>
  );
}

function useLightbox(): Ctx {
  const c = useContext(LightboxCtx);
  if (!c) throw new Error('LightboxTrigger/Root must be inside <LightboxProvider>');
  return c;
}

export function LightboxTrigger({
  src,
  alt,
  children,
  className,
}: PropsWithChildren<{ src: string; alt?: string; className?: string }>) {
  const { open } = useLightbox();
  return (
    <div
      data-lightbox={src}
      onClick={() => open(src, alt)}
      className={className}
      style={{ cursor: 'zoom-in' }}
    >
      {children}
    </div>
  );
}

export function LightboxRoot() {
  const { isOpen, src, alt, close } = useLightbox();

  const onImgClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`lightbox ${isOpen ? 'open' : ''}`}
      id="lightbox"
      aria-hidden={isOpen ? 'false' : 'true'}
      onClick={close}
    >
      <button className="lightbox-close" aria-label="Close" onClick={close}>
        ✕
      </button>
      <div className="lightbox-inner">
        <img
          id="lightbox-img"
          alt={alt ?? 'Full size artwork'}
          onClick={onImgClick}
          {...(src ? { src } : {})}
        />
      </div>
      <span className="lightbox-hint">Click anywhere to close · اضغط للإغلاق</span>
    </div>
  );
}
