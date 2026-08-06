import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Steps } from '@/components/sections/Steps';
import { CTACounter } from '@/components/sections/CTACounter';
import { Testimonials } from '@/components/sections/Testimonials';
import { Blog } from '@/components/sections/Blog';
import { ProjectIntake } from '@/components/sections/ProjectIntake';

export default function Home() {
  return (
    <div className="bg-[#fffcf4] text-black">
      <Hero />
      <About />
      <Projects />
      <CTACounter />
      <Steps />
      <Testimonials />
      <Blog />
      <ProjectIntake />
    </div>
  );
}
