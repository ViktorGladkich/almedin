'use client';

import { useRef, ReactNode } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

interface RisingPanelProps {
  children: ReactNode;
  /** How far the panel overlaps the section above, in vh. */
  overlap?: number;
  /** Corner radius at the top while rising. Flattens to 0 once locked. */
  radius?: number;
  className?: string;
}

/**
 * Makes the wrapped section slide up OVER the section above it.
 *
 * Why it is built this way rather than the usual `position: sticky` trick:
 * the Projects section is full of `sticky top-0` cards and contains a
 * `fixed inset-0` preview overlay. Putting a transform, an opacity or a
 * sticky on its wrapper would break both — a transformed ancestor becomes the
 * containing block for `position: fixed`, so the fullscreen preview would be
 * trapped inside the section instead of covering the viewport.
 *
 * So nothing is applied to the section above at all. This panel simply sits on
 * a higher stacking layer, overlaps upward with a negative margin, and carries
 * its own dimming veil that covers whatever is behind it. The illusion is
 * identical and the section above stays untouched.
 */
export function RisingPanel({
  children,
  overlap = 10,
  radius = 36,
  className = '',
}: RisingPanelProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom', // panel's top edge enters the viewport
          end: 'top top', // panel's top edge reaches the viewport top
          scrub: 1,
        },
      });

      // Veil darkens the outgoing section as the panel climbs over it.
      tl.fromTo('.rp-veil', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)

        // Corners flatten as the panel locks into place. This is the detail
        // that sells it as a solid sheet arriving rather than a card floating.
        .fromTo(
          '.rp-surface',
          { borderTopLeftRadius: radius, borderTopRightRadius: radius },
          { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none' },
          0
        )

        // Contents lag slightly behind the panel edge — the parallax that makes
        // the sheet feel like it has thickness.
        .fromTo('.rp-content', { yPercent: 6 }, { yPercent: 0, ease: 'none' }, 0);
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={`relative z-20 ${className}`}
      style={{ marginTop: `-${overlap}vh` }}
    >
      {/*
        The veil lives INSIDE this panel's stacking context but is positioned
        above it, so it darkens the section behind without that section needing
        any class, ref or style of its own.
      */}
      <div
        className="rp-veil pointer-events-none absolute inset-x-0 bottom-full h-[70vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(13,13,13,0.55), rgba(13,13,13,0.18) 45%, transparent)',
        }}
        aria-hidden
      />

      <div
        className="rp-surface relative overflow-hidden"
        style={{
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          boxShadow: '0 -50px 90px -30px rgba(13,13,13,0.55)',
        }}
      >
        <div className="rp-content will-change-transform">{children}</div>
      </div>
    </div>
  );
}
