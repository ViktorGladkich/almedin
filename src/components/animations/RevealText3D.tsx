'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealText3DProps {
  text: string;
  className?: string;
  scrub?: boolean | number;
  triggerOnScroll?: boolean;
  tag?: React.ElementType;
}

export function RevealText3D({ 
  text, 
  className = "", 
  scrub = false, 
  triggerOnScroll = true, 
  tag: Tag = 'div' 
}: RevealText3DProps) {
  const container = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useGSAP(() => {
    if (!container.current) return;
    
    const wordElements = gsap.utils.toArray('.reveal-word-3d', container.current) as HTMLElement[];
    
    if (triggerOnScroll) {
      gsap.fromTo(wordElements, 
        {
          opacity: 0.15, 
          rotationX: -60, 
          y: 35,
          z: -80,
          filter: 'blur(6px)',
        }, 
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          z: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 85%',
            end: 'bottom 35%',
            scrub: scrub ? 0.8 : false,
            toggleActions: scrub ? undefined : 'play none none reverse',
          }
        }
      );
    }
  }, { scope: container, dependencies: [text, scrub, triggerOnScroll] });

  return (
    <Tag 
      ref={container}
      className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] ${className}`}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-word-3d inline-block origin-bottom">
          {word}
        </span>
      ))}
    </Tag>
  );
}
