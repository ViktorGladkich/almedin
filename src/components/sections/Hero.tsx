import { RevealText } from '@/components/animations/RevealText';
import { ScrollCarousel3D } from '@/components/animations/ScrollCarousel3D';

const SERVICES_CAROUSEL = [
  {
    id: 1,
    title: 'Allgemeiner Hochbau',
    description: 'Neubau von Wohn- und Geschäftsgebäuden mit höchstem Qualitätsanspruch.',
    image: '/images/hero_carousel_1.png',
  },
  {
    id: 2,
    title: 'Sanierung & Umbau',
    description: 'Fachgerechte Modernisierung und Revitalisierung von Bestandsgebäuden.',
    image: '/images/hero_carousel_2.png',
  },
  {
    id: 3,
    title: 'Projektmanagement',
    description: 'Ganzheitliche Bauleitung, Planung und transparente Kommunikation.',
    image: '/images/hero_carousel_3.png',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-[1400px] mx-auto overflow-hidden">
      {/* Top Hero Text */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full uppercase tracking-widest text-xs md:text-sm font-normal mb-12">
        <RevealText text="Von der Grundsteinlegung" className="text-[#4D4C49]" />
        <div className="my-4 md:my-0 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-neutral-300" />
          <RevealText text="BIS" className="text-[#4D4C49] font-medium" />
          <span className="w-12 h-[1px] bg-neutral-300" />
        </div>
        <RevealText text="zur finalen Schlüsselübergabe" className="text-[#4D4C49]" />
      </div>

      {/* Massive Middle Typography */}
      <div className="w-full flex items-start justify-center -mt-2">
        <h1 className="font-display font-semibold text-[11.5vw] xl:text-[158px] leading-[0.8] uppercase text-black m-0 p-0 tracking-tight whitespace-nowrap">
          BAU-EXZELLENZ
        </h1>
      </div>

      {/* Bottom Hero / Coordinates & 3D Carousel Trigger */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-end gap-12 mt-48 relative z-10">
        <div className="hidden xl:block text-neutral-400 font-mono text-sm">
          <p>N 51&deg; 3&apos; 1.44&quot;</p>
        </div>

        {/* The 3 Services Cards -> We use the ScrollCarousel3D */}
        <div className="w-full xl:w-2/3 h-[500px]">
          <ScrollCarousel3D items={SERVICES_CAROUSEL} fit={0.8} />
        </div>

        <div className="hidden xl:block text-neutral-400 font-mono text-sm text-right">
          <p>E 13&deg; 44&apos; 14.28&quot;</p>
        </div>
      </div>
    </section>
  );
}
