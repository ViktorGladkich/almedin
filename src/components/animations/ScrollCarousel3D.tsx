'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ScrollCarousel3DProps {
  items: CarouselItem[];
  radius?: number;
  className?: string;
}

export function ScrollCarousel3D({
  items,
  radius = 600,
  className = '',
}: ScrollCarousel3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sceneRef.current || !carouselRef.current) return;

      const cells = carouselRef.current.children;
      const angleStep = 360 / cells.length;

      // Position cells in 3D space
      Array.from(cells).forEach((cell, i) => {
        const angle = i * angleStep;
        gsap.set(cell, {
          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        });
      });

      // Create scroll-driven timeline
      const triggerElement = sceneRef.current.closest('section') || sceneRef.current;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: '+=1500', // Adjust this to control how long they have to scroll
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(carouselRef.current, { rotationY: 0 }, { rotationY: -360 }, 0)
        .fromTo(
          carouselRef.current,
          { rotationZ: 3, rotationX: 3 },
          { rotationZ: -3, rotationX: -3 },
          0
        )
        .fromTo(
          cardsRef.current,
          { rotationZ: 10 },
          { rotationZ: -10, ease: 'none' },
          0
        );

      return () => {
        tl.kill();
      };
    },
    { scope: sceneRef }
  );

  return (
    <div
      ref={sceneRef}
      className={`scene relative flex items-center justify-center w-full overflow-visible ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={carouselRef}
        className="carousel absolute w-[260px] h-[360px] top-1/2 left-1/2 -mt-[180px] -ml-[130px]"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {items.map((item, index) => {
          // Define styles for each of the 3 cards based on the screenshot
          const isRed = index === 0;
          const isBlack = index === 1;
          const isGray = index === 2;

          const bgColor = isRed ? 'bg-[#FF3131]' : isBlack ? 'bg-black' : 'bg-[#e5e5e5]';
          const textColor = isRed || isBlack ? 'text-white' : 'text-black';
          const borderColor = isRed ? 'border-white/30' : isBlack ? 'border-white/20' : 'border-black/10';
          const starColor = isRed ? 'text-white' : isBlack ? 'text-white/60' : 'text-black/30';
          const sLabelColor = isRed ? 'text-white/30' : isBlack ? 'text-white/20' : 'text-black/20';
          const logoColor = isGray ? 'black' : 'white';
          const logoCross = isRed ? '#FF3131' : isBlack ? 'black' : '#e5e5e5';

          return (
            <div
              key={item.id}
              className="carousel__cell absolute inset-0 w-[280px] h-[400px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`card relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ${bgColor} ${textColor}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 w-full h-full flex flex-col p-6"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Decorative Border */}
                  <div className={`absolute inset-3 border ${borderColor} rounded-sm pointer-events-none`} />

                  {/* 4 Stars at corners */}
                  <div className="absolute inset-3 pointer-events-none">
                    {/* Top Left */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`absolute -top-1.5 -left-1.5 ${starColor}`}>
                      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
                    </svg>
                    {/* Top Right */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`absolute -top-1.5 -right-1.5 ${starColor}`}>
                      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
                    </svg>
                    {/* Bottom Left */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`absolute -bottom-1.5 -left-1.5 ${starColor}`}>
                      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
                    </svg>
                    {/* Bottom Right */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`absolute -bottom-1.5 -right-1.5 ${starColor}`}>
                      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
                    </svg>
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start z-10 pt-2 px-2">
                    <h3 className="text-[17px] font-medium leading-tight max-w-[120px]">
                      {item.title}
                    </h3>
                    <span className={`text-4xl font-light tracking-tighter ${sLabelColor}`}>
                      S{index + 1}
                    </span>
                  </div>

                  {/* Center Image Mask */}
                  <div className="flex-1 flex items-center justify-center relative z-10 w-full">
                    {isRed && (
                      <div 
                        className="w-[180px] h-[180px] bg-black relative"
                        style={{
                          maskImage: 'radial-gradient(circle at 35% 50%, black 40%, transparent 40.5%), radial-gradient(circle at 65% 50%, black 40%, transparent 40.5%)',
                          maskComposite: 'add',
                          WebkitMaskImage: 'radial-gradient(circle at 35% 50%, black 40%, transparent 40.5%), radial-gradient(circle at 65% 50%, black 40%, transparent 40.5%)',
                          WebkitMaskComposite: 'source-over',
                        }}
                      >
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    )}
                    
                    {isBlack && (
                      <div 
                        className="w-[160px] h-[160px] relative overflow-hidden bg-white"
                        style={{ clipPath: 'circle(50% at 50% 50%)' }}
                      >
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    )}

                    {isGray && (
                      <div className="w-[170px] h-[170px] relative flex items-center justify-center">
                        {/* Red Pentagon Background/Border */}
                        <div 
                          className="absolute inset-0 bg-[#FF3131]"
                          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
                        />
                        {/* Image Pentagon */}
                        <div 
                          className="absolute inset-1 bg-gray-200"
                          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
                        >
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Logo */}
                  <div className="absolute bottom-6 left-6 z-10 w-6 h-6">
                    <Image 
                      src="/logo.png" 
                      alt="Logo" 
                      fill 
                      className={`object-contain ${isRed || isBlack ? 'brightness-0 invert' : ''}`}
                      sizes="24px"
                    />
                  </div>

                </div>
                
                {/* Back Face */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    backgroundColor: isRed ? '#FF3131' : isBlack ? 'black' : '#e5e5e5',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
