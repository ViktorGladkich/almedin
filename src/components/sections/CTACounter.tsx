'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

    // 2. Heading text slide up (Cascading Mask Reveal)
    const words = gsap.utils.toArray('.split-cta-inner') as HTMLElement[];
    gsap.fromTo(words, 
      { yPercent: 120, rotationZ: 5, opacity: 0 },
      {
        yPercent: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
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

    // 4. Counter Cards Pop-in and Number Counting
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

    // Number counting logic
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
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://framerusercontent.com/images/DaujIxGV3kuIKq2CePL4JZDnJWU.jpg" 
          alt="Construction background" 
          fill
          className="object-cover cta-bg-image origin-center will-change-transform"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom Black Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1880px] mx-auto flex flex-col items-center pt-[200px] px-[30px] gap-[400px] md:gap-[550px] pb-[160px]">
        
        {/* Top Content (Heading & Buttons) */}
        <div className="flex flex-col items-center max-w-4xl text-center">
          
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em] text-4xl md:text-6xl lg:text-7xl font-display font-medium text-[#fffcf4] tracking-tight mb-6">
            {headingWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-flex pb-2 -mb-2">
                <span className="split-cta-inner inline-block will-change-transform origin-bottom-left opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </div>

          <p className="cta-ui text-lg md:text-xl text-[#fffcf4]/90 font-light mb-10 max-w-2xl opacity-0 will-change-transform">
            Großartige Gebäude zeichnen sich nicht durch ihre Größe aus, sondern durch ihren Einfluss auf die Menschen, die sie nutzen.
          </p>
          
          <div className="cta-ui flex flex-col sm:flex-row items-center gap-6 mt-4 opacity-0 will-change-transform">
            <CTAButton text="Projekt starten" href="/contact" className="shadow-2xl shadow-[#FF3131]/20" />
            <CTAButton text="Projekte erkunden" href="/projects" variant="light" className="shadow-2xl shadow-black/20" />
          </div>
        </div>

        {/* Bottom Content (Counters & Sectors) */}
        <div className="w-full flex flex-col items-center gap-24">
          
          {/* Counters (Glassmorphism) */}
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Counter 1 */}
              <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-[#fffcf4] text-sm md:text-base font-light tracking-wide uppercase">
                  Abgeschlossene Projekte
                </p>
                <div className="w-full h-[1px] bg-[#cccac2]/30 my-4" />
                <h3 ref={counter1Ref} className="text-[#fffcf4] text-5xl font-display font-medium">0+</h3>
              </div>
              {/* Counter 2 */}
              <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-[#fffcf4] text-sm md:text-base font-light tracking-wide uppercase">
                  Bauexperten
                </p>
                <div className="w-full h-[1px] bg-[#cccac2]/30 my-4" />
                <h3 ref={counter2Ref} className="text-[#fffcf4] text-5xl font-display font-medium">0+</h3>
              </div>
              {/* Counter 3 */}
              <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-[#fffcf4] text-sm md:text-base font-light tracking-wide uppercase">
                  Jahre Erfahrung
                </p>
                <div className="w-full h-[1px] bg-[#cccac2]/30 my-4" />
                <h3 ref={counter3Ref} className="text-[#fffcf4] text-5xl font-display font-medium">0</h3>
              </div>
              {/* Counter 4 */}
              <div className="cta-counter-box opacity-0 bg-[#fffcf4]/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between h-[160px] border border-white/10" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-[#fffcf4] text-sm md:text-base font-light tracking-wide uppercase">
                  m² umbauter Raum
                </p>
                <div className="w-full h-[1px] bg-[#cccac2]/30 my-4" />
                <h3 ref={counter4Ref} className="text-[#fffcf4] text-5xl font-display font-medium">0.0M+</h3>
              </div>
            </div>
          </div>

          {/* Active Sectors */}
          <div className="w-full flex flex-col items-center gap-6">
            <p className="cta-ui opacity-0 text-[#fffcf4]/80 text-[12px] font-medium tracking-widest uppercase will-change-transform">
              Aktive Sektoren
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[#fffcf4] text-[15px] font-light">
              <span className="cta-ui opacity-0 will-change-transform">Wohnbau</span>
              <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20 will-change-transform" />
              <span className="cta-ui opacity-0 will-change-transform">Gewerbe</span>
              <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20 will-change-transform" />
              <span className="cta-ui opacity-0 will-change-transform">Industrie</span>
              <div className="cta-ui opacity-0 w-[1px] h-3 bg-white/20 will-change-transform" />
              <span className="cta-ui opacity-0 will-change-transform">Mischnutzung</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
