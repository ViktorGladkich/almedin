"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Grundlagenermittlung',
    desc: 'Detaillierte Definition der Projektziele, Standortanforderungen und strategischen Bauvorgaben.',
    bgClass: 'bg-black text-[#fffcf4]',
    numClass: 'text-[#4d4c49]',
  },
  {
    num: '02',
    title: 'Planung',
    desc: 'Entwicklung von präzisen Zeichnungen, transparenten Budgets, Zeitplänen und technischen Dokumentationen.',
    bgClass: 'bg-[#ff3131] text-white',
    numClass: 'text-white/60',
  },
  {
    num: '03',
    title: 'Bauausführung',
    desc: 'Realisierung des Bauvorhabens mit diszipliniertem Management, strenger Qualitätskontrolle und Bauüberwachung.',
    bgClass: 'bg-[#d1d0cc] text-black',
    numClass: 'text-[#4d4c49]',
  },
  {
    num: '04',
    title: 'Schlüsselfertige Übergabe',
    desc: 'Durchführung von Endabnahmen und reibungslose Übergabe für einen langfristigen Projekterfolg.',
    bgClass: 'bg-black text-[#fffcf4]', // We'll override this with an image below
    numClass: 'text-[#fffcf4]',
    image: 'https://framerusercontent.com/images/1sFlh6YuSnDbAMW3fQv7PTROSuo.jpg',
  },
];

function StepCard({ step }: { step: typeof steps[0] }) {
  return (
    <div className={`step-card-animate opacity-0 relative w-full rounded-[10px] p-8 md:p-10 flex flex-col items-center text-center overflow-hidden h-full min-h-[360px] md:min-h-[380px] justify-between ${step.bgClass}`}>
      {/* Background Image for Step 04 */}
      {step.image && (
        <>
          <Image 
            src={step.image} 
            alt={step.title} 
            fill 
            className="object-cover z-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-10" />
        </>
      )}

      {/* Number at Top */}
      <div className="relative z-20 flex w-full justify-center pt-2">
        <h2 className={`text-[32px] md:text-[40px] leading-none font-display font-medium ${step.numClass}`}>
          {step.num}
        </h2>
      </div>
      
      {/* Text at Bottom */}
      <div className="relative z-20 flex flex-col items-center w-full pb-2">
        <h3 className="text-xl md:text-2xl font-display font-medium mb-3">
          {step.title}
        </h3>
        <p className="text-[14px] md:text-[15px] leading-relaxed font-light opacity-80 max-w-[280px]">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export function Steps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    });

    // 1. Premium grid fade-in with slight scale
    tl.fromTo('.grid-wrapper',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    )
    
    // 2. Stars pop in randomly across the grid with elastic rotation
    .fromTo('.grid-star',
      { opacity: 0, scale: 0, rotate: 180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.2, stagger: { amount: 0.8, from: "random" }, ease: 'elastic.out(1, 0.4)' },
      '-=1.2'
    )

    // 3. Cards slide up with a subtle scale effect, staggered
    .fromTo('.step-card-animate',
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.25, ease: 'expo.out' },
      0.8
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col items-center pt-[200px] overflow-hidden z-10">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://framerusercontent.com/images/WbQsqJ9f2In9va4l6ekWMPrf3Y.jpg" 
          alt="Steps background" 
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Base overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {/* Dark gradient from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent" />
      </div>

      {/* Grid and Cards Wrapper with top fade mask */}
      <div 
        className="grid-wrapper opacity-0 relative z-10 w-full flex flex-col items-center"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0px, black 300px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 300px)' }}
      >
        
        {/* Row 1: Empty (3 columns, hidden on mobile) */}
        <div className="hidden md:flex w-full justify-center border-t border-b border-white/10">
          <div className="w-full max-w-[1150px] relative">
            <RowTopStars />
            <div className="grid grid-cols-3 border-x border-white/10 w-full h-full">
              <div className="h-[200px] border-r border-white/10"></div>
              <div className="h-[200px] border-r border-white/10"></div>
              <div className="h-[200px]"></div>
            </div>
          </div>
        </div>

        {/* Row 2: Top (01 and 02) */}
        <div className="w-full flex justify-center border-b border-white/10">
          <div className="w-full max-w-[1150px] relative px-6 md:px-0">
            <RowTopStars />
            <div className="grid grid-cols-1 md:grid-cols-3 border-x border-white/10 w-full h-full">
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
                <StepCard step={steps[0]} />
              </div>
              <div className="hidden md:block border-r border-white/10"></div>
              <div className="p-6 md:p-8">
                <StepCard step={steps[1]} />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Middle (03) */}
        <div className="w-full flex justify-center border-b border-white/10">
          <div className="w-full max-w-[1150px] relative px-6 md:px-0">
            <RowTopStars />
            <div className="grid grid-cols-1 md:grid-cols-3 border-x border-white/10 w-full h-full">
              <div className="hidden md:block border-r border-white/10"></div>
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
                <StepCard step={steps[2]} />
              </div>
              <div className="hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* Row 4: Bottom (04 and Get Started) */}
        <div className="w-full flex justify-center border-b border-white/10">
          <div className="w-full max-w-[1150px] relative px-6 md:px-0">
            <RowTopStars />
            <RowBottomStars />
            <div className="grid grid-cols-1 md:grid-cols-3 border-x border-white/10 w-full h-full">
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
                <StepCard step={steps[3]} />
              </div>
              <div className="hidden md:block border-r border-white/10"></div>
              {/* Get Started Button container sits at the bottom */}
              <div className="p-6 md:p-8 flex items-end justify-center">
                <div className="step-card-animate opacity-0 relative w-full rounded-[10px] p-[60px] flex flex-col items-center justify-center text-center overflow-hidden h-max bg-[#fffcf4]/10 backdrop-blur-[20px]">
                  <CTAButton text="JETZT STARTEN" href="/contact" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Empty Bottom */}
        <div className="hidden md:flex w-full justify-center">
          <div className="w-full max-w-[1150px] relative">
            <div className="grid grid-cols-3 border-x border-white/10 w-full h-full">
              <div className="h-[160px] border-r border-white/10"></div>
              <div className="h-[160px] border-r border-white/10"></div>
              <div className="h-[160px]"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function GridStar({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute z-20 text-[#606060] flex items-center justify-center w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="grid-star opacity-0"
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </div>
  );
}

function RowTopStars() {
  return (
    <div className="hidden md:block">
      <GridStar className="top-0 left-0" />
      <GridStar className="top-0 left-[33.333%]" />
      <GridStar className="top-0 left-[66.666%]" />
      <GridStar className="top-0 left-full" />
    </div>
  );
}

function RowBottomStars() {
  return (
    <div className="hidden md:block">
      <GridStar className="top-full left-0" />
      <GridStar className="top-full left-[33.333%]" />
      <GridStar className="top-full left-[66.666%]" />
      <GridStar className="top-full left-full" />
    </div>
  );
}
