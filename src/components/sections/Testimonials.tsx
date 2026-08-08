'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RevealText3D } from '@/components/animations/RevealText3D';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Michael Weber',
    position: 'Projektentwickler Gewerbeimmobilien',
    text: 'Ihre proaktive Herangehensweise und Branchenexpertise sorgten für einen reibungslosen Projektablauf. Jeder Meilenstein wurde planmäßig erreicht, was zu einem hochwertigen Ergebnis führte, auf das wir stolz sind.',
    avatar: '/images/german_avatar_1_1786013967275.png'
  },
  {
    id: 2,
    name: 'Sarah Müller',
    position: 'Leiterin Facility Management',
    text: 'Sie zeigten stets starke Führung und klare Kommunikation. Das Projekt wurde effizient abgeschlossen, wobei außergewöhnlich hohe Qualitätsstandards eingehalten wurden.',
    avatar: '/images/german_avatar_2_1786013985783.png'
  },
  {
    id: 3,
    name: 'Thomas Becker',
    position: 'Berater für Gewerbebau',
    text: 'Von der ersten Planungsphase bis zur endgültigen Übergabe verlief der Prozess nahtlos. Ihr Engagement für Qualität, Sicherheit und Zeitpläne machte die gesamte Erfahrung absolut stressfrei.',
    avatar: '/images/german_avatar_3_1786014003581.png'
  }
];

function GridStar({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute z-20 text-[#333333] flex items-center justify-center w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      }
    });

    // Make the container visible since clipPath will handle the hiding
    gsap.set('.testimonial-image', { opacity: 1 });

    tl.fromTo('.testimonial-image',
      { clipPath: 'inset(0% 0% 100% 0%)' }, // Wipes from top to bottom
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.0, ease: 'power3.inOut' }
    )
    .fromTo('.testimonial-image-inner',
      { scale: 1.25 },
      { scale: 1, duration: 2.0, ease: 'power3.inOut' },
      '<'
    )
    .fromTo('.testimonial-box',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.5, ease: 'expo.out' },
      '-=1.5'
    );
  }, { scope: sectionRef });

  const switchSlide = useCallback((newIndex: number, direction: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    gsap.to(contentRef.current, {
      opacity: 0,
      x: direction * -30,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(contentRef.current, 
          { opacity: 0, x: direction * 30 }, 
          { opacity: 1, x: 0, duration: 1.0, ease: 'expo.out', onComplete: () => setIsAnimating(false) }
        );
      }
    });
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    switchSlide((currentIndex + 1) % testimonials.length, 1);
  }, [currentIndex, switchSlide]);

  const prevSlide = useCallback(() => {
    switchSlide((currentIndex - 1 + testimonials.length) % testimonials.length, -1);
  }, [currentIndex, switchSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] py-20 md:py-[150px] flex justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        
        {/* Left Side: Image */}
        <div className="testimonial-image relative w-full h-[400px] md:h-[500px] lg:h-auto lg:min-h-[600px] rounded-[4px] overflow-hidden" style={{ opacity: 0 }}>
          <Image 
            src="/images/german_construction_site_1786013950666.png" 
            alt="Baustelle" 
            fill 
            className="object-cover testimonial-image-inner"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Side: Bordered Box with Grid */}
        <div className="testimonial-box opacity-0 relative border border-[#222222] flex flex-col justify-between">
          {/* Top Corners */}
          <GridStar className="top-0 left-0" />
          <GridStar className="top-0 left-full" />
          {/* Bottom Corners */}
          <GridStar className="top-full left-0" />
          <GridStar className="top-full left-full" />

          {/* Top Section: Text */}
          <div className="flex flex-col p-8 md:p-12 pb-16 md:pb-20">
            <span className="text-[#b2b1ab] text-[14px] md:text-[15px] mb-6">
              Vertrauen unserer Kunden
            </span>
            
            <div ref={contentRef} className="flex flex-col">
              <Image 
                src="https://framerusercontent.com/images/4s9Zo9U33qbSVqpl5Fd6gsESxRg.svg" 
                width={100} 
                height={18} 
                alt="5 Sterne" 
                className="mb-8"
              />
              <RevealText3D 
                key={testimonials[currentIndex].id}
                text={testimonials[currentIndex].text}
                tag="h3"
                scrub={false}
                triggerOnScroll={true}
                className="text-[#fffcf4] text-[24px] md:text-[32px] lg:text-[36px] font-medium leading-[1.3] tracking-tight"
              />
            </div>
          </div>

          {/* Bottom Section: Avatar and Navigation */}
          <div className="relative border-t border-[#222222] p-8 md:p-12 flex items-center justify-between mt-auto">
            {/* Intersection Stars */}
            <GridStar className="top-0 left-0" />
            <GridStar className="top-0 left-full" />

            <div className="flex items-center gap-4">
              <Image 
                src={testimonials[currentIndex].avatar} 
                width={48} 
                height={48} 
                alt={testimonials[currentIndex].name} 
                className="rounded-full object-cover w-[48px] h-[48px]"
              />
              <div className="flex flex-col">
                <span className="text-[#fffcf4] font-medium text-[15px]">{testimonials[currentIndex].name}</span>
                <span className="text-[#b2b1ab] text-[13px]">{testimonials[currentIndex].position}</span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 bg-[#fffcf4] hover:bg-gray-200 transition-colors flex items-center justify-center rounded-[2px] cursor-pointer"
                aria-label="Vorheriger Beitrag"
              >
                <ArrowLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 bg-[#fffcf4] hover:bg-gray-200 transition-colors flex items-center justify-center rounded-[2px] cursor-pointer"
                aria-label="Nächster Beitrag"
              >
                <ArrowRight className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
