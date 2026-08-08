'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { CTAButton } from '@/components/ui/CTAButton';
import { RevealText3D } from '@/components/animations/RevealText3D';

function GridStar({ className = "" }: { className?: string }) {
  return (
    <div className={`about-star absolute z-20 text-black/30 flex items-center justify-center w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}>
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

    if (prefersReducedMotion()) {
      gsap.set(['.about-ui', '.about-star', '.about-line'], { opacity: 1, y: 0, scale: 1, scaleY: 1 });
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 74%',
        once: true,
      },
    })
      .fromTo('.about-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: 'expo.out', stagger: 0.07, transformOrigin: 'top center' }
      )
      .fromTo('.about-star',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.03 },
        0.35
      )
      .fromTo('.about-ui',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out' },
        0.5
      );
  }, { scope: container });

  const mainText = "Mit langjähriger Branchenerfahrung helfen wir unseren Kunden, ambitionierte Bauvisionen durch fachkundige Planung, transparente Kommunikation und zuverlässige Handwerkskunst zum Leben zu erwecken.";

  return (
    <section 
      ref={container} 
      data-theme="light"
      className="relative w-full bg-[#F2F0EC] text-black pt-8 sm:pt-[40px] pb-12 sm:pb-24 md:pb-32 px-3.5 sm:px-6 md:px-10 overflow-x-clip"
    >
      <div className="max-w-[1400px] mx-auto relative border-t border-b border-x md:border-x-0 border-black/10">
        
        {/* Top Stars */}
        <GridStar className="top-0 left-0" />
        <GridStar className="hidden md:block top-0 left-[25%]" />
        <GridStar className="hidden md:block top-0 left-[75%]" />
        <GridStar className="top-0 left-full" />

        {/* Architectural Vertical Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="about-line absolute top-0 bottom-0 left-0 w-[1px] bg-black/10 origin-top" />
          <div className="about-line hidden md:block absolute top-0 bottom-0 left-[25%] w-[1px] bg-black/10 origin-top" />
          <div className="about-line hidden md:block absolute top-0 bottom-0 left-[75%] w-[1px] bg-black/10 origin-top" />
          <div className="about-line absolute top-0 bottom-0 right-0 w-[1px] bg-black/10 origin-top" />
        </div>

        {/* Mobile Header Eyebrow Rail */}
        <div className="flex md:hidden justify-between items-center w-full uppercase tracking-[0.2em] text-[10px] text-black/70 font-medium py-3 px-4 border-b border-black/10 relative z-10">
          <span className="about-ui font-mono font-semibold">Über uns</span>
          <span className="about-ui font-semibold text-black">SEIT 2016</span>
        </div>

        {/* Main Content Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 relative z-10">
          
          {/* Desktop Left Column (0% to 25%) */}
          <div className="hidden md:flex col-span-1 p-6 md:p-10 flex-col justify-between items-start gap-8">
            <div className="sticky top-28 flex flex-col gap-6 items-start w-full">
              <span className="about-ui font-mono text-[12px] uppercase tracking-[0.2em] text-black/70 font-semibold">
                Über uns
              </span>
              <p className="about-ui text-[13px] text-black/60 leading-relaxed font-light">
                Für die Ewigkeit gebaut — seit 2016 stehen wir für höchste Qualität und Verlässlichkeit im Hoch- und Gewerbebau.
              </p>
              <div className="about-ui pt-2">
                <CTAButton text="Unsere Geschichte" href="/about" variant="primary" size="responsive" />
              </div>
            </div>
          </div>

          {/* Main Body (Mobile Stack / Desktop Col 2 & 3) */}
          <div className="col-span-1 md:col-span-2 p-5 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center gap-6 sm:gap-10">
            <RevealText3D
              text={mainText}
              scrub={true}
              className="font-display font-medium text-[19px] xs:text-[21px] sm:text-[26px] md:text-[32px] lg:text-[36px] leading-[1.35] sm:leading-[1.3] tracking-tight text-black"
            />
            
            {/* Mobile Description & Button */}
            <div className="flex md:hidden flex-col gap-4 pt-2">
              <p className="about-ui text-[12.5px] text-black/60 leading-relaxed font-light">
                Für die Ewigkeit gebaut — seit 2016 stehen wir für höchste Qualität und Verlässlichkeit im Hoch- und Gewerbebau.
              </p>
              <div className="about-ui pt-1">
                <CTAButton text="Unsere Geschichte" href="/about" variant="primary" size="responsive" />
              </div>
            </div>
          </div>

          {/* Right Clean Grid Cell (Desktop Col 4) */}
          <div className="col-span-1 p-6 md:p-10 hidden md:block" />

        </div>

        {/* Middle Line Stars & Border */}
        <div className="w-full border-t border-black/10 relative z-10">
          <GridStar className="top-0 left-0" />
          <GridStar className="hidden md:block top-0 left-[25%]" />
          <GridStar className="hidden md:block top-0 left-[75%]" />
          <GridStar className="top-0 left-full" />

          {/* Desktop Rail */}
          <div className="hidden md:flex flex-row justify-between items-center w-full uppercase tracking-[0.25em] text-[11px] sm:text-[12px] text-black/70 font-medium py-4 px-8 relative">
            <span className="about-ui">Für die Ewigkeit gebaut</span>
            <span className="about-ui font-semibold text-black">SEIT 2016</span>
            <span className="about-ui">BAUEN // DETAIL</span>
          </div>

          {/* Mobile Bottom Rail */}
          <div className="flex md:hidden justify-between items-center uppercase tracking-[0.18em] text-[10px] text-black/70 font-medium py-3 px-4">
            <span className="about-ui">Für die Ewigkeit gebaut</span>
            <span className="about-ui">BAUEN // DETAIL</span>
          </div>
        </div>

        {/* Bottom Closing Row Stars */}
        <GridStar className="top-full left-0" />
        <GridStar className="hidden md:block top-full left-[25%]" />
        <GridStar className="hidden md:block top-full left-[75%]" />
        <GridStar className="top-full left-full" />

      </div>
    </section>
  );
}