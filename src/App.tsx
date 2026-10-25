import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import { About, Cycles, Hero, SchoolLife } from './components/Sections';
import Gallery from './components/Gallery';
import Admissions from './components/Admissions';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-950">Aller au contenu</a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <About />
        <Cycles />
        <SchoolLife />
        <Gallery />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
