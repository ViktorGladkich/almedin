'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { RevealText } from '@/components/animations/RevealText';
import { ScrollCarousel3D, type CarouselItem } from '@/components/animations/ScrollCarousel3D';
import { CTAButton } from '@/components/ui/CTAButton';

const SERVICES: CarouselItem[] = [
  {
    id: 1,
    title: 'Allgemeiner Hochbau',
    description: 'Neubau von Wohn- und Geschäftsgebäuden mit höchstem Qualitätsanspruch.',
    image: '/images/hero_carousel_1.png',
    meta: [
      { label: 'Leistung', value: 'Neubau schlüsselfertig' },
      { label: 'Umfang', value: 'Rohbau bis Übergabe' },
    ],
  },
  {
    id: 2,
    title: 'Sanierung & Umbau',
    description: 'Fachgerechte Modernisierung und Revitalisierung von Bestandsgebäuden.',
    image: '/images/hero_carousel_2.png',
    meta: [
      { label: 'Leistung', value: 'Altbausanierung' },
      { label: 'Umfang', value: 'Fassade, Statik, Ausbau' },
    ],
  },
  {
    id: 3,
    title: 'Projektmanagement',
    description: 'Ganzheitliche Bauleitung, Planung und transparente Kommunikation.',
    image: '/images/hero_carousel_3.png',
    meta: [
      { label: 'Leistung', value: 'Bauleitung' },
      { label: 'Umfang', value: 'LPH 5–9 HOAI' },
    ],
  },
  {
    id: 4,
    title: 'Innenausbau',
    description: 'Trockenbau, Innenraumgestaltung und maßgeschneiderte Raumkonzepte.',
    image: '/images/hero_carousel_4.png',
    meta: [
      { label: 'Leistung', value: 'Trockenbau & Ausbau' },
    ],
  },
];

/** Scroll distance the section stays pinned. ~375px per card reads as one
 *  deliberate turn each; below ~300 the ring spins faster than it can be read. */
const PIN_DISTANCE = SERVICES.length * 375;

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      gsap.to('.sv-word', {
        yPercent: -6,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: `+=${PIN_DISTANCE}`,
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-theme="light"
      id="leistungen"
      className="relative min-h-svh flex flex-col pt-10 md:pt-14 pb-6 overflow-x-clip"
      style={{ paddingInline: 'var(--frame)' }}
    >
      <div
        className="relative w-full max-w-[1200px] mx-auto flex-1 flex flex-col border-x border-black/10"
      >
        {/* Vertical grid lines */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <span
            className="absolute top-0 bottom-0 left-[25%] w-px bg-black/10"
          />
          <span
            className="absolute top-0 bottom-0 left-[75%] w-px bg-black/10"
          />
        </div>

        {/* Eyebrow rail */}
        <div
          className="w-full relative z-10 border-t border-b border-black/10"
        >
          <div
            className="hidden md:flex flex-row justify-between items-center w-full uppercase tracking-[0.22em] text-[11px] py-4 px-6 relative text-[#4D4C49]"
          >
            <RevealText text="Von der Grundsteinlegung" immediate delay={0.25} />
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-black/15" />
              <RevealText text="BIS" className="font-medium" immediate delay={0.32} />
              <span className="w-12 h-px bg-black/15" />
            </div>
            <RevealText text="zur finalen Schlüsselübergabe" immediate delay={0.39} />

            <GridStarRow edge="top" />
          </div>

          <div
            className="flex md:hidden items-center justify-center text-center uppercase tracking-[0.14em] text-[10px] font-medium py-3.5 px-4 text-[#4D4C49]"
          >
            <RevealText text="Von der Grundsteinlegung bis zur Übergabe" immediate delay={0.25} />
          </div>
        </div>

        {/* Description */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-4 relative z-10 border-b border-black/10"
        >
          <div className="hidden md:flex col-span-1 items-center justify-center p-4">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-black/40"
            >
              Leistungen
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center py-4 px-5 md:px-6">
            <p
              className="text-center text-[13px] md:text-[15px] max-w-[600px] leading-relaxed m-0 text-black/70"
            >
              Unsere Kernkompetenzen im Überblick. Erfahren Sie, wie wir Ihr Bauprojekt
              mit höchstem Qualitätsanspruch, transparenter Planung und zuverlässiger
              Ausführung zum Erfolg führen — entdecken Sie unsere Leistungen beim Scrollen.
            </p>
          </div>

          <div className="hidden md:flex col-span-1 items-center justify-center p-4">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-black/40"
            >
              Kernkompetenzen
            </span>
          </div>

          <GridStarRow edge="bottom" />
        </div>

        {/* Wordmark + ring */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-3 md:px-6 z-10">
          <h2
            className="sv-word absolute inset-x-0 top-[3%] text-center font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] m-0 pointer-events-none text-[#0D0D0D]"
            style={{
              fontSize: 'clamp(2.2rem, 7.5vw, 5.2rem)',
              textWrap: 'balance',
            }}
          >
            <RevealText text="BAUKUNST" split="char" immediate delay={0.45} as="span" />
          </h2>

          <div className="relative z-10 w-full h-[clamp(300px,48vw,470px)] mt-[6%]">
            <ScrollCarousel3D
              items={SERVICES}
              pinTarget={root}
              pinDistance={PIN_DISTANCE}
              snap
              rotation={360}
              restOffset={0.3}
              fit={0.9}
            />
          </div>
        </div>

        {/* Bottom rule */}
        <div className="w-full relative z-10 border-b border-black/10">
          <GridStarRow edge="top" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto mt-6 flex justify-center md:hidden">
        <CTAButton text="Kostenlose Beratung" href="/contact" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function GridStarRow({ edge }: { edge: 'top' | 'bottom' }) {
  const y = edge === 'top' ? 'top-0' : 'top-full';
  return (
    <div className={`hidden md:block absolute ${edge === 'top' ? 'top-0' : 'bottom-0'} left-0 w-full pointer-events-none z-20`}>
      {['left-0', 'left-[25%]', 'left-[75%]', 'left-full'].map((x) => (
        <GridStar key={x} className={`${y} ${x}`} />
      ))}
    </div>
  );
}

function GridStar({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute z-20 flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 text-black/20 ${className}`}
      aria-hidden
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </span>
  );
}