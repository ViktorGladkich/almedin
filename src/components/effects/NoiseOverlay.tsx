/**
 * Film grain overlay.
 *
 * Stateless and server-renderable: no hooks, no canvas, no `typeof window`
 * branch — those are what caused the hydration mismatch. All styling lives in
 * `.noise-overlay` in globals.css, including the reduced-motion override.
 *
 * Mount once in layout.tsx.
 */
export function NoiseOverlay() {
  return <div aria-hidden className="noise-overlay" />;
}