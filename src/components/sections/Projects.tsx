'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RevealText } from '@/components/animations/RevealText';
import { FadeInUp } from '@/components/animations/FadeInUp';
import { MapPin, Expand } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { Ticker } from '@/components/ui/Ticker';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROJECTS_DATA = [
  {
    id: 'p1',
    title: 'Bürokomplex',
    subtitle: 'Altstadt',
    year: '2025',
    type: 'Gewerbebau',
    size: '11.000 qm',
    area: 'Corporate Headquarters',
    image: '/images/projects/project_1.png',
    descriptionLeft: 'Ein modernes und nachhaltiges Bürogebäude im Herzen der historischen Altstadt. Perfekte Integration in die städtische Architektur.',
    descriptionRight: 'Ausgestattet mit neuester Smart-Building-Technologie, flexiblen Arbeitsbereichen und einer begrünten Dachterrasse für Mitarbeiter.'
  },
  {
    id: 'p2',
    title: 'Wohnquartier',
    subtitle: 'Elbufer',
    year: '2024',
    type: 'Wohnungsbau',
    size: '4.500 qm',
    area: 'Residential Area',
    image: '/images/projects/project_2.png',
    descriptionLeft: 'Exklusives Wohnen direkt am Fluss. Hochwertige Materialien und lichtdurchflutete Räume schaffen ein einzigartiges Lebensgefühl.',
    descriptionRight: 'Das Quartier umfasst 40 Wohneinheiten, Tiefgarage und private Gärten, alles unter Einhaltung höchster Energiestandards.'
  },
  {
    id: 'p3',
    title: 'Logistikzentrum',
    subtitle: 'Industriepark',
    year: '2026',
    type: 'Industriebau',
    size: '25.000 qm',
    area: 'Logistics Hub',
    image: '/images/projects/project_3.png',
    descriptionLeft: 'Ein hochmodernes Logistikzentrum mit optimierten Verkehrswegen und energieeffizienter Bauweise.',
    descriptionRight: 'Die Anlage verfügt über intelligente Lagersysteme, großzügige Rangierflächen und ein nachhaltiges Energiemanagement.'
  },
  {
    id: 'p4',
    title: 'Villa am See',
    subtitle: 'Vorstadt',
    year: '2023',
    type: 'Privatbau',
    size: '850 qm',
    area: 'Luxury Estate',
    image: '/images/projects/project_4.png',
    descriptionLeft: 'Eine exklusive Villa mit Panoramablick auf den See, die durch ihre klare Linienführung und zeitlose Eleganz besticht.',
    descriptionRight: 'Das Gebäude bietet einen Infinity-Pool, bodentiefe Fensterfronten und maßgeschneiderte Innenausstattung.'
  },
  {
    id: 'p5',
    title: 'Kulturmuseum',
    subtitle: 'Zentrum',
    year: '2027',
    type: 'Öffentlicher Bau',
    size: '14.200 qm',
    area: 'Exhibition Space',
    image: '/images/projects/project_5.png',
    descriptionLeft: 'Ein wegweisendes Kulturmuseum mit fließender Betonarchitektur, das neue Maßstäbe in der Ausstellungsgestaltung setzt.',
    descriptionRight: 'Die organische Formgebung schafft ein einzigartiges Raumgefühl und eine perfekte Bühne für zeitgenössische Kunst.'
  },
  {
    id: 'p6',
    title: 'Green Tower',
    subtitle: 'Finanzdistrikt',
    year: '2028',
    type: 'Hochhaus',
    size: '32.000 qm',
    area: 'Mixed Use',
    image: '/images/projects/project_6.png',
    descriptionLeft: 'Ein ökologisches Holzhochhaus mit vertikalen Gärten, das urbane Dichte mit nachhaltiger Bauweise verbindet.',
    descriptionRight: 'Neben Büroflächen beherbergt der Turm auch öffentliche Grünflächen, Cafés und eine Aussichtsplattform.'
  },
  {
    id: 'p7',
    title: 'Forschungslabor',
    subtitle: 'Campus',
    year: '2025',
    type: 'Bildung',
    size: '8.800 qm',
    area: 'Research Facility',
    image: '/images/projects/project_7.png',
    descriptionLeft: 'Ein futuristisches Forschungsgebäude, das höchste technologische Anforderungen mit einer inspirierenden Arbeitsumgebung vereint.',
    descriptionRight: 'Die hochmodernen Labore sind modular aufgebaut und bieten maximale Flexibilität für zukünftige Innovationen.'
  },
  {
    id: 'p8',
    title: 'Flagship Store',
    subtitle: 'Einkaufsstraße',
    year: '2024',
    type: 'Retail',
    size: '2.100 qm',
    area: 'Luxury Retail',
    image: '/images/projects/project_8.png',
    descriptionLeft: 'Ein exklusiver Flagship-Store mit einer minimalistischen Fassade aus Naturstein und großflächiger Verglasung.',
    descriptionRight: 'Das durchdachte Beleuchtungskonzept und hochwertige Materialien schaffen ein einzigartiges Einkaufserlebnis.'
  }
];

export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (activeProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  const { contextSafe } = useGSAP({ scope: container });

  // Sticky scroll animation
  useGSAP(() => {
    gsap.set('.overlay__inner', { xPercent: -100 });

    const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
    cards.forEach((card, i) => {
      // Animate the entire card (image + badges) coming in
      gsap.fromTo(`.content-img-wrap-${i}`, 
        { yPercent: 20, rotation: 10, scale: 0.85, filter: 'contrast(150%)' },
        { 
          yPercent: 0, 
          rotation: 0, 
          scale: 1, 
          filter: 'contrast(100%)',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom', // When this card starts entering from bottom
            end: 'top top',      // When this card reaches top of screen
            scrub: true
          }
        }
      );

      // Slide this card out when the NEXT card on the SAME side scrolls in.
      // Since they alternate sides (0=right, 1=left, 2=right, 3=left), the next card on the same side is i + 2.
      const nextCardOnSameSide = cards[i + 2];
      if (nextCardOnSameSide) {
        gsap.to(card, {
          yPercent: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCardOnSameSide,
            start: 'top bottom', // Starts when the replacing card reaches the bottom
            end: 'top top',      // Animates until the replacing card reaches the top
            scrub: true
          }
        });
      }
    });
  }, { scope: container });

  const handleMouseEnter = contextSafe((index: number) => {
    if (activeProject !== null) return;
    gsap.to(`.card-overlay-${index}`, { opacity: 1, duration: 0.3 });
    gsap.to(`.card-view-btn-${index}`, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });
  });

  const handleMouseLeave = contextSafe((index: number) => {
    if (activeProject !== null) return;
    gsap.to(`.card-overlay-${index}`, { opacity: 0, duration: 0.3 });
    gsap.to(`.card-view-btn-${index}`, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
  });

  const openPreview = contextSafe((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveProject(index);

    gsap.timeline({
      defaults: { duration: 1.1, ease: 'expo' },
      onStart: () => {
        gsap.set(`.preview-img-${index}`, { xPercent: 100 });
        gsap.set(`.preview-img-wrap-${index}`, { xPercent: -102, opacity: 0 });
        gsap.set(`.preview-slide-text-${index}`, { yPercent: 100 });
        gsap.set(`.preview-desc-${index}`, { yPercent: 15, opacity: 0 });
        gsap.set('.preview__back', { x: '+=15%', opacity: 0 });
      },
      onComplete: () => setIsAnimating(false)
    })
    .addLabel('start', 0)
    .addLabel('preview', 'start+=0.3')
    .to('.overlay__inner', {
      ease: 'power2',
      startAt: { xPercent: -100 },
      xPercent: 0
    }, 'start')
    .to([`.preview-img-${index}`, `.preview-img-wrap-${index}`], {
      xPercent: 0,
    }, 'preview')
    .to(`.preview-img-wrap-${index}`, {
      opacity: 1,
    }, 'preview')
    .to(`.preview-slide-text-${index}`, {
      yPercent: 0,
      stagger: 0.05,
    }, 'preview')
    .to(`.preview-desc-${index}`, {
      ease: 'power2',
      opacity: 1,
      yPercent: 0,
      stagger: 0.05,
    }, 'preview')
    .to('.preview__back', {
      ease: 'power2',
      opacity: 1,
      x: '-=15%'
    }, 'preview');
  });

  const closePreview = contextSafe(() => {
    if (isAnimating || activeProject === null) return;
    setIsAnimating(true);

    const index = activeProject;

    gsap.timeline({
      defaults: { duration: 1, ease: 'power4' },
      onComplete: () => {
        setActiveProject(null);
        setIsAnimating(false);
      }
    })
    .addLabel('start', 0)
    .to('.preview__back', {
      ease: 'power2',
      opacity: 0
    }, 'start')
    .to(`.preview-desc-${index}`, {
      ease: 'power2',
      opacity: 0,
      yPercent: 15
    }, 'start')
    .to(`.preview-slide-text-${index}`, {
      yPercent: 100
    }, 'start')
    .to(`.preview-img-${index}`, {
      xPercent: -100,
    }, 'start')
    .to(`.preview-img-wrap-${index}`, {
      xPercent: 100,
      opacity: 1
    }, 'start')
    .to('.overlay__inner', {
      ease: 'power2',
      xPercent: 100,
    }, 'start+=0.4');
  });

  return (
    <section ref={container} className="relative py-32 px-6 max-w-[1400px] mx-auto min-h-screen" id="projects">
      <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <RevealText 
          text="Unsere Projekte" 
          as="h2"
          className="text-5xl md:text-7xl font-bold text-black tracking-tight"
        />
        <FadeInUp delay={0.3}>
          <CTAButton text="Alle ansehen" href="/projekte" className="shadow-2xl shadow-[#FF3131]/20" />
        </FadeInUp>
      </div>

      {/* Stacked Sticky Projects */}
      <div className={`relative w-full z-10 transition-opacity duration-300 ${activeProject !== null ? 'pointer-events-none' : ''}`}>
        {PROJECTS_DATA.slice(0, 4).map((project, index) => (
          <div 
            key={project.id} 
            className={`project-card sticky top-0 w-full lg:w-1/2 h-[50vh] lg:h-screen group cursor-pointer [perspective:1000px] p-4 pt-20 md:p-8 md:pt-24 lg:p-12 lg:pt-32 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}
          >
            <div 
              className={`content-img-wrap-${index} w-full h-full relative overflow-hidden rounded-[20px] will-change-transform shadow-2xl`}
              onClick={() => openPreview(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Image Container */}
              <div className={`absolute inset-0 w-full h-full will-change-transform`}>
                <div 
                  className={`content-img-${index} absolute inset-0 bg-cover bg-center will-change-transform origin-center`}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              {/* Hover Dark Overlay */}
              <div className={`card-overlay-${index} absolute inset-0 bg-black/40 opacity-0 will-change-transform`} />

              {/* Hover View Button */}
              <div className={`card-view-btn-${index} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90 will-change-transform bg-[#FF3131] rounded-md px-6 py-3 flex items-center gap-2 text-white font-semibold tracking-wide shadow-xl shadow-[#FF3131]/30 z-20`}>
                Ansehen
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </div>

              {/* Top Info Bars */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                {/* Location Badge */}
                <div className="backdrop-blur-xl bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2 border border-white/30 text-white shadow-lg">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-sm">{project.subtitle}</span>
                </div>
                
                {/* Year Badge */}
                <div className="backdrop-blur-xl bg-white/20 rounded-lg px-4 py-2 border border-white/30 text-white shadow-lg">
                  <span className="font-medium text-sm">{project.year}</span>
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-5 md:p-6 border border-white/30 shadow-lg">
                  {/* Title */}
                  <h3 className="text-white text-2xl md:text-3xl font-medium mb-4 md:mb-5 tracking-tight">{project.title}</h3>
                  
                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/30 mb-4 md:mb-5" />
                  
                  {/* Details */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-white/90 text-sm md:text-base">
                      <span className="font-medium">{project.type}</span>
                      <div className="w-[1px] h-4 bg-white/40" />
                      <span className="font-medium text-white/80">{project.area}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                      <Expand className="w-4 h-4 opacity-80" />
                      <span className="font-medium">{project.size}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scrolling Ticker */}
      <Ticker className="mt-24 md:mt-32 border-t border-b border-black/5" />

      {/* --- Overlay & Previews --- */}

      {/* Background Overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none will-change-transform">
        <div className="overlay__inner w-full h-full bg-[#131312] absolute top-0 left-0" />
      </div>

      {/* Preview Container */}
      <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center text-[#fffaea] ${activeProject !== null ? 'pointer-events-auto' : ''}`}>
        
        {PROJECTS_DATA.slice(0, 4).map((project, index) => (
          <div 
            key={`preview-${project.id}`}
            className={`preview-item-grid absolute inset-0 w-full h-full p-8 pt-16 md:pt-8 opacity-0 will-change-transform ${activeProject === index ? 'opacity-100 z-10' : 'z-0'}`}
          >
            {/* Image */}
            <div className="preview__item-img-outer self-center justify-self-center w-[60vw] max-w-[800px] h-[60vh] md:h-[100%] md:w-[36vw] col-span-full row-span-full" style={{ gridArea: '1 / 1 / -1 / -1' }}>
              <div className={`preview-img-wrap-${index} w-full h-full relative overflow-hidden will-change-transform rounded-2xl`}>
                <div 
                  className={`preview-img-${index} w-full h-full bg-cover bg-center will-change-transform`}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
            </div>

            {/* Huge Title (mixed blend over image) */}
            <h2 className="preview__item-title self-center justify-self-center text-[clamp(4rem,18vw,14rem)] font-light m-0 leading-none will-change-transform pt-[1vw] overflow-hidden mix-blend-difference" style={{ gridArea: 'title', zIndex: 10 }}>
              <span className={`preview-slide-text-${index} inline-block text-[#ff3131] font-bold will-change-transform`}>{project.title}</span>
            </h2>

            {/* Subtitle */}
            <h3 className="justify-self-center relative font-light m-0 text-white uppercase tracking-widest overflow-hidden text-xl md:text-2xl mt-4 md:mt-0" style={{ gridArea: 'subtitle' }}>
              <span className={`preview-slide-text-${index} inline-block will-change-transform`}>{project.subtitle}</span>
            </h3>

            {/* Year */}
            <span className="justify-self-center relative overflow-hidden uppercase tracking-widest text-sm text-white/50" style={{ gridArea: 'meta' }}>
              <span className={`preview-slide-text-${index} inline-block will-change-transform`}>{project.year}</span>
            </span>

            {/* Left Box */}
            <div className="p-4 relative max-w-[450px] will-change-transform justify-self-center md:justify-self-start text-center md:text-left" style={{ gridArea: 'box-left' }}>
              <h3 className="m-0 font-normal text-white uppercase tracking-widest mb-2 overflow-hidden">
                <span className={`preview-desc-${index} inline-block will-change-transform opacity-0`}>Details</span>
              </h3>
              <p className={`preview-desc-${index} text-sm md:text-base opacity-0 will-change-transform text-white/70`}>
                {project.descriptionLeft}
              </p>
            </div>

            {/* Right Box */}
            <div className="p-4 relative max-w-[450px] will-change-transform justify-self-center md:justify-self-end text-center md:text-right" style={{ gridArea: 'box-right' }}>
              <h3 className="m-0 font-normal text-white uppercase tracking-widest mb-2 overflow-hidden">
                <span className={`preview-desc-${index} inline-block will-change-transform opacity-0`}>Übersicht</span>
              </h3>
              <p className={`preview-desc-${index} text-sm md:text-base opacity-0 will-change-transform text-white/70`}>
                {project.descriptionRight}
              </p>
            </div>
          </div>
        ))}

        {/* Back Button */}
        <button 
          className={`preview__back absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-transparent border-none p-4 cursor-pointer opacity-0 ${activeProject !== null ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-label="Zurück"
          onClick={closePreview}
        >
          <svg width="100px" height="18px" viewBox="0 0 50 9" className="stroke-white stroke-[1px] hover:stroke-[#ff3131] transition-colors">
            <path vectorEffect="non-scaling-stroke" fill="none" d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
          </svg>
        </button>

      </div>
    </section>
  );
}
