'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ImageMaskFilterProps {
  src: string;
  id: string;
  /** Accessible description. Falls back to decorative if omitted. */
  alt?: string;
  className?: string;
  /**
   * Turbulence displacement on the mask edge. Genuinely expensive —
   * see the note below before switching it on for long lists.
   */
  grain?: boolean;
  /** Final mask radius in viewBox units. 780 covers a 1.5:1 crop with margin. */
  radius?: number;
}

/**
 * Circular mask reveal with a noisy edge.
 *
 * PERFORMANCE NOTE — read before reusing this in a long list.
 * feTurbulence + feDisplacementMap are computed on the CPU in most browsers.
 * Because the masked circle's geometry changes on every scrubbed frame, the
 * filter cannot be cached: it is fully recomputed each frame, over the whole
 * filter region. Three instances on one screen is already a meaningful cost;
 * a dozen will drop frames on mid-range hardware. `grain={false}` gives a
 * clean-edged reveal at a fraction of the price.
 *
 * Fixes over the previous version:
 * - `numOctaves` 3 → 2 and displacement scale 150 → 70. Three octaves of noise
 *   is detail nobody can resolve while the mask is expanding at scroll speed;
 *   it is paid for and thrown away.
 * - Explicit filter region. The default is bbox -10%/120%, so displaced pixels
 *   were being clipped to a straight rectangle — the ragged edge the filter
 *   exists to create was getting sliced off square at the sides.
 * - The Tailwind `transition-transform` class is gone. It was fighting GSAP
 *   for the same transform: GSAP writes a value every frame, the CSS
 *   transition then eases toward it, and the result lags and stutters.
 * - `filter: brightness()` is no longer scrubbed. Animating a CSS filter forces
 *   a repaint per frame, and 100% → 110% is invisible next to the mask reveal.
 * - One ScrollTrigger instead of two identical ones.
 * - Reduced motion (and any case where the trigger never fires) now leaves the
 *   image fully revealed instead of invisible at r=0.
 */
export function ImageMaskFilter({
  src,
  id,
  alt,
  className,
  grain = true,
  radius = 780,
}: ImageMaskFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const maskId = `mask-${id}`;
  const filterId = `disp-${id}`;

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const circle = root.querySelector<SVGCircleElement>('.mask-circle');
      const image = root.querySelector<SVGImageElement>('.svg-img');
      if (!circle || !image) return;

      if (prefersReducedMotion()) {
        gsap.set(circle, { attr: { r: radius } });
        gsap.set(image, { scale: 1 });
        return;
      }

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            end: 'center 62%',
            scrub: 0.5,
          },
        })
        .fromTo(circle, { attr: { r: 0 } }, { attr: { r: radius } }, 0)
        .fromTo(
          image,
          { scale: 1.08, transformOrigin: '50% 50%' },
          { scale: 1, transformOrigin: '50% 50%' },
          0
        );
    },
    { scope: containerRef, dependencies: [radius] }
  );

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden w-full h-full', className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        role={alt ? 'img' : 'presentation'}
        aria-label={alt}
      >
        <defs>
          {grain && (
            <filter
              id={filterId}
              // Explicit region. Without this the displaced edge is clipped to
              // the default bbox and the noise ends in a straight line.
              x="-35%"
              y="-35%"
              width="170%"
              height="170%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed={id.length * 7}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="70"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          )}

          <mask id={maskId}>
            <circle
              className="mask-circle"
              cx="500"
              cy="500"
              r="0"
              fill="#fff"
              style={grain ? { filter: `url(#${filterId})` } : undefined}
            />
          </mask>
        </defs>

        <image
          className="svg-img"
          href={src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
          style={{ willChange: 'transform' }}
        />
      </svg>
    </div>
  );
}