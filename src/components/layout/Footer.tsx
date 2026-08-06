'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import { HoverSlideText } from '@/components/ui/HoverSlideText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className}>
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
  </svg>
);

function GridStar({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute z-20 text-[#606060] flex items-center justify-center w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="footer-grid-star opacity-0"
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      }
    });

    // 1. Grid columns fade & slide up
    tl.fromTo('.footer-grid-col',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
    )
    // 2. Grid stars pop in with rotation
    .fromTo('.footer-grid-star',
      { opacity: 0, scale: 0, rotation: -90 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: 'back.out(1.5)' },
      '-=0.8'
    )
    // 3. Logo border expands (from center out if possible, but let's just fade it)
    .fromTo('.footer-logo-box',
      { opacity: 0, scaleY: 0.8 },
      { opacity: 1, scaleY: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    // 4. Logo corners pop
    .fromTo('.footer-corner',
      { scale: 0, opacity: 0, rotation: 90 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(2)' },
      '-=0.8'
    )
    // 5. Giant Letters slide up dynamically
    .fromTo('.footer-letter',
      { y: '120%', opacity: 0, rotateX: -45 },
      { y: '0%', opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: 'expo.out' },
      '-=0.8'
    )
    // 6. Bottom info fades in
    .fromTo('.footer-bottom-info',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full bg-[#fffcf4] text-black pt-20 pb-6 px-4 md:px-12 flex flex-col mt-auto overflow-hidden">
      
      {/* Grid Area replacing the Image */}
      <div className="w-full flex justify-center border-t border-b border-black/15 mb-20">
        <div className="w-full max-w-[1600px] relative">
          
          {/* Top row stars */}
          <div className="hidden md:block">
            <GridStar className="top-0 left-0" />
            <GridStar className="top-0 left-[33.333%]" />
            <GridStar className="top-0 left-[66.666%]" />
            <GridStar className="top-0 left-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-x border-black/15 w-full h-full">
            
            {/* Column 1 */}
            <div className="footer-grid-col opacity-0 p-8 md:p-12 xl:p-16 border-b md:border-b-0 md:border-r border-black/15 flex flex-col gap-12 md:gap-16">
              {/* DIENSTLEISTUNGEN */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Dienstleistungen</span>
                <div className="flex flex-col items-start gap-3 text-base md:text-lg lg:text-xl font-medium">
                  <Link href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Architektur" className="h-[1.2em]" />
                  </Link>
                  <Link href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Planung" className="h-[1.2em]" />
                  </Link>
                  <Link href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Bauleitung" className="h-[1.2em]" />
                  </Link>
                </div>
              </div>
              
              {/* UNTERNEHMEN */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Unternehmen</span>
                <div className="flex flex-col items-start gap-3 text-base md:text-lg lg:text-xl font-medium">
                  <Link href="/about" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Über uns" className="h-[1.2em]" />
                  </Link>
                  <Link href="/projects" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Projekte" className="h-[1.2em]" />
                  </Link>
                  <Link href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Karriere" className="h-[1.2em]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="footer-grid-col opacity-0 p-8 md:p-12 xl:p-16 border-b md:border-b-0 md:border-r border-black/15 flex flex-col gap-12 md:gap-16">
              {/* KONTAKT */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Kontakt</span>
                <div className="flex flex-col items-start gap-3 text-base md:text-lg lg:text-xl font-medium break-all">
                  <a href="mailto:info@almedin-bau.de" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="info@almedin-bau.de" className="h-[1.2em]" />
                  </a>
                  <a href="tel:+49351000000" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="+49 351 000000" className="h-[1.2em]" />
                  </a>
                </div>
              </div>

              {/* SOCIALS */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Socials</span>
                <div className="flex flex-col items-start gap-3 text-base md:text-lg lg:text-xl font-medium">
                  <a href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="Instagram" className="h-[1.2em]" />
                  </a>
                  <a href="#" className="group flex overflow-hidden w-fit">
                    <HoverSlideText text="LinkedIn" className="h-[1.2em]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="footer-grid-col opacity-0 p-8 md:p-12 xl:p-16 flex flex-col justify-between gap-12">
              {/* STANDORT */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Standort</span>
                <p className="text-base md:text-lg lg:text-xl font-medium max-w-[250px]">
                  Musterstraße 1, 01067 Dresden
                </p>
              </div>

              <div className="flex justify-start">
                <CTAButton text="Kostenlose Beratung" href="/contact" />
              </div>
            </div>

          </div>
          
          {/* Bottom row stars */}
          <div className="hidden md:block">
            <GridStar className="top-full left-0" />
            <GridStar className="top-full left-[33.333%]" />
            <GridStar className="top-full left-[66.666%]" />
            <GridStar className="top-full left-full" />
          </div>

        </div>
      </div>

      {/* Giant Logo Box */}
      <div className="footer-logo-box opacity-0 relative w-full max-w-[1600px] mx-auto border-[1.5px] border-black flex items-center justify-center py-4 md:py-8 lg:py-12">
        {/* Corners */}
        <div className="footer-corner opacity-0 absolute -top-3 -left-3 text-black">
          <StarIcon />
        </div>
        <div className="footer-corner opacity-0 absolute -top-3 -right-3 text-black">
          <StarIcon />
        </div>
        <div className="footer-corner opacity-0 absolute -bottom-3 -left-3 text-black">
          <StarIcon />
        </div>
        <div className="footer-corner opacity-0 absolute -bottom-3 -right-3 text-black">
          <StarIcon />
        </div>

        <h2 className="text-[13vw] xl:text-[12vw] font-display font-medium leading-none tracking-tighter text-black uppercase w-full text-center flex items-center justify-center gap-[2vw] md:gap-[1.5vw] overflow-hidden px-4 md:px-8">
          <div className="footer-letter opacity-0 translate-y-[120%] relative w-[12vw] h-[12vw] xl:w-[10vw] xl:h-[10vw] flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Almedin Bau Logo" 
              fill 
              className="object-contain"
            />
          </div>

          <div className="flex">
            {"Almedin Bau".split('').map((char, index) => (
              <span key={`text-${index}`} className="footer-letter inline-block opacity-0 translate-y-[120%]">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </h2>
      </div>

      {/* Bottom Info */}
      <div className="footer-bottom-info opacity-0 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest px-2">
        <div>Copyright © {currentYear}. Almedin Bau</div>
        <div className="flex gap-6">
          <Link href="/privacy" className="group flex overflow-hidden w-fit">
            <HoverSlideText text="Datenschutz" className="h-[1.2em]" />
          </Link>
          <Link href="/impressum" className="group flex overflow-hidden w-fit">
            <HoverSlideText text="Impressum" className="h-[1.2em]" />
          </Link>
        </div>
        <a href="https://invertadigital.de/" target="_blank" rel="noopener noreferrer" className="group flex overflow-hidden w-fit">
          <HoverSlideText text="Entwickelt von INVERTA" className="h-[1.2em]" />
        </a>
      </div>

    </footer>
  );
}
