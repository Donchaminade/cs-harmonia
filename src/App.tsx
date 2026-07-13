import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  School, 
  Award, 
  BookOpen, 
  ArrowRight, 
  GraduationCap, 
  Star, 
  CheckCircle, 
  CalendarRange, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

import Navbar from './components/Navbar';
import HeroSlideshow from './components/HeroSlideshow';
import AboutUs from './components/AboutUs';
import SchoolPrograms from './components/SchoolPrograms';
import SchoolFacilities from './components/SchoolFacilities';
import AdmissionForm from './components/AdmissionForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import SchoolLogo from './components/SchoolLogo';
import { SCHOOL_INFO, GRADES } from './data/schoolData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigation = (tabId: string) => {
    setCurrentTab(tabId);
  };

  // Render current tab/page content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return renderHomeView();
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AboutUs />
          </motion.div>
        );
      case 'cycles':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SchoolPrograms />
          </motion.div>
        );
      case 'facilities':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SchoolFacilities />
          </motion.div>
        );
      case 'admissions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdmissionForm />
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminPanel />
          </motion.div>
        );
      default:
        return renderHomeView();
    }
  };

  // Home View Content
  const renderHomeView = () => {
    return (
      <div className="space-y-16 pb-12">
        {/* 1. Hero Slideshow banner */}
        <HeroSlideshow 
          onPreRegisterClick={() => setCurrentTab('admissions')} 
          onExploreClick={() => setCurrentTab('cycles')} 
        />

        {/* 2. Crest and Motto Presentation Card */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-30">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
            <div className="bg-brand-blue-50/50 p-4 rounded-full border border-brand-blue-100 shrink-0">
              <SchoolLogo size={110} />
            </div>
            
            <div className="space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue-900 font-display">
                  {SCHOOL_INFO.name}
                </h2>
                <p className="text-brand-gold-600 font-mono text-xs sm:text-sm font-bold tracking-widest mt-1 uppercase">
                  Devise : {SCHOOL_INFO.motto}
                </p>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                Situé à Lomé Adetikopé, l'établissement Harmonia est un complexe scolaire moderne guidé par des valeurs de rigueur académique, d'épanouissement individuel et de respect des règles morales. Nous offrons des infrastructures adaptées de la maternelle au lycée.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-700 font-mono pt-1">
                <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand-gold-500" />
                  Travail Rigoureux
                </span>
                <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand-gold-500" />
                  Discipline Exemplaire
                </span>
                <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brand-gold-500" />
                  Excellence Académique
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Academic Levels Section Grid (Matches actual banner layout) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-brand-gold-600 font-mono text-xs font-bold uppercase tracking-widest bg-brand-gold-500/10 px-3 py-1 rounded-full">
              Nos Sections d'Études
            </span>
            <h3 className="text-3xl font-extrabold text-brand-blue-900 tracking-tight mt-3 font-display">
              Un Parcours Vers la Réussite
            </h3>
            <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light">
              Du premier éveil de la maternelle aux diplômes officiels du baccalauréat scientifique ou littéraire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Box 1: Kindergarten */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="h-36 rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400"
                    alt="Jardin d'enfants"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-blue-900/10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-brand-blue-900 text-lg font-display">Jardin d'enfants</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Maternelle (Petite, Moyenne et Grande section) axée sur l'éveil bilingue précoce et l'initiation de l'autonomie créative.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => { setCurrentTab('cycles'); }}
                  className="w-full py-2 bg-slate-50 hover:bg-brand-blue-900 hover:text-white border border-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1"
                >
                  <span>Voir le programme</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 2: Primary */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="h-36 rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400"
                    alt="Cours Primaire"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-blue-900/10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-brand-blue-900 text-lg font-display">Cours Primaire</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    CP1 à CM2. Maîtrise fondamentale des langues, du calcul et introduction pratique aux outils informatiques modernes.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => { setCurrentTab('cycles'); }}
                  className="w-full py-2 bg-slate-50 hover:bg-brand-blue-900 hover:text-white border border-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1"
                >
                  <span>Voir le programme</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 3: College */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="h-36 rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400"
                    alt="Le College"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-blue-900/10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-brand-blue-900 text-lg font-display">Le Collège</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    6ème à 3ème. Formation d'excellence solide pour la préparation active et rigoureuse de l'examen national du BEPC.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => { setCurrentTab('cycles'); }}
                  className="w-full py-2 bg-slate-50 hover:bg-brand-blue-900 hover:text-white border border-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1"
                >
                  <span>Voir le programme</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 4: Lycee (Bientot Disponible) */}
            <div className="bg-brand-blue-900/5 rounded-2xl border border-dashed border-brand-blue-900/20 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="h-36 rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400"
                    alt="Le Lycee"
                    className="w-full h-full object-cover grayscale opacity-70"
                  />
                  <div className="absolute inset-0 bg-brand-blue-900/40 flex items-center justify-center">
                    <span className="bg-brand-gold-400 text-brand-blue-950 text-[10px] font-black tracking-widest font-mono py-1 px-3.5 rounded-full uppercase shadow">
                      Disponible Bientôt
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-brand-blue-900/70 text-lg font-display">Le Lycée</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Séries A4 & D. Parcours scientifique et littéraire guidé vers le baccalauréat pour l'entrée des grandes universités.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => { setCurrentTab('admissions'); }}
                  className="w-full py-2 bg-brand-gold-500/10 hover:bg-brand-gold-500 text-brand-blue-950 font-bold text-xs rounded-lg transition-all border border-brand-gold-500/30 flex items-center justify-center gap-1"
                >
                  <span>Pré-inscriptions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quick Statistics Banner (Chiffres Clés) */}
        <section className="bg-brand-blue-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10 max-w-4xl mx-auto">
              <div className="p-4 space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-brand-gold-400 font-mono">100%</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Réussite Visée</p>
                <p className="text-[10px] text-slate-400">Encadrement personnalisé</p>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-brand-gold-400 font-mono">20+</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Enseignants Diplômés</p>
                <p className="text-[10px] text-slate-400">Excellents pédagogues de Lomé</p>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-brand-gold-400 font-mono">15</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Moyenne Élèves</p>
                <p className="text-[10px] text-slate-400">Pour un suivi hyper-individuel</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Facilities Spotlight Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 max-w-5xl mx-auto">
            <div>
              <span className="text-brand-blue-900 font-mono text-xs font-bold uppercase tracking-widest bg-brand-blue-50 px-3 py-1 rounded-full">
                Vie Scolaire
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue-900 mt-2 font-display">
                Infrastructures d'Harmonia
              </h3>
            </div>
            <button
              onClick={() => setCurrentTab('facilities')}
              className="group text-sm font-bold text-brand-blue-900 flex items-center gap-1.5 hover:text-brand-gold-600 transition-colors cursor-pointer"
            >
              <span>Découvrir toutes les infrastructures</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Classrooms */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=500"
                  alt="Salles de classe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-1">
                <h4 className="font-bold text-brand-blue-900 font-display text-base">Grandes salles de classe</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Salles aérées et spacieuses, spécialement conçues pour favoriser la concentration naturelle de vos enfants.
                </p>
              </div>
            </div>

            {/* Canteen */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=500"
                  alt="La Cantine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-1">
                <h4 className="font-bold text-brand-blue-900 font-display text-base">Cantine Scolaire</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Menue saine, équilibrée et hygiénique validé nutritionnellement par notre équipe de cuisine dévouée.
                </p>
              </div>
            </div>

            {/* Computer lab */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=500"
                  alt="Salle Informatique"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-1">
                <h4 className="font-bold text-brand-blue-900 font-display text-base">Laboratoire Informatique</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Initiation numérique précoce, apprentissage de l'informatique fondamentale et de la citoyenneté digitale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Call to Action (CTA) Form teaser */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-blue-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl max-w-5xl mx-auto">
            {/* Geometric accents in background */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-gold-500/10 rounded-full blur-3xl -z-10" />
            
            <div className="max-w-2xl space-y-5">
              <span className="text-brand-gold-400 font-mono text-xs uppercase tracking-widest font-bold">Inscriptions Session 2026-2027</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Assurez l'Excellence Éducative de Votre Enfant Dès Aujourd'hui
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Remplissez notre formulaire d'admission en ligne pour initier votre inscription. Notre secrétaire général prendra contact avec vous dans la journée pour planifier l'entretien final.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentTab('admissions')}
                  className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-display font-extrabold py-3.5 px-8 rounded-full transition-all text-center shadow-lg hover:shadow-brand-gold-500/20 text-sm cursor-pointer"
                >
                  Remplir le Formulaire de Pré-inscription
                </button>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('registration-slip');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 py-3.5 px-8 rounded-full font-display font-semibold transition-all text-center text-sm"
                >
                  Nous poser une question
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header with custom contacts and logo */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 2. Main Page Content Section */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer containing contacts, location mini-form and directory */}
      <Footer onNavClick={handleNavigation} />
    </div>
  );
}
