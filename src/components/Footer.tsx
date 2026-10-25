import SchoolLogo from './SchoolLogo';
import { NAV } from './Navbar';
import { SCHOOL_INFO, tel } from '../data/schoolData';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 dark:border-t dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="[&_span]:!text-white"><SchoolLogo size={56} showText /></div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{SCHOOL_INFO.slogan}. Jardin d'enfants, primaire, collège et bientôt lycée à Adetikopé, Lomé.</p>
          <p className="mt-4 text-sm font-semibold text-gold-400">{SCHOOL_INFO.motto}</p>
        </div>
        <nav aria-label="Pied de page">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-sm">{NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-gold-400">{n.label}</a></li>)}</ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SCHOOL_INFO.phones.map((p) => <li key={p}><a href={tel(p)} className="hover:text-gold-400">+228 {p}</a></li>)}
            <li><a href={`mailto:${SCHOOL_INFO.email}`} className="break-all hover:text-gold-400">{SCHOOL_INFO.email}</a></li>
            <li>{SCHOOL_INFO.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-400 sm:px-6 lg:px-8">© {new Date().getFullYear()} {SCHOOL_INFO.name}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
