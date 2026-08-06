'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CTAButton } from '@/components/ui/CTAButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg overflow="visible" viewBox="0 0 64 64" width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path strokeLinejoin="miter" fill="currentColor" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z"></path>
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
    <section ref={sectionRef} className="w-full relative min-h-[700px] flex items-center justify-center p-6 md:p-12 overflow-hidden bg-neutral-950">
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
      <div className="relative z-10 w-full max-w-[1400px] min-h-[550px] border border-[#cccac2]/40 flex flex-col items-center justify-center pointer-events-none">
        
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
        <div className="intake-content flex flex-col items-center text-center px-4 pointer-events-auto">
          <p className="text-[#d1d0cc] uppercase tracking-widest text-sm md:text-base font-medium mb-6">
            Projektanfrage // 2026
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-display font-medium text-[#fffcf4] leading-tight mb-12 max-w-3xl">
            Lassen Sie uns für die Ewigkeit bauen
          </h2>
          
          <CTAButton 
            href="/contact" 
            text="Starten Sie Ihr Projekt" 
          />
        </div>
      </div>
    </section>
  );
}
