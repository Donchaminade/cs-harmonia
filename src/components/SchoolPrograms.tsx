import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Baby, BookOpen, GraduationCap, Award, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { CYCLE_DETAILS } from '../data/schoolData';
import { AcademicCycle } from '../types';

export default function SchoolPrograms() {
  const [activeTab, setActiveTab] = useState<AcademicCycle>('jardin');

  const tabs = [
    { id: 'jardin' as AcademicCycle, label: "Jardin d'enfants", icon: Baby, color: 'text-amber-500 bg-amber-50' },
    { id: 'primaire' as AcademicCycle, label: "Cours Primaire", icon: BookOpen, color: 'text-blue-500 bg-blue-50' },
    { id: 'college' as AcademicCycle, label: "Le Collège", icon: GraduationCap, color: 'text-indigo-500 bg-indigo-50' },
    { id: 'lycee' as AcademicCycle, label: "Le Lycée", icon: Award, color: 'text-rose-500 bg-rose-50' },
  ];

  const imagesByTab: Record<AcademicCycle, string> = {
    jardin: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    primaire: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    college: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
    lycee: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
  };

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-blue-900 font-mono text-sm font-bold uppercase tracking-widest bg-brand-blue-100 px-3 py-1 rounded-full">
            Cycles d'Enseignement
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
            Nos Programmes Académiques
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base font-light">
            De l'éveil en maternelle à l'excellence des séries scientifiques et littéraires au lycée, découvrez le parcours pédagogique d'Harmonia.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-blue-900 text-white shadow-md scale-102'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/15 text-brand-gold-400' : tab.color}`}>
                  <IconComponent className="w-5 h-5" />
                </span>
                <span>{tab.label}</span>
                {tab.id === 'lycee' && (
                  <span className="text-[9px] bg-brand-gold-500 text-brand-blue-950 px-1.5 py-0.5 rounded-md font-mono uppercase font-black">
                    Bientôt
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/50 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-100"
          >
            {/* Column 1: Image & stats (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px]">
                <img
                  src={imagesByTab[activeTab]}
                  alt={CYCLE_DETAILS[activeTab].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Float Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-md border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Âge d'admission</p>
                  <p className="text-sm font-black text-brand-blue-900 font-display mt-0.5">{CYCLE_DETAILS[activeTab].age}</p>
                </div>
              </div>

              {/* Decorative dotted grid behind */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-gold-500/10 rounded-full blur-xl -z-10" />
            </div>

            {/* Column 2: Information and highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue-900 font-display">
                    {CYCLE_DETAILS[activeTab].title}
                  </h3>
                  {activeTab === 'lycee' && (
                    <span className="bg-amber-100 border border-amber-200 text-amber-800 text-xs font-black font-mono px-2.5 py-1 rounded-full uppercase">
                      Pré-inscriptions Ouvertes
                    </span>
                  )}
                </div>
                <p className="text-slate-600 font-light mt-4 text-sm sm:text-base leading-relaxed">
                  {CYCLE_DETAILS[activeTab].description}
                </p>
              </div>

              {/* Bullet highlights */}
              <div className="space-y-3.5 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-brand-gold-500 fill-brand-gold-500" />
                  Spécificités du cycle
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CYCLE_DETAILS[activeTab].highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <span className="p-0.5 rounded bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-slate-700 font-medium leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom trust seal */}
              <div className="p-4 bg-brand-blue-50/50 rounded-xl border border-brand-blue-100/30 text-xs text-brand-blue-900 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-blue-900 shrink-0" />
                <span className="font-semibold">
                  Programme conforme aux exigences du Ministère de l'Enseignement Primaire, Secondaire et Technique du Togo.
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
