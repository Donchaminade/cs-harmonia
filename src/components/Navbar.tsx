import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Moon, Sun, Phone, ArrowRight } from 'lucide-react';
import SchoolLogo from './SchoolLogo';
import { SCHOOL_INFO, tel } from '../data/schoolData';

export const NAV = [
  { id: 'ecole', label: "L'école" },
  { id: 'cycles', label: 'Cycles' },
  { id: 'vie-scolaire', label: 'Vie scolaire' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'contact', label: 'Contact' },
];

function useTheme() {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);
  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a192f' : '#fbfaf6');
  }, [dark]);
  return [!!dark, () => setDark((d) => !d)] as const;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [dark, toggle] = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ThemeBtn = (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-navy-900 ring-1 ring-navy-900/10 transition hover:bg-navy-900/5 dark:text-gold-400 dark:ring-white/15 dark:hover:bg-white/10"
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 shadow-[0_8px_30px_-12px_rgba(10,25,47,0.18)] backdrop-blur-xl dark:bg-navy-950/85' : 'bg-transparent'
        }`}
      >
        <nav aria-label="Navigation principale" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#accueil" className="shrink-0">
            <SchoolLogo size={44} showText />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === n.id ? 'text-navy-950 dark:text-white' : 'text-slate-600 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-navy-900/[0.07] dark:bg-white/10" transition={{ type: 'spring', stiffness: 260, damping: 24 }} />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {ThemeBtn}
            <a
              href="#admissions"
              className="hidden whitespace-nowrap rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-950 sm:inline-flex dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
            >
              Pré-inscription
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="grid h-10 w-10 place-items-center rounded-full text-navy-950 ring-1 ring-navy-900/10 lg:hidden dark:text-white dark:ring-white/15"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[60] bg-navy-950/60 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-[86%] max-w-sm flex-col bg-cream shadow-2xl lg:hidden dark:bg-navy-950"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div className="flex h-[72px] items-center justify-between border-b border-navy-900/10 px-5 dark:border-white/10">
                <SchoolLogo size={40} showText />
                <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-navy-900/10 dark:ring-white/15">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <motion.ul
                className="flex-1 space-y-1 overflow-y-auto px-3 py-6"
                initial="hidden" animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {NAV.map((n, i) => (
                  <motion.li key={n.id} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between whitespace-nowrap rounded-2xl px-4 py-3.5 text-lg font-semibold font-display ${
                        active === n.id ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950' : 'text-navy-950 hover:bg-navy-900/5 dark:text-white dark:hover:bg-white/5'
                      }`}
                    >
                      <span><span className="mr-3 text-xs font-medium opacity-60">0{i + 1}</span>{n.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="space-y-3 border-t border-navy-900/10 p-5 dark:border-white/10">
                <a href="#admissions" onClick={() => setOpen(false)} className="flex w-full items-center justify-center rounded-full bg-gold-500 py-3.5 font-semibold text-navy-950">
                  Pré-inscrire mon enfant
                </a>
                <a href={tel(SCHOOL_INFO.phones[1])} className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <Phone className="h-4 w-4" /> +228 {SCHOOL_INFO.phones[1]}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
