'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Carousel3DProps {
  items: {
    id: number;
    title: string;
    image: string;
    description: string;
  }[];
  className?: string;
}

export function Carousel3D({ items, className }: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // We are building a carousel specifically for 3 cards
  const angle = 360 / items.length; // 120 degrees for 3 cards
  const radius = 350; // Z-translation for 3D effect

  useGSAP(
    () => {
      if (!trackRef.current) return;
      
      const cards = gsap.utils.toArray('.carousel-card');
      if (cards.length === 0) return;

      // Initial setup of 3D positioning
      gsap.set(cards, {
        transformOrigin: `50% 50% ${-radius}px`,
        z: -radius,
        rotationY: (i) => i * angle,
      });

      // Animate the track to the current index
      gsap.to(trackRef.current, {
        rotationY: -currentIndex * angle,
        duration: 1,
        ease: 'power3.inOut',
      });
    },
    { scope: containerRef, dependencies: [currentIndex, angle] }
  );

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative w-full h-[600px] flex items-center justify-center overflow-hidden [perspective:1000px]", 
        className
      )}
    >
      {/* 3D Track */}
      <div 
        ref={trackRef} 
        className="relative w-[320px] md:w-[400px] h-[500px] [transform-style:preserve-3d]"
      >
        {items.map((item, i) => {
          // Calculate if this card is currently active to apply styling
          const normalizedIndex = ((currentIndex % items.length) + items.length) % items.length;
          const isActive = i === normalizedIndex;

          return (
            <div
              key={item.id}
              className={cn(
                "carousel-card absolute inset-0 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden [backface-visibility:hidden] border border-neutral-200 dark:border-neutral-800 transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-40"
              )}
            >
              <div className="relative w-full h-1/2">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 h-1/2 flex flex-col justify-center bg-white dark:bg-neutral-900">
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-neutral-800 dark:text-white hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-neutral-800 dark:text-white hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
