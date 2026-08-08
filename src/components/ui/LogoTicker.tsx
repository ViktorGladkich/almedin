'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LOGO_IMAGES = [
  { src: '/images/scene/12.png', alt: 'Partner Logo 1' },
  { src: '/images/scene/13.png', alt: 'Partner Logo 2' },
  { src: '/images/scene/14.png', alt: 'Partner Logo 3' },
  { src: '/images/scene/15.png', alt: 'Partner Logo 4' },
  { src: '/images/scene/16.png', alt: 'Partner Logo 5' },
  { src: '/images/scene/17.png', alt: 'Partner Logo 6' },
  { src: '/images/scene/18.png', alt: 'Partner Logo 7' },
  { src: '/images/scene/19.png', alt: 'Partner Logo 8' },
];

export function LogoTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const track = containerRef.current?.querySelector('.ticker-track');
    if (!track) return;

    // Master continuous linear loop
    const loop = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 24,
      repeat: -1,
    });
    tweenRef.current = loop;

    // ScrollTrigger to react dynamically to scroll direction and velocity
    let resetTimer: NodeJS.Timeout;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.min(Math.abs(self.getVelocity() / 250), 4);
        const direction = self.direction; // 1 = down (scroll left), -1 = up (scroll right)
        const targetSpeed = (1 + velocity) * direction;

        gsap.to(loop, {
          timeScale: targetSpeed,
          duration: 0.2,
          overwrite: true,
          ease: 'power1.out',
        });

        // Smoothly decay back to standard forward cruise speed (+1.0) when scrolling stops
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          gsap.to(loop, {
            timeScale: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        }, 150);
      },
    });
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.5, ease: 'power2.out' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#F2F0EC] py-4 sm:py-6 md:py-8 overflow-hidden select-none relative z-20 border-t border-b border-black/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="w-full flex items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      >
        <div className="ticker-track flex items-center gap-6 sm:gap-14 md:gap-24 whitespace-nowrap w-max will-change-transform">
          {[...LOGO_IMAGES, ...LOGO_IMAGES, ...LOGO_IMAGES].map((logo, idx) => (
            <div 
              key={idx}
              className="relative h-7 xs:h-8 sm:h-14 md:h-18 w-20 xs:w-24 sm:w-40 md:w-52 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 shrink-0"
            >
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                fill 
                className="object-contain"
                sizes="(max-width: 768px) 96px, 208px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
