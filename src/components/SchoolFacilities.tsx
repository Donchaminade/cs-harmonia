import { useState } from 'react';
import { motion } from 'motion/react';
import { FACILITIES } from '../data/schoolData';
import { ChevronRight, Sparkles, Building, Utensils, BookOpen, Monitor } from 'lucide-react';

export default function SchoolFacilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Icon mapping helper
  const getIcon = (id: string) => {
    switch(id) {
      case 'salles': return <Building className="w-5 h-5 text-brand-gold-500" />;
      case 'cantine': return <Utensils className="w-5 h-5 text-brand-gold-500" />;
      case 'librairie': return <BookOpen className="w-5 h-5 text-brand-gold-500" />;
      case 'informatique': return <Monitor className="w-5 h-5 text-brand-gold-500" />;
      default: return <Sparkles className="w-5 h-5 text-brand-gold-500" />;
    }
  };

  return (
    <div className="py-12 md:py-16 bg-slate-50/50 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-gold-600 font-mono text-sm font-bold uppercase tracking-widest bg-brand-gold-500/10 px-3 py-1 rounded-full">
            Notre Cadre de Vie
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
            Infrastructures Modernes & Adaptées
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base font-light">
            Une éducation de qualité exige un environnement propice. Découvrez les installations conçues pour la réussite et le confort de vos enfants.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FACILITIES.map((facility, index) => (
            <motion.div
              key={facility.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              {/* Facility Image Container */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
                <img
                  src={facility.image}
                  alt={facility.frenchTitle}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.06)' : 'scale(1)'
                  }}
                />
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                {/* Floating category banner */}
                <div className="absolute top-4 left-4 bg-brand-blue-900/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full z-20 flex items-center gap-1.5 border border-white/15 text-white">
                  {getIcon(facility.id)}
                  <span className="font-display font-bold text-xs uppercase tracking-wider">{facility.name}</span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 flex flex-col justify-between grow space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue-900 font-display">
                    {facility.frenchTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                {/* Bullets lists */}
                <div className="pt-2 border-t border-slate-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {facility.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
