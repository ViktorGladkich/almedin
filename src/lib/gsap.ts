import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register once, on the client only.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Global defaults so every tween inherits the brand feel.
  gsap.defaults({ ease: 'expo.out', duration: 0.9 });

  // ScrollTrigger must re-measure after webfonts swap in,
  // otherwise every start/end offset is computed against fallback metrics.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

/** True when the visitor asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, useGSAP };