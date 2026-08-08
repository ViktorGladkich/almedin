'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  meta?: { label: string; value: string }[];
}

interface ScrollCarousel3DProps {
  items: CarouselItem[];
  /**
   * Element to pin while the ring turns — normally the section wrapper.
   * The pin is created HERE, by the same ScrollTrigger that drives the
   * rotation. Pinning from the parent with a second, separate trigger is what
   * broke this before: a pinned element stops moving relative to the viewport,
   * so any trigger attached to something inside it never advances.
   */
  pinTarget?: React.RefObject<HTMLElement | null>;
  /** Scroll distance the pin lasts, in px. Split across all cards. */
  pinDistance?: number;
  /** Snap so every card comes to rest facing the viewer. */
  snap?: boolean;
  /** Degrees turned across the scroll range. */
  rotation?: number;
  /**
   * Resting angle of the ring, in fractions of one card step.
   * 0 = one card dead centre. ~0.3 shows a dominant card plus a readable
   * second one, which reads far better than a single flat-on card.
   */
  restOffset?: number;
  /** Fraction of the stage the rig is allowed to occupy. */
  fit?: number;
  className?: string;
}

const PERSPECTIVE = 1400;
const ASPECT = 0.7; // card width / height

/**
 * 3D ring carousel driven by scroll.
 *
 * TWO THINGS THAT KEEP BREAKING THIS COMPONENT, both the same rule:
 *
 * 1. `overflow` other than `visible` forces `transform-style` to compute to
 *    `flat`. That was the original bug — clipping on the card node collapsed
 *    the 3D context and backfaces started showing mirrored front content.
 * 2. `filter` does exactly the same thing. Adding
 *    `filter: drop-shadow(...)` to the preserve-3d node re-introduced the
 *    identical bug through a different door.
 *
 * So the preserve-3d nodes here carry NO overflow and NO filter. Depth
 * shadowing is done with `box-shadow` on each face, which does not create a
 * containing block and leaves the 3D context intact.
 *
 * SIZING: card dimensions are derived from the measured stage instead of being
 * fixed at 280×400. A card at z = +radius is magnified by
 * `PERSPECTIVE / (PERSPECTIVE - radius)` — about 1.26 at radius 285 — so a
 * 400px card projects to ~500px and overflows any stage shorter than that.
 * The fit below solves for the projected size, not the CSS size.
 */
export function ScrollCarousel3D({
  items,
  pinTarget,
  pinDistance = 1500,
  snap = true,
  rotation = 360,
  restOffset = 0.3,
  fit = 0.94,
  className = '',
}: ScrollCarousel3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 280, h: 400, r: 320 });

  const n = items.length;

  const measure = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene || n === 0) return;

    const stageW = scene.clientWidth;
    const stageH = scene.clientHeight;
    if (!stageW || !stageH) return;

    // Start from the stage height, then walk the projection back.
    let h = stageH * fit;
    let w = h * ASPECT;

    // Minimum radius that keeps adjacent card planes from intersecting,
    // plus breathing room so the ring reads as a ring.
    let r = (w / 2 / Math.tan(Math.PI / Math.max(n, 3))) * 1.35;

    // Horizontal extent of the rig is roughly the ring diameter.
    const maxR = (stageW * fit) / 2;
    if (r > maxR) {
      const k = maxR / r;
      r = maxR;
      w *= k;
      h *= k;
    }

    // Undo the perspective magnification of the front card.
    const gain = PERSPECTIVE / (PERSPECTIVE - r);
    h /= gain;
    w /= gain;

    // Only commit when something actually changed. Every setDim re-runs the
    // effect, and with revertOnUpdate that kills and rebuilds the pinned
    // ScrollTrigger — which removes and re-inserts the pin spacer, changing
    // document height and invalidating every trigger below this section.
    setDim((prev) => {
      const next = { w: Math.round(w), h: Math.round(h), r: Math.round(r) };
      if (prev.w === next.w && prev.h === next.h && prev.r === next.r) return prev;
      return next;
    });
  }, [n, fit]);

  useLayoutEffect(() => {
    measure();
    const scene = sceneRef.current;
    if (!scene) return;
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    return () => ro.disconnect();
  }, [measure]);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      const ring = ringRef.current;
      if (!scene || !ring) return;

      const cells = Array.from(ring.children) as HTMLElement[];
      if (!cells.length) return;

      const step = 360 / cells.length;
      const rest = -step * restOffset;

      cells.forEach((cell, i) => {
        gsap.set(cell, {
          rotateY: i * step,
          z: dim.r,
          transformOrigin: `50% 50% ${-dim.r}px`,
        });
      });

      if (prefersReducedMotion()) {
        gsap.set(ring, { rotationY: rest, rotationX: 4 });
        return;
      }

      gsap.set(ring, { rotationY: rest });

      const pinned = pinTarget?.current ?? null;
      const n = cells.length;

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: pinned
            ? {
                // ONE trigger does both jobs. The pin and the rotation share a
                // range, so the ring cannot stall while the section is held.
                trigger: pinned,
                start: 'top top',
                end: `+=${pinDistance}`,
                scrub: 1,
                pin: pinned,
                // Spacing is reserved by the section itself (see below), so
                // ScrollTrigger must not insert its own. Its spacer is created
                // several frames after mount — once the stage has been measured
                // — which means the whole document below jumps down mid-scroll.
                // That was a CLS of 1.00. A spacer that is part of the initial
                // render costs nothing, because nothing has to move for it.
                pinSpacing: false,
                anticipatePin: 1,
                // Pinning inserts a spacer and changes total document height.
                // Any trigger below this one computes its start/end against
                // that height, so this trigger has to refresh first — otherwise
                // sections further down keep stale positions until the next
                // resize.
                refreshPriority: 1,
                // Each card comes to rest facing front instead of drifting past.
                // Without this the user has to stop scrolling at exactly the
                // right pixel to read one.
                snap: snap
                  ? { snapTo: 1 / n, duration: 0.35, delay: 0.05, ease: 'power2.inOut' }
                  : undefined,
              }
            : {
                trigger: scene,
                start: 'top 75%',
                end: 'bottom top',
                scrub: 1,
              },
        })
        .fromTo(ring, { rotationY: rest }, { rotationY: rest - rotation }, 0)
        .fromTo(ring, { rotationX: 5 }, { rotationX: -5 }, 0);

      // The pin spacer has just been inserted (or re-inserted), so the document
      // is taller than it was when every trigger below this section computed
      // its start/end. Without this they keep firing at the old scroll
      // positions — which is exactly what "the next section scrolls wrong"
      // looks like. Deferred a frame so the spacer is measured, not predicted.
      if (pinned) {
        const id = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(id);
      }
    },
    {
      scope: sceneRef,
      dependencies: [dim.r, dim.w, dim.h, rotation, restOffset, n, pinDistance, snap],
      // MUST be true. `dim` changes once the stage is measured, and useGSAP
      // does NOT revert on dependency change by default — the old timeline and
      // its ScrollTrigger would survive and a second set would be layered on
      // top, both writing to the same transform every frame.
      revertOnUpdate: true,
    }
  );

  // Entrance lives in its own effect so it plays exactly once, no matter how
  // many times the stage is re-measured.
  useGSAP(
    () => {
      const scene = sceneRef.current;
      const ring = ringRef.current;
      if (!scene || !ring || prefersReducedMotion()) return;

      // Scroll-triggered, NOT a bare `delay`. A delay fires relative to mount,
      // so in any section below the fold the entrance plays while the user is
      // still looking at the hero — and by the time they arrive everything is
      // already in place, with nothing left to watch.
      //
      // Only `y` — never `opacity`, and never on the cells. `opacity` below 1
      // is a grouping property: like `overflow` and `filter`, it forces
      // `transform-style` to compute to `flat`. Fading the 3D cells collapses
      // the ring's depth mid-tween and mirrored backfaces show through.
      gsap.from(ring, {
        y: 30,
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: scene, start: 'top 82%', once: true },
      });
    },
    { scope: sceneRef }
  );

  return (
    <div
      ref={sceneRef}
      className={`relative w-full h-full ${className}`}
      style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: '50% 48%' }}
    >
      <div
        ref={ringRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: dim.w,
          height: dim.h,
          marginLeft: -dim.w / 2,
          marginTop: -dim.h / 2,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {items.map((item, index) => (
          <Card key={item.id} item={item} index={index} height={dim.h} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const PALETTES = [
  { bg: '#FF3131', ink: '#FFFFFF', hair: 'rgba(255,255,255,0.34)', ghost: 'rgba(255,255,255,0.30)', logoColor: '#FFFFFF' },
  { bg: '#0D0D0D', ink: '#F2F0EC', hair: 'rgba(242,240,236,0.20)', ghost: 'rgba(242,240,236,0.20)', logoColor: '#FF3131' },
  { bg: '#E6E4DD', ink: '#0D0D0D', hair: 'rgba(13,13,13,0.14)', ghost: 'rgba(13,13,13,0.20)', logoColor: '#0D0D0D' },
  { bg: '#3A3A38', ink: '#F2F0EC', hair: 'rgba(242,240,236,0.20)', ghost: 'rgba(242,240,236,0.20)', logoColor: '#F2F0EC' },
];

const CLIPS = [
  'circle(50% at 50% 50%)',
  'polygon(50% 0%, 100% 26%, 100% 74%, 50% 100%, 0% 74%, 0% 26%)',
  'polygon(0% 0%, 100% 0%, 100% 78%, 50% 100%, 0% 78%)',
  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
];

function Card({
  item,
  index,
  height,
}: {
  item: CarouselItem;
  index: number;
  height: number;
}) {
  const p = PALETTES[index % PALETTES.length];
  const clip = CLIPS[index % CLIPS.length];

  // Type and padding scale with the card so the layout holds at any stage size.
  const u = height / 400;
  const px = (v: number) => `${Math.round(v * u)}px`;

  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* No overflow, no filter — this node IS the 3D context. */}
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        <Face palette={p} pad={px(24)}>
          <div className="flex justify-between items-start gap-3">
            <h3
              className="font-medium leading-[1.15] tracking-tight m-0"
              style={{ fontSize: px(17), maxWidth: px(150) }}
            >
              {item.title}
            </h3>
            <div
              className="shrink-0"
              style={{
                width: px(28),
                height: px(28),
                backgroundColor: p.logoColor || p.ink,
                WebkitMask: "url('/logo.png') no-repeat center / contain",
                mask: "url('/logo.png') no-repeat center / contain",
              }}
              aria-hidden
            />
          </div>

          <div className="flex-1 grid place-items-center" style={{ padding: `${px(14)} 0` }}>
            <div
              className="relative"
              style={{ width: px(164), height: px(164), clipPath: clip }}
            >
              <Image src={item.image} alt={item.title} fill sizes="220px" className="object-cover" />
            </div>
          </div>

          <p className="leading-[1.45] opacity-70 m-0" style={{ fontSize: px(11) }}>
            {item.description}
          </p>
        </Face>

        <Face palette={p} pad={px(24)} rotated>
          <div className="flex justify-between items-start">
            <span
              className="font-mono uppercase tracking-[0.28em]"
              style={{ fontSize: px(10), color: p.ghost }}
            >
              Rückseite
            </span>
            <div
              className="shrink-0"
              style={{
                width: px(28),
                height: px(28),
                backgroundColor: p.logoColor || p.ink,
                WebkitMask: "url('/logo.png') no-repeat center / contain",
                mask: "url('/logo.png') no-repeat center / contain",
              }}
              aria-hidden
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {(
              item.meta ?? [
                { label: 'Leistung', value: item.title },
                { label: 'Region', value: 'Dresden / Sachsen' },
              ]
            ).map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-baseline gap-3"
                style={{ padding: `${px(10)} 0`, borderTop: `1px solid ${p.hair}` }}
              >
                <span
                  className="font-mono uppercase tracking-[0.2em] opacity-60"
                  style={{ fontSize: px(9) }}
                >
                  {row.label}
                </span>
                <span className="text-right leading-snug" style={{ fontSize: px(12) }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <span
            className="font-mono uppercase tracking-[0.24em] opacity-50"
            style={{ fontSize: px(9) }}
          >
            Almedin Bau
          </span>
        </Face>
      </div>
    </div>
  );
}

function Face({
  palette,
  children,
  pad,
  rotated = false,
}: {
  palette: (typeof PALETTES)[number];
  children: React.ReactNode;
  pad: string;
  rotated?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col rounded-none overflow-hidden"
      style={{
        padding: pad,
        background: palette.bg,
        color: palette.ink,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: rotated ? 'rotateY(180deg)' : undefined,
        // box-shadow, NOT filter: drop-shadow. A filter would flatten the
        // parent's 3D context and the mirrored-backface bug comes straight back.
        boxShadow: '0 30px 60px -20px rgba(13,13,13,0.45)',
      }}
    >
      <div
        className="absolute rounded-none pointer-events-none"
        style={{ inset: '12px', border: `1px solid ${palette.hair}` }}
      />
      <div className="absolute pointer-events-none z-20" style={{ inset: '12px', color: palette.ghost }}>
        {(
          ['-top-[6px] -left-[6px]', '-top-[6px] -right-[6px]', '-bottom-[6px] -left-[6px]', '-bottom-[6px] -right-[6px]'] as const
        ).map((pos) => (
          <svg
            key={pos}
            className={`absolute ${pos}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        ))}
      </div>
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}