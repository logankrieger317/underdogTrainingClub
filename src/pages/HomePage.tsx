import { Hero } from '../components/home/Hero';
import { Programs } from '../components/home/Programs';
import { Promise } from '../components/home/Promise';
import { Certifications } from '../components/home/Certifications';
import { CTA } from '../components/home/CTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <Programs />
      <Promise />
      <Certifications />
      <CTA />
    </>
  );
}
