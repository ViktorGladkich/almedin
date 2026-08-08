'use client';

import { useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { lockScroll, unlockScroll } from '@/lib/lenis';
import { RevealText } from '@/components/animations/RevealText';
import { FadeInUp } from '@/components/animations/FadeInUp';
import { MapPin, Expand } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { Ticker } from '@/components/ui/Ticker';

const PROJECTS = [
  {
    id: 'p1',
    title: 'Bürokomplex',
    subtitle: 'Altstadt',
    year: '2025',
    type: 'Gewerbebau',
    size: '11.000 qm',
    area: 'Firmenzentrale',
    image: '/images/projects/project_1.png',
    descriptionLeft:
      'Ein modernes und nachhaltiges Bürogebäude im Herzen der historischen Altstadt. Perfekte Integration in die städtische Architektur.',
    descriptionRight:
      'Ausgestattet mit neuester Smart-Building-Technologie, flexiblen Arbeitsbereichen und einer begrünten Dachterrasse.',
  },
  {
    id: 'p2',
    title: 'Wohnquartier',
    subtitle: 'Elbufer',
    year: '2024',
    type: 'Wohnungsbau',
    size: '4.500 qm',
    area: 'Wohnanlage',
    image: '/images/projects/project_2.png',
    descriptionLeft:
      'Exklusives Wohnen direkt am Fluss. Hochwertige Materialien und lichtdurchflutete Räume schaffen ein einzigartiges Lebensgefühl.',
    descriptionRight:
      'Das Quartier umfasst 40 Wohneinheiten, Tiefgarage und private Gärten, alles unter Einhaltung höchster Energiestandards.',
  },
  {
    id: 'p3',
    title: 'Logistikzentrum',
    subtitle: 'Industriepark',
    year: '2026',
    type: 'Industriebau',
    size: '25.000 qm',
    area: 'Logistik',
    image: '/images/projects/project_3.png',
    descriptionLeft:
      'Ein hochmodernes Logistikzentrum mit optimierten Verkehrswegen und energieeffizienter Bauweise.',
    descriptionRight:
      'Die Anlage verfügt über intelligente Lagersysteme, großzügige Rangierflächen und ein nachhaltiges Energiemanagement.',
  },
  {
    id: 'p4',
    title: 'Villa am See',
    subtitle: 'Vorstadt',
    year: '2023',
    type: 'Privatbau',
    size: '850 qm',
    area: 'Einfamilienhaus',
    image: '/images/projects/project_4.png',
    descriptionLeft:
      'Eine exklusive Villa mit Panoramablick auf den See, die durch ihre klare Linienführung und zeitlose Eleganz besticht.',
    descriptionRight:
      'Das Gebäude bietet bodentiefe Fensterfronten, eine Sichtbeton-Treppe und maßgeschneiderte Innenausstattung.',
  },
];

export function Projects() {
  const container = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { contextSafe } = useGSAP({ scope: container });

  /* -- page lock ----------------------------------------------------------- */
  useEffect(() => {
    // `document.body.style.overflow = 'hidden'` does NOT lock the page while
    // Lenis runs: Lenis intercepts wheel and touch events and scrolls
    // programmatically, so it never consults the body's overflow. With a pinned
    // section above, an unlocked background lets the visitor scroll the pin out
    // from under the preview and exit somewhere else entirely.
    if (activeProject !== null) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [activeProject]);

  /* -- preview ------------------------------------------------------------- */
  const openPreview = contextSafe((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveProject(index);

    gsap
      .timeline({
        defaults: { duration: 1.1, ease: 'expo' },
        onStart: () => {
          gsap.set(`.preview-img-${index}`, { xPercent: 100 });
          gsap.set(`.preview-img-wrap-${index}`, { xPercent: -102, opacity: 0 });
          gsap.set(`.preview-slide-text-${index}`, { yPercent: 100 });
          gsap.set(`.preview-desc-${index}`, { yPercent: 15, opacity: 0 });
          gsap.set('.preview__back', { x: '15%', opacity: 0 });
        },
        onComplete: () => setIsAnimating(false),
      })
      .addLabel('start', 0)
      .addLabel('preview', 'start+=0.3')
      .to('.overlay__inner', { ease: 'power2', startAt: { xPercent: -100 }, xPercent: 0 }, 'start')
      .to([`.preview-img-${index}`, `.preview-img-wrap-${index}`], { xPercent: 0 }, 'preview')
      .to(`.preview-img-wrap-${index}`, { opacity: 1 }, 'preview')
      .to(`.preview-slide-text-${index}`, { yPercent: 0, stagger: 0.05 }, 'preview')
      .to(`.preview-desc-${index}`, { ease: 'power2', opacity: 1, yPercent: 0, stagger: 0.05 }, 'preview')
      .to('.preview__back', { ease: 'power2', opacity: 1, x: '0%' }, 'preview');
  });

  const closePreview = useCallback(
    contextSafe(() => {
      if (isAnimating || activeProject === null) return;
      setIsAnimating(true);
      const index = activeProject;

      gsap
        .timeline({
          defaults: { duration: 1, ease: 'power4' },
          onComplete: () => {
            setActiveProject(null);
            setIsAnimating(false);
          },
        })
        .addLabel('start', 0)
        .to('.preview__back', { ease: 'power2', opacity: 0 }, 'start')
        .to(`.preview-desc-${index}`, { ease: 'power2', opacity: 0, yPercent: 15 }, 'start')
        .to(`.preview-slide-text-${index}`, { yPercent: 100 }, 'start')
        .to(`.preview-img-${index}`, { xPercent: -100 }, 'start')
        .to(`.preview-img-wrap-${index}`, { xPercent: 100, opacity: 1 }, 'start')
        .to('.overlay__inner', { ease: 'power2', xPercent: 100 }, 'start+=0.4');
    }),
    [activeProject, isAnimating]
  );

  /* -- escape --------------------------------------------------------------- */
  useEffect(() => {
    if (activeProject === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePreview();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeProject, closePreview]);

  /* -- stacking scroll ------------------------------------------------------ */
  useGSAP(
    () => {
      gsap.set('.overlay__inner', { xPercent: -100 });
      if (prefersReducedMotion()) return;

      // Triggers read the MARKERS, never the cards.
      //
      // Each card is `position: sticky`, and ScrollTrigger measures an element
      // wherever it sits at refresh time. Refresh while a card is stuck and you
      // capture the stuck position instead of its position in the flow, so every
      // start/end derived from it is wrong. Harmless while refreshes were rare;
      // once a pinned section exists above, they happen often enough to hit it.
      //
      // The markers are zero-height siblings placed immediately before each
      // card, holding the card's true flow position and never moving.
      const markers = gsap.utils.toArray<HTMLElement>('.project-marker');

      markers.forEach((marker, i) => {
        // Transform only. The old version scrubbed `filter: contrast()`, which
        // forces a repaint every frame and cannot be composited.
        gsap.fromTo(
          `.content-img-wrap-${i}`,
          { yPercent: 18, rotation: 8, scale: 0.88 },
          {
            yPercent: 0,
            rotation: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: marker, start: 'top bottom', end: 'top top', scrub: true },
          }
        );

        // Cards alternate sides, so the card that replaces this one is i + 2.
        const replacer = markers[i + 2];
        if (replacer) {
          gsap.to(`.project-card-${i}`, {
            yPercent: -100,
            ease: 'none',
            scrollTrigger: { trigger: replacer, start: 'top bottom', end: 'top top', scrub: true },
          });
        }
      });

      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    },
    { scope: container }
  );

  const onCardKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPreview(index);
    }
  };

  return (
    <section
      ref={container}
      data-theme="light"
      id="projects"
      className="relative py-28 md:py-32 max-w-[1400px] mx-auto px-frame"
    >
      <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <RevealText
          text="Unsere Projekte"
          as="h2"
          className="m-0 font-display font-medium tracking-tight text-page-ink text-[clamp(2rem,4.5vw,4rem)]"
        />
        <FadeInUp delay={0.2}>
          <CTAButton text="Alle ansehen" href="/projekte" />
        </FadeInUp>
      </div>

      <div
        className={`relative w-full z-10 transition-opacity duration-300 ${
          activeProject !== null ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        {PROJECTS.map((project, index) => (
          <Fragment key={project.id}>
            <span className="project-marker block h-0 w-full" aria-hidden />

            <div
              className={`project-card-${index} sticky top-0 w-full lg:w-1/2 h-[52vh] lg:h-svh group cursor-pointer p-3 pt-20 md:p-8 md:pt-24 lg:p-12 lg:pt-32 ${
                index % 2 === 0 ? 'lg:ml-auto' : ''
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`${project.title} ansehen`}
                onKeyDown={(e) => onCardKey(e, index)}
                onClick={() => openPreview(index)}
                className={`content-img-wrap-${index} w-full h-full relative overflow-hidden rounded-[20px] will-change-transform outline-none shadow-[0_40px_80px_-30px_rgba(13,13,13,0.45)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
                  Ansehen
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>

                <div className="absolute top-5 left-5 right-5 z-10 flex justify-between items-start pointer-events-none">
                  <span className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/35 px-3.5 py-2 text-[12px] font-medium text-white">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.subtitle}
                  </span>
                  <span className="rounded-lg border border-white/15 bg-black/35 px-3.5 py-2 text-[12px] font-medium text-white">
                    {project.year}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
                  <div className="rounded-xl border border-white/12 bg-black/45 p-5 md:p-6">
                    <h3 className="m-0 text-xl md:text-2xl font-medium tracking-tight text-white">
                      {project.title}
                    </h3>
                    <div className="my-4 h-px w-full bg-white/20" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[13px] text-white/85">
                      <div className="flex items-center gap-3">
                        <span>{project.type}</span>
                        <span className="h-3.5 w-px bg-white/30" />
                        <span className="text-white/65">{project.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Expand className="w-3.5 h-3.5 opacity-70" />
                        {project.size}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <Ticker className="mt-20 md:mt-28" />

      {/* Modal layers.
          The page has a fixed frame at z-60 and a header above it, so the
          preview must sit above BOTH — at z-40/z-50 the cream border and the
          navigation painted on top of a fullscreen dark preview. */}
      <div className="fixed inset-0 z-[80] pointer-events-none will-change-transform">
        <div className="overlay__inner absolute top-0 left-0 w-full h-full bg-[#131312]" />
      </div>

      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center text-[#fffaea] ${
          activeProject !== null ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        role={activeProject !== null ? 'dialog' : undefined}
        aria-modal={activeProject !== null || undefined}
      >
        {PROJECTS.map((project, index) => (
          <div
            key={`preview-${project.id}`}
            className={`preview-item-grid absolute inset-0 w-full h-full p-8 pt-16 md:pt-8 transition-opacity duration-200 ${
              activeProject === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="self-center justify-self-center w-[60vw] max-w-[800px] h-[60vh] md:h-full md:w-[36vw] [grid-area:1/1/-1/-1]">
              <div className={`preview-img-wrap-${index} relative w-full h-full overflow-hidden rounded-2xl will-change-transform`}>
                <div
                  className={`preview-img-${index} w-full h-full bg-cover bg-center will-change-transform`}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
            </div>

            <h2 className="self-center justify-self-center m-0 overflow-hidden leading-none mix-blend-difference z-10 text-[clamp(3rem,14vw,12rem)] [grid-area:title]">
              <span className={`preview-slide-text-${index} inline-block font-bold text-accent will-change-transform`}>
                {project.title}
              </span>
            </h2>

            <h3 className="justify-self-center m-0 overflow-hidden font-light uppercase tracking-[0.2em] text-white text-lg md:text-2xl [grid-area:subtitle]">
              <span className={`preview-slide-text-${index} inline-block will-change-transform`}>
                {project.subtitle}
              </span>
            </h3>

            <span className="justify-self-center overflow-hidden uppercase tracking-[0.2em] text-[12px] text-white/50 [grid-area:meta]">
              <span className={`preview-slide-text-${index} inline-block will-change-transform`}>
                {project.year}
              </span>
            </span>

            <div className="relative max-w-[450px] p-4 justify-self-center md:justify-self-start text-center md:text-left [grid-area:box-left]">
              <h4 className="m-0 mb-2 overflow-hidden font-normal uppercase tracking-[0.2em] text-[11px] text-white">
                <span className={`preview-desc-${index} inline-block opacity-0 will-change-transform`}>
                  Details
                </span>
              </h4>
              <p className={`preview-desc-${index} m-0 text-[13px] md:text-[14px] leading-relaxed text-white/70 opacity-0 will-change-transform`}>
                {project.descriptionLeft}
              </p>
            </div>

            <div className="relative max-w-[450px] p-4 justify-self-center md:justify-self-end text-center md:text-right [grid-area:box-right]">
              <h4 className="m-0 mb-2 overflow-hidden font-normal uppercase tracking-[0.2em] text-[11px] text-white">
                <span className={`preview-desc-${index} inline-block opacity-0 will-change-transform`}>
                  Übersicht
                </span>
              </h4>
              <p className={`preview-desc-${index} m-0 text-[13px] md:text-[14px] leading-relaxed text-white/70 opacity-0 will-change-transform`}>
                {project.descriptionRight}
              </p>
            </div>
          </div>
        ))}

        <button
          className={`preview__back absolute bottom-8 left-1/2 -translate-x-1/2 z-[95] cursor-pointer border-none bg-transparent p-4 opacity-0 ${
            activeProject !== null ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          aria-label="Zurück"
          onClick={closePreview}
        >
          <svg width="100" height="18" viewBox="0 0 50 9" className="stroke-white transition-colors hover:stroke-accent">
            <path vectorEffect="non-scaling-stroke" fill="none" strokeWidth="1" d="m0 4.5 5-3m-5 3 5 3m45-3h-77" />
          </svg>
        </button>
      </div>
    </section>
  );
}