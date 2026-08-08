'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTACounter() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Refs for numbers
  const counter1Ref = useRef<HTMLHeadingElement>(null);
  const counter2Ref = useRef<HTMLHeadingElement>(null);
  const counter3Ref = useRef<HTMLHeadingElement>(null);
  const counter4Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. Parallax background
    gsap.fromTo('.cta-bg-image', 
      { scale: 1.25, filter: 'blur(5px) brightness(0.6)' },
      {
        scale: 1,
        filter: 'blur(0px) brightness(0.4)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // 2. Heading Split Word Animation
    const words = gsap.utils.toArray('.split-cta-inner') as HTMLElement[];
    gsap.fromTo(words, 
      { yPercent: 120, rotationZ: 5, opacity: 0 },
      {
        yPercent: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // 3. Blur Stagger for UI Elements (Subtitle, Buttons, Bottom sectors)
    const uiElements = gsap.utils.toArray('.cta-ui') as HTMLElement[];
    gsap.fromTo(uiElements,
      { opacity: 0, filter: 'blur(10px)', y: 30 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    // 4. Counter Card Entrance Animation (Pop from 3D space)
    const counterBoxes = gsap.utils.toArray('.cta-counter-box') as HTMLElement[];
    
    // Animate the cards themselves
    gsap.fromTo(counterBoxes,
      { y: 60, opacity: 0, scale: 0.9, rotationX: 15 },
      {
        y: 0, opacity: 1, scale: 1, rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.cta-counter-box',
          start: 'top 85%',
        }
      }
    );

    // 5. Trigger Number Counting on Scroll
    ScrollTrigger.create({
      trigger: '.cta-counter-box',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Counter 1: 0 to 250
        gsap.to({ val: 0 }, {
          val: 250,
          duration: 2,
          ease: 'power3.out',
          onUpdate: function() {
            if (counter1Ref.current) counter1Ref.current.innerText = Math.floor(this.targets()[0].val) + '+';
          }
        });
        
        // Counter 2: 0 to 45
        gsap.to({ val: 0 }, {
          val: 45,
          duration: 2,
          ease: 'power3.out',
          delay: 0.1,
          onUpdate: function() {
            if (counter2Ref.current) counter2Ref.current.innerText = Math.floor(this.targets()[0].val) + '+';
          }
        });

        // Counter 3: 0 to 18
        gsap.to({ val: 0 }, {
          val: 18,
          duration: 2,
          ease: 'power3.out',
          delay: 0.2,
          onUpdate: function() {
            if (counter3Ref.current) counter3Ref.current.innerText = Math.floor(this.targets()[0].val).toString();
          }
        });

        // Counter 4: 0 to 1.1M (we'll count 0 to 11 and format it)
        gsap.to({ val: 0 }, {
          val: 11,
          duration: 2,
          ease: 'power3.out',
          delay: 0.3,
          onUpdate: function() {
            if (counter4Ref.current) {
              const num = this.targets()[0].val / 10; // 0.0 to 1.1
              counter4Ref.current.innerText = num.toFixed(1) + 'M+';
            }
          }
        });
      }
    });

  }, { scope: sectionRef });

  const headingText = "Lassen Sie uns Ihr Projekt besprechen";
  const headingWords = headingText.split(' ');

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F2F0EC] p-2 sm:p-4 md:p-6 overflow-hidden" style={{ perspective: '1000px' }}>
      {/* FRAMED CARD CONTAINER (Matching HeroFramed) */}
      <div className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[20px] bg-[#0D0D0D] border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
        {/* Background Image with Parallax & Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src="/images/cta_bg_2.png"
            alt="Almedin Construction Background" 
            fill
            className="object-cover cta-bg-image origin-center will-change-transform"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Bottom Black Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-[1880px] mx-auto flex flex-col items-center pt-12 sm:pt-[140px] md:pt-[180px] px-3.5 sm:px-[24px] md:px-[30px] gap-16 sm:gap-[200px] md:gap-[380px] pb-10 sm:pb-[90px] md:pb-[140px]">
          
          {/* Top Content (Heading & Buttons) */}
          <div className="flex flex-col items-center max-w-4xl text-center">
            
            <div className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] text-[26px] xs:text-[30px] sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-[#fffcf4] leading-[1.15] sm:leading-tight tracking-tight mb-4 sm:mb-6">
              {headingWords.map((word, i) => (
                <span key={i} className="overflow-hidden inline-flex pb-1.5 -mb-1.5">
                  <span className="split-cta-inner inline-block origin-bottom-left opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>

            <p className="cta-ui text-sm sm:text-lg md:text-xl text-[#fffcf4]/90 font-light mb-6 sm:mb-10 max-w-2xl opacity-0">
              Großartige Gebäude zeichnen sich nicht durch ihre Größe aus, sondern durch ihren Einfluss auf die Menschen, die sie nutzen.
            </p>
            
            <div className="cta-ui flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 mt-2 sm:mt-4 w-full opacity-0">
              <CTAButton text="Projekt starten" href="/contact" size="responsive" className="shadow-2xl shadow-[#FF3131]/20" />
              <CTAButton text="Projekte erkunden" href="/projects" variant="light" size="responsive" className="shadow-2xl shadow-black/20" />
            </div>
          </div>

          {/* Bottom Content (Counters & Sectors) */}
          <div className="w-full flex flex-col items-center gap-10 sm:gap-16 md:gap-24">
            
            {/* Counters (Glassmorphism) */}
            <div className="w-full max-w-[1400px] mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Counter 1 */}
                <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col justify-between h-[135px] sm:h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="text-[#fffcf4] text-[11px] sm:text-sm md:text-base font-light tracking-wide uppercase line-clamp-2">
                    Abgeschlossene Projekte
                  </p>
                  <div className="w-full h-[1px] bg-[#cccac2]/30 my-2 sm:my-4" />
                  <h3 ref={counter1Ref} className="text-[#fffcf4] text-3xl sm:text-5xl font-display font-medium">0+</h3>
                </div>
                {/* Counter 2 */}
                <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col justify-between h-[135px] sm:h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="text-[#fffcf4] text-[11px] sm:text-sm md:text-base font-light tracking-wide uppercase line-clamp-2">
                    Bauexperten
                  </p>
                  <div className="w-full h-[1px] bg-[#cccac2]/30 my-2 sm:my-4" />
                  <h3 ref={counter2Ref} className="text-[#fffcf4] text-3xl sm:text-5xl font-display font-medium">0+</h3>
                </div>
                {/* Counter 3 */}
                <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col justify-between h-[135px] sm:h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="text-[#fffcf4] text-[11px] sm:text-sm md:text-base font-light tracking-wide uppercase line-clamp-2">
                    Jahre Erfahrung
                  </p>
                  <div className="w-full h-[1px] bg-[#cccac2]/30 my-2 sm:my-4" />
                  <h3 ref={counter3Ref} className="text-[#fffcf4] text-3xl sm:text-5xl font-display font-medium">0</h3>
                </div>
                {/* Counter 4 */}
                <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col justify-between h-[135px] sm:h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="text-[#fffcf4] text-[11px] sm:text-sm md:text-base font-light tracking-wide uppercase line-clamp-2">
                    m² umbauter Raum
                  </p>
                  <div className="w-full h-[1px] bg-[#cccac2]/30 my-2 sm:my-4" />
                  <h3 ref={counter4Ref} className="text-[#fffcf4] text-3xl sm:text-5xl font-display font-medium">0.0M+</h3>
                </div>
              </div>
            </div>

            {/* Active Sectors */}
            <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
              <p className="cta-ui opacity-0 text-[#fffcf4]/80 text-[11px] sm:text-[12px] font-medium tracking-widest uppercase">
                Aktive Sektoren
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[#fffcf4] text-xs sm:text-[15px] font-light">
                <span className="cta-ui opacity-0">Wohnbau</span>
                <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20" />
                <span className="cta-ui opacity-0">Gewerbe</span>
                <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20" />
                <span className="cta-ui opacity-0">Industrie</span>
                <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20" />
                <span className="cta-ui opacity-0">Mischnutzung</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
