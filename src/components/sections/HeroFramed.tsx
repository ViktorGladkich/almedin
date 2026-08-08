'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroFramedProps {
  videoSrc?: string;
  webmSrc?: string;
  posterSrc?: string;
}

const LINES = ['Wir bauen Werte', 'für Generationen.'];

/**
 * Framed hero.
 *
 * `p-frame` and the height calc both read `--frame`, the same variable
 * PageFrame paints with. With a smaller padding the fixed frame overlay covers
 * the card's outer edge and clips its rounded corners; with a larger one a
 * strip of background shows through. Never hardcode 30px here.
 *
 * ENTRANCE AND SCROLL LIVE ON DIFFERENT ELEMENTS.
 * `.hf-zoom` is the entrance (scale 1.08 → 1), `.hf-parallax` is the scroll
 * (scale 1 → 1.1). They used to be the same node, and a scrubbed tween records
 * its start value when it is created — which was 1.08, mid-entrance. The first
 * wheel event then snapped the element to that recorded value while the
 * entrance was still running toward 1. That fight is the jerk and the sudden
 * zoom; nesting removes it instead of trying to time around it.
 */
export function HeroFramed({
  videoSrc = '/video/hero-rohbau.mp4',
  webmSrc = '/video/hero-rohbau.webm',
  posterSrc = '/images/almedin-hero-poster.jpg',
}: HeroFramedProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(['.hf-card', '.hf-zoom', '.hf-line', '.hf-info'], {
          clipPath: 'none',
          opacity: 1,
          yPercent: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
        .fromTo(
          '.hf-card',
          { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1.5,
            clearProps: 'clipPath',
          }
        )
        .fromTo('.hf-zoom', { scale: 1.08 }, { scale: 1, duration: 1.7 }, 0)
        .fromTo('.hf-line', { yPercent: 112 }, { yPercent: 0, duration: 1.2, stagger: 0.09 }, 0.4)
        .fromTo('.hf-info', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.09 }, 0.6);

      const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 } as const;

      // immediateRender:false means the start value is read on the first actual
      // render rather than at creation. Belt and braces alongside the split —
      // it also keeps the parallax honest if the tween is ever rebuilt.
      gsap.fromTo(
        '.hf-parallax',
        { scale: 1, yPercent: 0 },
        { scale: 1.1, yPercent: 5, ease: 'none', immediateRender: false, scrollTrigger: st }
      );

      gsap.fromTo(
        '.hf-overlay',
        { yPercent: 0, opacity: 1 },
        { yPercent: -18, opacity: 0.25, ease: 'none', immediateRender: false, scrollTrigger: st }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} data-theme="light" className="relative w-full p-frame">
      <div className="hf-card relative w-full overflow-hidden rounded-[14px] md:rounded-[20px] border border-page-hair bg-page-surface h-[calc(100svh-var(--frame)*2)] min-h-[min(480px,calc(100svh-var(--frame)*2))]">
        {/* Outer layer: scroll only */}
        <div className="hf-parallax absolute inset-0 will-change-transform">
          {/* Inner layer: entrance only */}
          <div className="hf-zoom absolute inset-0 will-change-transform">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            >
              {/* WebM first — Chrome and Firefox take it, Safari falls through. */}
              <source src={webmSrc} type="video/webm" />
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scrim. Vertical on mobile where the copy stacks, diagonal on desktop
            where it sits bottom-left and bottom-right. */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#0D0D0D]/95 via-[#0D0D0D]/50 to-black/20 md:bg-gradient-to-tl md:from-[#0D0D0D]/85 md:via-[#0D0D0D]/35 md:to-transparent" />

        <div className="hf-overlay absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-7 md:p-10 lg:p-14 will-change-transform">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-12">
            <h1 className="m-0 font-sans font-medium uppercase text-[#F2F0EC] leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,5.6vw,6rem)]">
              {LINES.map((line) => (
                // pt/-mt clears ascenders, pb/-mb clears descenders. Without the
                // negative margins the mask padding becomes real leading and the
                // two lines drift apart.
                <span
                  key={line}
                  className="block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.12em] -mb-[0.12em]"
                >
                  <span className="hf-line block will-change-transform">{line}</span>
                </span>
              ))}
            </h1>

            <div className="flex flex-col gap-4 lg:max-w-[clamp(320px,26vw,460px)] shrink-0">
              <p className="hf-info m-0 font-light leading-[1.55] text-[#F2F0EC]/90 text-[clamp(13px,1.05vw,17px)]">
                Wir realisieren hochwertige Neubauten, Sanierungen und Bauprojekte
                in Dresden und Sachsen — präzise geplant, transparent umgesetzt und
                mit höchstem Qualitätsanspruch vollendet.
              </p>
              <div className="hf-info flex items-center">
                <CTAButton text="Beratung anfragen" href="/contact" variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}