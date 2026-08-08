'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CTAButton } from '@/components/ui/CTAButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className}>
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
  </svg>
);

export function ProjectIntake() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.intake-bg', 
      { scale: 1.15, filter: 'blur(10px)' },
      { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
    )
    .fromTo('.intake-content',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=1.5'
    )
    .fromTo('.intake-corner',
      { scale: 0, opacity: 0, rotation: -90 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=1'
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F2F0EC] p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* FRAMED CARD CONTAINER (Matching HeroFramed) */}
      <div className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[20px] bg-[#0D0D0D] border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.08)] min-h-[440px] sm:min-h-[550px] md:min-h-[700px] flex items-center justify-center p-4 sm:p-8 md:p-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/project_intake.png"
            alt="Concrete structure"
            fill
            className="intake-bg object-cover will-change-transform"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Inner Bordered Container */}
        <div className="relative z-10 w-full max-w-[1400px] min-h-[360px] sm:min-h-[460px] md:min-h-[550px] border border-[#cccac2]/40 flex flex-col items-center justify-center pointer-events-none py-10 sm:py-16 md:py-20 px-4 sm:px-8">
          
          {/* Corner Icons */}
          <div className="intake-corner absolute -top-3 -left-3 text-[#cccac2]">
            <StarIcon />
          </div>
          <div className="intake-corner absolute -top-3 -right-3 text-[#cccac2]">
            <StarIcon />
          </div>
          <div className="intake-corner absolute -bottom-3 -left-3 text-[#cccac2]">
            <StarIcon />
          </div>
          <div className="intake-corner absolute -bottom-3 -right-3 text-[#cccac2]">
            <StarIcon />
          </div>

          {/* Content */}
          <div className="intake-content flex flex-col items-center text-center px-2 sm:px-4 pointer-events-auto">
            <p className="text-[#d1d0cc] uppercase tracking-widest text-[11px] sm:text-sm md:text-base font-medium mb-3 sm:mb-6">
              Projektanfrage // 2026
            </p>
            <h2 className="text-[24px] sm:text-4xl md:text-7xl lg:text-[80px] font-display font-medium text-[#fffcf4] leading-[1.18] sm:leading-tight mb-8 sm:mb-12 max-w-3xl">
              Lassen Sie uns für die Ewigkeit bauen
            </h2>
            
            <CTAButton 
              href="/contact" 
              text="Starten Sie Ihr Projekt" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
