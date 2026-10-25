import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bus, CheckCircle2, Mail, MessageCircle, Utensils } from 'lucide-react';
import { CYCLES, EXTRA_FEES, GRADES, REGISTRATION_FEES, SCHOOL_INFO, fcfa } from '../data/schoolData';
import type { AcademicCycle } from '../types';
import { Reveal, SectionTitle } from './Motion';

const field = 'w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-navy-950 ring-1 ring-navy-900/15 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:bg-white/5 dark:text-white dark:ring-white/15 dark:focus:ring-gold-400';

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-950 dark:text-slate-200">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-300">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function buildWhatsApp(text: string) {
  return `https://wa.me/${SCHOOL_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
}
export function buildMail(subject: string, body: string) {
  return `mailto:${SCHOOL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Admissions() {
  const [cycle, setCycle] = useState<AcademicCycle>('primaire');
  const grades = GRADES.filter((g) => g.cycle === cycle);
  const [gradeId, setGradeId] = useState(grades[0].id);
  const [canteen, setCanteen] = useState(false);
  const [transport, setTransport] = useState(false);
  const [f, setF] = useState({ child: '', birth: '', parent: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const grade = GRADES.find((g) => g.id === gradeId) ?? grades[0];
  const total = useMemo(() => {
    const reg = REGISTRATION_FEES[cycle];
    const extras = (canteen ? EXTRA_FEES.canteenMonthly : 0) * EXTRA_FEES.monthsPerYear + (transport ? EXTRA_FEES.transportMonthly : 0) * EXTRA_FEES.monthsPerYear;
    return { reg, tuition: grade.tuitionFee, extras, sum: reg + grade.tuitionFee + extras };
  }, [cycle, grade, canteen, transport]);

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const message = () => [
    `Bonjour, je souhaite pré-inscrire mon enfant au ${SCHOOL_INFO.name}.`,
    `Élève : ${f.child.trim()}${f.birth ? ` (né(e) le ${new Date(f.birth).toLocaleDateString('fr-FR')})` : ''}`,
    `Classe demandée : ${grade.name} (${CYCLES[cycle].title})`,
    `Options : ${[canteen && 'cantine', transport && 'transport'].filter(Boolean).join(', ') || 'aucune'}`,
    `Parent : ${f.parent.trim()} · ${f.phone.trim()}${f.email ? ` · ${f.email.trim()}` : ''}`,
    f.message.trim() && `Message : ${f.message.trim()}`,
    `Estimation affichée sur le site : ${fcfa(total.sum)}`,
  ].filter(Boolean).join('\n');

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.child.trim().length < 2) e.child = "Indiquez le nom et le prénom de l'élève.";
    if (f.parent.trim().length < 2) e.parent = 'Indiquez votre nom.';
    if (!/^\+?[\d\s-]{8,16}$/.test(f.phone.trim())) e.phone = 'Numéro invalide (8 chiffres minimum).';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Adresse e-mail invalide.';
    setErrors(e);
    if (Object.keys(e).length) document.getElementById(Object.keys(e)[0])?.focus();
    return !Object.keys(e).length;
  };

  const submit = (ev: FormEvent, via: 'whatsapp' | 'email') => {
    ev.preventDefault();
    if (!validate()) return;
    const url = via === 'whatsapp' ? buildWhatsApp(message()) : buildMail(`Pré-inscription : ${f.child.trim()} (${grade.name})`, message());
    window.open(url, via === 'whatsapp' ? '_blank' : '_self', 'noopener');
    setSent(true);
  };

  const err = (k: string) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  return (
    <section id="admissions" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle badge="Admissions 2026-2027" title="Pré-inscrire votre enfant" text="Choisissez la classe, estimez les frais de l'année, puis envoyez votre demande directement au secrétariat par WhatsApp ou par e-mail." />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="h-full">
            <div className="sticky top-24 rounded-[2rem] bg-navy-950 p-6 text-white sm:p-8 dark:ring-1 dark:ring-white/10">
              <h3 className="text-xl font-bold">Estimation des frais</h3>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" role="radiogroup" aria-label="Cycle">
                {(Object.keys(CYCLES) as AcademicCycle[]).map((c) => (
                  <button key={c} type="button" role="radio" aria-checked={cycle === c} onClick={() => { setCycle(c); setGradeId(GRADES.find((g) => g.cycle === c)!.id); }}
                    className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition ${cycle === c ? 'text-navy-950' : 'text-slate-300 hover:bg-white/5'}`}>
                    {cycle === c && <motion.span layoutId="cycle-pill" className="absolute inset-0 -z-0 rounded-xl bg-gold-500" transition={{ type: 'spring', stiffness: 260, damping: 24 }} />}
                    <span className="relative">{CYCLES[c].title.replace("Jardin d'enfants", 'Maternelle').replace('Cours primaire', 'Primaire')}</span>
                  </button>
                ))}
              </div>
              <label htmlFor="grade" className="mt-6 block text-sm text-slate-300">Classe</label>
              <select id="grade" value={gradeId} onChange={(e) => setGradeId(e.target.value)} className="mt-1.5 w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-gold-400 [&>option]:text-navy-950">
                {grades.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
              {CYCLES[cycle].soon && <p className="mt-2 text-sm text-gold-400">Le lycée ouvre prochainement : pré-inscriptions possibles.</p>}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { on: canteen, set: setCanteen, label: 'Cantine', icon: Utensils, price: EXTRA_FEES.canteenMonthly },
                  { on: transport, set: setTransport, label: 'Transport', icon: Bus, price: EXTRA_FEES.transportMonthly },
                ].map((o) => (
                  <button key={o.label} type="button" aria-pressed={o.on} onClick={() => o.set(!o.on)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm ring-1 transition ${o.on ? 'bg-white/10 ring-gold-400' : 'ring-white/15 hover:bg-white/5'}`}>
                    <o.icon className={`h-4 w-4 shrink-0 ${o.on ? 'text-gold-400' : 'text-slate-300'}`} />
                    <span><span className="block font-medium">{o.label}</span><span className="text-xs text-slate-300">{fcfa(o.price)}/mois</span></span>
                  </button>
                ))}
              </div>
              <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                {[['Inscription', total.reg], ['Scolarité annuelle', total.tuition], ['Options (9 mois)', total.extras]].map(([l, v]) => (
                  <div key={l as string} className="flex justify-between"><dt className="text-slate-300">{l}</dt><dd className="tabular-nums">{fcfa(v as number)}</dd></div>
                ))}
                <div className="flex items-end justify-between pt-3">
                  <dt className="font-medium">Total estimé</dt>
                  <motion.dd key={total.sum} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold tabular-nums text-gold-400">{fcfa(total.sum)}</motion.dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">Montants indicatifs, à confirmer auprès du secrétariat. Scolarité payable en trois tranches.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form noValidate onSubmit={(e) => submit(e, 'whatsapp')} className="rounded-[2rem] bg-white p-6 ring-1 ring-navy-900/5 sm:p-8 dark:bg-white/[0.04] dark:ring-white/10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }} className="grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-navy-950">
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.span>
                    <h3 className="mt-5 text-2xl font-bold text-navy-950 dark:text-white">Votre demande est prête</h3>
                    <p className="mt-2 max-w-sm text-slate-600 dark:text-slate-300">Envoyez le message ouvert dans WhatsApp ou votre messagerie. Le secrétariat vous recontactera pour finaliser l'inscription.</p>
                    <button type="button" onClick={() => setSent(false)} className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold text-navy-950 ring-1 ring-navy-900/15 hover:bg-navy-900/5 dark:text-white dark:ring-white/20">Modifier la demande</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                    <Field id="child" label="Nom et prénom de l'élève *" error={errors.child}><input id="child" autoComplete="off" value={f.child} onChange={set('child')} className={field} {...err('child')} /></Field>
                    <Field id="birth" label="Date de naissance"><input id="birth" type="date" value={f.birth} onChange={set('birth')} className={field} /></Field>
                    <Field id="parent" label="Votre nom (parent / tuteur) *" error={errors.parent}><input id="parent" autoComplete="name" value={f.parent} onChange={set('parent')} className={field} {...err('parent')} /></Field>
                    <Field id="phone" label="Téléphone *" error={errors.phone}><input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+228 …" value={f.phone} onChange={set('phone')} className={field} {...err('phone')} /></Field>
                    <div className="sm:col-span-2"><Field id="email" label="E-mail (facultatif)" error={errors.email}><input id="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} className={field} {...err('email')} /></Field></div>
                    <div className="sm:col-span-2"><Field id="message" label="Message (facultatif)"><textarea id="message" rows={3} value={f.message} onChange={set('message')} className={field} /></Field></div>
                    <p className="text-sm text-slate-600 sm:col-span-2 dark:text-slate-300">Classe choisie : <strong className="text-navy-950 dark:text-white">{grade.name}</strong> · estimation {fcfa(total.sum)}</p>
                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-4 font-semibold text-white shadow-lg shadow-navy-900/20 hover:bg-navy-950 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
                      <MessageCircle className="h-5 w-5" /> Envoyer par WhatsApp
                    </motion.button>
                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button" onClick={(e) => submit(e, 'email')} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-navy-950 ring-1 ring-navy-900/15 hover:bg-navy-900/5 dark:text-white dark:ring-white/20 dark:hover:bg-white/5">
                      <Mail className="h-5 w-5" /> Envoyer par e-mail
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
