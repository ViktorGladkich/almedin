'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
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
      { label: 'Umfang', value: 'Gewerbe & Privat' },
    ],
  },
];

const WORD = 'BAUKUNST';
const EYEBROW_LEFT = 'Von der Grundsteinlegung';
const EYEBROW_RIGHT = 'zur finalen Schlüsselübergabe';

/** ~375px of scroll per card. Below ~300 the ring turns faster than it reads. */
const PIN_DISTANCE = SERVICES.length * 375;

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(
          ['.sv-rule-h', '.sv-rule-v', '.sv-star', '.sv-eyebrow', '.sv-desc', '.sv-char'],
          { scaleX: 1, scaleY: 1, opacity: 1, yPercent: 0, y: 0 }
        );
        return;
      }

      // Query once. Passing selector STRINGS to GSAP makes it re-resolve them
      // and re-read computed styles on every update — `_getComputedProperty`
      // was 37% of main-thread time in the profile, and `getComputedStyle()`
      // forces a synchronous style recalculation each call.
      const q = gsap.utils.selector(el);
      const rulesH = q('.sv-rule-h');
      const rulesV = q('.sv-rule-v');
      const stars = q('.sv-star');
      const eyebrows = q('.sv-eyebrow');
      const descs = q('.sv-desc');
      const chars = q('.sv-char');
      const word = q('.sv-word');

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 72%', once: true } })
        .fromTo(rulesH, { scaleX: 0 }, {
          scaleX: 1, duration: 1.3, ease: 'expo.out', stagger: 0.08,
          transformOrigin: 'left center',
        })
        .fromTo(rulesV, { scaleY: 0 }, {
          scaleY: 1, duration: 1.2, ease: 'expo.out', stagger: 0.06,
          transformOrigin: 'top center',
        }, 0.25)
        .fromTo(stars, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.035,
        }, 0.55)
        .fromTo(eyebrows, { yPercent: 115 }, {
          yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05,
        }, 0.65)
        .fromTo(descs, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        }, 0.85)
        .fromTo(chars, { yPercent: 118 }, {
          yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.035,
        }, 0.95);

      gsap.to(word, {
        yPercent: -6,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: `+=${PIN_DISTANCE}`, scrub: 1 },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-theme="light"
      id="leistungen"
      /*
        THE HEIGHT IS RESERVED UP FRONT — this is what fixed a CLS of 1.00.

        ScrollTrigger's pin inserts a spacer of PIN_DISTANCE px into the DOM.
        Everything below the section jumps down by that amount the moment it
        appears, and because the carousel measures its stage first, the pin was
        being created several frames after mount — during the scroll, right in
        front of the visitor. A full-viewport jump scores the maximum CLS.

        Declaring the final height in CSS means the space is already there when
        the spacer arrives, so nothing moves. `contain: layout` additionally
        stops this subtree's reflows from invalidating the rest of the document.

        If PIN_DISTANCE changes, this stays correct automatically — it reads the
        same constant.
      */
      style={{ contain: 'layout' }}
      className="relative min-h-svh flex flex-col pt-10 md:pt-14 pb-6 overflow-x-clip px-frame"
    >
      <div className="relative w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
        {/* Frame verticals — spans, not borders, so they can be drawn */}
        <span className="sv-rule-v absolute top-0 bottom-0 left-0 w-px bg-page-hair origin-top" />
        <span className="sv-rule-v absolute top-0 bottom-0 right-0 w-px bg-page-hair origin-top" />
        <span className="sv-rule-v hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-page-hair origin-top" />
        <span className="sv-rule-v hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-page-hair origin-top" />

        {/* Eyebrow rail */}
        <div className="relative w-full">
          <span className="sv-rule-h absolute top-0 inset-x-0 h-px bg-page-hair origin-left" />
          <StarRow className="top-0" />

          <div className="hidden md:flex flex-row justify-between items-center w-full uppercase tracking-[0.22em] text-[11px] text-page-muted py-4 px-6">
            <MaskedText text={EYEBROW_LEFT} />
            <div className="flex items-center gap-4">
              <span className="sv-rule-h w-12 h-px bg-page-hair origin-left" />
              <MaskedText text="BIS" className="font-medium" />
              <span className="sv-rule-h w-12 h-px bg-page-hair origin-left" />
            </div>
            <MaskedText text={EYEBROW_RIGHT} />
          </div>

          <div className="flex md:hidden items-center justify-center text-center uppercase tracking-[0.14em] text-[10px] font-medium text-page-muted py-3.5 px-4">
            <MaskedText text="Von der Grundsteinlegung bis zur Übergabe" />
          </div>

          <span className="sv-rule-h absolute bottom-0 inset-x-0 h-px bg-page-hair origin-left" />
        </div>

        {/* Description */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-4">
          <div className="hidden md:flex col-span-1 items-center justify-center p-4">
            <span className="sv-desc font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-page-muted">
              Leistungen
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center py-4 px-5 md:px-6">
            <p className="sv-desc m-0 text-center max-w-[600px] leading-relaxed text-page-muted text-[clamp(13px,1.05vw,16px)]">
              Unsere Kernkompetenzen im Überblick. Erfahren Sie, wie wir Ihr
              Bauprojekt mit höchstem Qualitätsanspruch, transparenter Planung und
              zuverlässiger Ausführung zum Erfolg führen — entdecken Sie unsere
              Leistungen beim Scrollen.
            </p>
          </div>

          <div className="hidden md:flex col-span-1 items-center justify-center p-4">
            <span className="sv-desc font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-page-muted">
              Kernkompetenzen
            </span>
          </div>

          <span className="sv-rule-h absolute bottom-0 inset-x-0 h-px bg-page-hair origin-left" />
          <StarRow className="bottom-0 translate-y-1/2" />
        </div>

        {/* Wordmark + ring */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-3 md:px-6">
          <h2
            className="sv-word absolute inset-x-0 top-[3%] m-0 text-center font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-page-ink pointer-events-none text-[clamp(2.2rem,7.5vw,5.2rem)]"
            aria-label={WORD}
          >
            {Array.from(WORD).map((c, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="sv-char inline-block">{c}</span>
              </span>
            ))}
          </h2>

          <div className="relative z-10 w-full h-[clamp(300px,48vw,470px)] mt-[6%]">
            <ScrollCarousel3D
              items={SERVICES}
              pinTarget={root}
              pinDistance={PIN_DISTANCE}
              snap
              rotation={360}
              restOffset={0.3}
              fit={0.8}
            />
          </div>
        </div>

        {/* Closing rule */}
        <div className="relative w-full">
          <span className="sv-rule-h absolute top-0 inset-x-0 h-px bg-page-hair origin-left" />
          <StarRow className="top-0" />
        </div>
      </div>

      {/* Static pin spacer.
          Rendered on the server, so the space exists from the first paint.
          ScrollTrigger's own spacer (pinSpacing) appears only after the
          carousel has measured its stage, and inserting it mid-scroll shifts
          every section below by PIN_DISTANCE — the maximum possible CLS. */}
      <div aria-hidden style={{ height: PIN_DISTANCE }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto mt-6 flex justify-center md:hidden">
        <CTAButton text="Kostenlose Beratung" href="/contact" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** A word split into masked units the master timeline can stagger. */
function MaskedText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i, arr) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <span className="sv-eyebrow inline-block">
            {word}
            {i < arr.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}

function StarRow({ className = '' }: { className?: string }) {
  return (
    <div className={`hidden md:block absolute left-0 w-full pointer-events-none z-20 ${className}`}>
      {['left-0', 'left-1/4', 'left-3/4', 'left-full'].map((x) => (
        <span
          key={x}
          className={`sv-star absolute ${x} flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 text-page-hair`}
          aria-hidden
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}