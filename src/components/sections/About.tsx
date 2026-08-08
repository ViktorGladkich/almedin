'use client';

import { useRef } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';
import { RevealText3D } from '@/components/animations/RevealText3D';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function GridStar({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute z-20 text-black/30 flex items-center justify-center w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}>
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </div>
  );
}

export function About() {
  const container = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!container.current) return;

    const uiElements = gsap.utils.toArray('.about-ui', container.current) as HTMLElement[];
    gsap.fromTo(uiElements,
      { opacity: 0, filter: 'blur(10px)', y: 20 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        }
      }
    );
  }, { scope: container });

  const mainText = "Mit langjähriger Branchenerfahrung helfen wir unseren Kunden, ambitionierte Bauvisionen durch fachkundige Planung, transparente Kommunikation und zuverlässige Handwerkskunst zum Leben zu erwecken.";

  return (
    <section 
      ref={container} 
      className="relative w-full bg-[#F2F0EC] text-black pt-[40px] pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative border-t border-b border-black/10">
        
        {/* Top Closing Row Stars */}
        <div className="hidden md:block">
          <GridStar className="top-0 left-0" />
          <GridStar className="top-0 left-[25%]" />
          <GridStar className="top-0 left-[75%]" />
          <GridStar className="top-0 left-full" />
        </div>

        {/* Architectural Vertical Grid Lines */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black/10" />
          <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-black/10" />
          <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-black/10" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-black/10" />
        </div>

        {/* Main Grid Content (Row 1) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 relative z-10">
          
          {/* Column 1 (0% to 25%) — Sticky Left Column */}
          <div className="col-span-1 p-6 md:p-10 flex flex-col justify-between items-start gap-8">
            <div className="sticky top-28 flex flex-col gap-6 items-start w-full">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-black/70 font-semibold">
                Über uns
              </span>
              <p className="text-[13px] text-black/60 leading-relaxed font-light hidden md:block">
                Für die Ewigkeit gebaut — seit 2008 stehen wir für höchste Qualität und Verlässlichkeit im Hoch- und Gewerbebau.
              </p>
              <div className="pt-2">
                <CTAButton text="Unsere Geschichte" href="/about" variant="primary" />
              </div>
            </div>
          </div>

          {/* Column 2 & 3 (25% to 75%) — 3D Scrubbed Text Strictly Inside Center Grid */}
          <div className="col-span-1 md:col-span-2 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center gap-10">
            <RevealText3D
              text={mainText}
              scrub={true}
              className="font-display font-medium text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.3] tracking-tight text-black"
            />
          </div>

          {/* Column 4 (75% to 100%) — Right Clean Grid Cell */}
          <div className="col-span-1 p-6 md:p-10 hidden md:block" />

        </div>

        {/* Middle Line Stars & Border */}
        <div className="w-full border-t border-black/10 relative z-10">
          <div className="hidden md:block">
            <GridStar className="top-0 left-0" />
            <GridStar className="top-0 left-[25%]" />
            <GridStar className="top-0 left-[75%]" />
            <GridStar className="top-0 left-full" />
          </div>

          {/* Single Line Bottom Rail (Full Width Edge to Edge) */}
          <div className="hidden md:flex flex-row justify-between items-center w-full uppercase tracking-[0.25em] text-[11px] sm:text-[12px] text-black/70 font-medium py-4 px-8 relative">
            <span className="about-ui">Für die Ewigkeit gebaut</span>
            <span className="about-ui font-semibold text-black">SEIT 2008</span>
            <span className="about-ui">BAUEN // DETAIL</span>
          </div>

          {/* Mobile Bottom Rail */}
          <div className="flex md:hidden flex-col items-center gap-2 text-center uppercase tracking-[0.2em] text-[11px] text-black/70 font-medium py-4 px-4">
            <span>Für die Ewigkeit gebaut</span>
            <span className="font-semibold text-black">SEIT 2008</span>
            <span>BAUEN // DETAIL</span>
          </div>
        </div>

        {/* Bottom Closing Row Stars */}
        <div className="hidden md:block">
          <GridStar className="top-full left-0" />
          <GridStar className="top-full left-[25%]" />
          <GridStar className="top-full left-[75%]" />
          <GridStar className="top-full left-full" />
        </div>

      </div>
    </section>
  );
}
