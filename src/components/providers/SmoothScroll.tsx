'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { setLenis } from '@/lib/lenis';

/**
 * Wrap the app once in app/layout.tsx:
 *   <SmoothScroll />{children}
 *
 * Do NOT also set `scroll-behavior: smooth` in CSS — the two fight each other.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      syncTouch: false, // true kills native iOS momentum
      touchMultiplier: 1.6,
    });

    // Exposed so modals and previews can lock the page properly.
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}