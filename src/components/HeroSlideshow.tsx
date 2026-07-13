import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/schoolData';

interface HeroSlideshowProps {
  onPreRegisterClick: () => void;
  onExploreClick: () => void;
}

export default function HeroSlideshow({ onPreRegisterClick, onExploreClick }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] w-full overflow-hidden bg-brand-blue-950 flex items-center">
      {/* Background Slideshow images with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950/90 via-brand-blue-900/75 to-transparent z-10" />
            <img
              src={HERO_SLIDES[current].image}
              alt="School environment"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl">
          {/* Animated Accent Pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`accent-${current}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-brand-gold-500/20 border border-brand-gold-500/40 text-brand-gold-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{HERO_SLIDES[current].accentText}</span>
            </motion.div>
          </AnimatePresence>

          {/* Animated Heading */}
          <div className="h-[120px] sm:h-[140px] md:h-[180px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-white drop-shadow-md"
              >
                {HERO_SLIDES[current].title.split(" ").map((word, i) => {
                  const isGold = i >= 3 && i <= 5 && current === 0 || i >= 1 && i <= 2 && current === 1 || i >= 1 && i <= 2 && current === 2;
                  return (
                    <span key={i} className={isGold ? "text-brand-gold-400" : ""}>
                      {word}{" "}
                    </span>
                  );
                })}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Animated Subtitle */}
          <div className="h-[70px] sm:h-[60px] md:h-[80px] mt-2 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed"
              >
                {HERO_SLIDES[current].subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onPreRegisterClick}
              className="flex items-center justify-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-display font-extrabold text-sm sm:text-base px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-brand-gold-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ClipboardCheck className="w-5 h-5" />
              <span>Pré-inscrire mon enfant</span>
            </button>
            
            <button
              onClick={onExploreClick}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all border border-white/20 hover:border-white/40"
            >
              <span>Découvrir nos programmes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all border border-white/5 backdrop-blur-sm focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all border border-white/5 backdrop-blur-sm focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slideshow dots indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              current === index ? 'w-8 bg-brand-gold-500' : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
