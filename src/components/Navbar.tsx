import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';
import SchoolLogo from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'cycles', label: 'Nos Cycles' },
    { id: 'facilities', label: 'Infrastructures' },
    { id: 'admissions', label: 'Tarifs & Inscriptions' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100">
      {/* Top mini-bar for info */}
      <div className="bg-brand-blue-900 text-white text-xs py-2 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
          <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
            <span>+228 {SCHOOL_INFO.phones[0]}</span>
          </a>
          <span className="hidden sm:inline text-slate-400">|</span>
          <a href={`mailto:${SCHOOL_INFO.email}`} className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-brand-gold-400" />
            <span>{SCHOOL_INFO.email}</span>
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-brand-gold-400 shrink-0" />
            <span className="truncate max-w-[220px] sm:max-w-none">Adetikopé, Lomé</span>
          </div>
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm transition-colors border ${
              currentTab === 'admin'
                ? 'bg-brand-gold-500 text-brand-blue-900 border-brand-gold-500'
                : 'text-brand-gold-400 border-brand-gold-400/30 hover:bg-white/10'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>Portail Admin</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
          <SchoolLogo showText={true} size={54} />
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-display text-sm font-semibold transition-all relative py-2 ${
                currentTab === item.id
                  ? 'text-brand-blue-900 font-bold'
                  : 'text-slate-600 hover:text-brand-blue-900'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-brand-gold-500 rounded-full" />
              )}
            </button>
          ))}
          
          <button
            onClick={() => handleNavClick('admissions')}
            className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-900 font-display font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
          >
            Pré-inscription
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 hover:text-brand-blue-900 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-inner animate-in fade-in duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-display text-base font-semibold transition-colors ${
                  currentTab === item.id
                    ? 'bg-brand-blue-50 text-brand-blue-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-slate-100 px-4">
              <button
                onClick={() => handleNavClick('admissions')}
                className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-900 font-display font-bold text-center py-3 rounded-lg transition-colors shadow-sm"
              >
                Pré-inscription en Ligne
              </button>
            </div>
            
            {/* Direct Admin Link in Drawer */}
            <div className="pt-2 px-4">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-center py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-brand-blue-900" />
                <span>Administration de l'École</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
