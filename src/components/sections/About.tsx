'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Parallax background
    gsap.fromTo('.about-bg', 
      { scale: 1.25, filter: 'blur(5px) brightness(0.6)' },
      {
        scale: 1,
        filter: 'blur(0px) brightness(0.3)',
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Split text cascading reveal
    const words = gsap.utils.toArray('.split-word-inner') as HTMLElement[];
    gsap.fromTo(words, 
      { yPercent: 120, rotationZ: 5, opacity: 0 },
      {
        yPercent: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        }
      }
    );

    // Fade and blur stagger for UI elements
    const uiElements = gsap.utils.toArray('.about-ui') as HTMLElement[];
    gsap.fromTo(uiElements,
      { opacity: 0, filter: 'blur(10px)', y: 30 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        }
      }
    );

  }, { scope: container });

  const mainText = "Mit langjähriger Branchenerfahrung helfen wir unseren Kunden, ambitionierte Bauvisionen durch fachkundige Planung, transparente Kommunikation und zuverlässige Handwerkskunst zum Leben zu erwecken.";
  const words = mainText.split(' ');

  return (
    <section ref={container} className="relative w-full text-white flex items-center justify-center overflow-hidden min-h-screen">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Almedin Bau Gebäude"
          fill
          className="about-bg object-cover origin-center will-change-transform"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-32 md:gap-[250px] max-w-[900px] w-full mx-auto px-6 py-32 md:py-[180px]">
        
        {/* Top — Title & Description */}
        <div ref={textRef} className="flex flex-col items-center text-center gap-8 md:gap-12">
          <p className="about-ui text-[13px] uppercase tracking-[0.3em] text-[#fffcf4] font-medium opacity-0 will-change-transform">
            Über uns
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] text-[24px] md:text-[36px] lg:text-[44px] leading-[1.2] text-[#fffcf4] font-medium tracking-tight">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-flex pb-2 -mb-2">
                <span className="split-word-inner inline-block will-change-transform origin-bottom-left opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom — Stats & CTA */}
        <div className="w-full flex flex-col items-center gap-12">
          <div className="w-full flex flex-col items-center gap-6 max-w-[600px]">
            <div className="w-full flex items-center justify-between">
              <p className="about-ui text-[13px] uppercase tracking-[0.3em] text-[#fffcf4] font-medium text-left opacity-0 will-change-transform">
                Für die Ewigkeit gebaut
              </p>
              <p className="about-ui text-[13px] uppercase tracking-[0.3em] text-[#fffcf4] font-medium text-center opacity-0 will-change-transform">
                SEIT 2008
              </p>
            </div>
            <div className="about-ui w-full h-[1px] bg-white/20 opacity-0 will-change-transform" />
            <p className="about-ui text-[11px] uppercase tracking-[0.5em] text-[#fffcf4] font-normal text-center opacity-0 will-change-transform">
              BAUEN // DETAIL
            </p>
          </div>

          <div className="about-ui opacity-0 will-change-transform">
            <CTAButton text="Unsere Geschichte" href="/about" />
          </div>
        </div>
      </div>
    </section>
  );
}
