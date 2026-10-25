import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SCHOOL_INFO, tel } from '../data/schoolData';
import { Reveal, SectionTitle } from './Motion';
import { buildWhatsApp } from './Admissions';

export default function Contact() {
  const items = [
    { icon: MapPin, title: 'Adresse', body: <>{SCHOOL_INFO.location}<br /><span className="text-slate-600 dark:text-slate-300">{SCHOOL_INFO.locationDetail}</span></> },
    { icon: Phone, title: 'Téléphone', body: <span className="flex flex-col">{SCHOOL_INFO.phones.map((p) => <a key={p} href={tel(p)} className="hover:underline">+228 {p}</a>)}</span> },
    { icon: Mail, title: 'E-mail', body: <a href={`mailto:${SCHOOL_INFO.email}`} className="break-all hover:underline">{SCHOOL_INFO.email}</a> },
  ];
  return (
    <section id="contact" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle badge="Contact" title="Venez nous rencontrer" text="Le secrétariat vous accueille pour toute question sur les inscriptions, les frais ou la visite de l'établissement." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {items.map((it) => (
              <div key={it.title} className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-navy-900/5 dark:bg-white/[0.04] dark:ring-white/10">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-400"><it.icon className="h-5 w-5" /></span>
                <div className="min-w-0 text-navy-950 dark:text-white"><h3 className="font-semibold">{it.title}</h3><div className="mt-1 text-sm leading-relaxed">{it.body}</div></div>
              </div>
            ))}
            <a href={buildWhatsApp(`Bonjour, j'ai une question concernant le ${SCHOOL_INFO.name}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-4 font-semibold text-navy-950 transition hover:-translate-y-0.5 hover:bg-gold-400">
              <MessageCircle className="h-5 w-5" /> Écrire sur WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.1} className="min-h-[360px] overflow-hidden rounded-[2rem] ring-1 ring-navy-900/10 dark:ring-white/10">
            <iframe
              title="Carte : Complexe Scolaire Harmonia, Adetikopé"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SCHOOL_INFO.mapQuery)}&z=14&output=embed`}
              className="h-full min-h-[360px] w-full border-0 dark:opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
