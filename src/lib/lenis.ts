import type Lenis from 'lenis';

let instance: Lenis | null = null;

/** Called once by SmoothScroll. */
export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/**
 * Access the running Lenis instance.
 *
 * Needed because `document.body.style.overflow = 'hidden'` does NOT lock the
 * page when Lenis is active: Lenis intercepts wheel and touch events and
 * scrolls programmatically, so it never consults the body's overflow. Any
 * modal, drawer or fullscreen preview has to call `lenis.stop()` instead, or
 * the page keeps moving underneath it.
 */
export const getLenis = () => instance;

/** Lock the page. Safe to call when Lenis is disabled (reduced motion). */
export const lockScroll = () => {
  const l = getLenis();
  if (l) l.stop();
  else document.body.style.overflow = 'hidden'; // fallback path
};

/** Release the page. */
export const unlockScroll = () => {
  const l = getLenis();
  if (l) l.start();
  else document.body.style.overflow = '';
};