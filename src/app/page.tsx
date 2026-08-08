import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Steps } from '@/components/sections/Steps';
import { CTACounter } from '@/components/sections/CTACounter';
import { Testimonials } from '@/components/sections/Testimonials';
import { Blog } from '@/components/sections/Blog';
import { ProjectIntake } from '@/components/sections/ProjectIntake';
import { HeroFramed } from '@/components/sections/HeroFramed';
import { LogoTicker } from '@/components/ui/LogoTicker';

export default function Home() {
  return (
    <div className="bg-[#F2F0EC] text-black">
      <HeroFramed />
      <LogoTicker />
      <About />
      <Services />
      <Projects />
      <CTACounter />
      <Steps />
      <Testimonials />
      <Blog />
      <ProjectIntake />
    </div>
  );
}
