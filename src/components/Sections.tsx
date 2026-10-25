import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, MapPin, ShieldCheck, Sparkles, Utensils, Monitor, Library } from 'lucide-react';
import SchoolLogo from './SchoolLogo';
import { Badge, Img, Reveal, SectionTitle, useCardVariants } from './Motion';
import { CYCLES, FACILITIES, GRADES, SCHOOL_INFO, VALUES } from '../data/schoolData';
import type { AcademicCycle } from '../types';

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };
  return (
    <section id="accueil" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gold-400/25 blur-3xl dark:bg-gold-500/10" />
        <div className="orb absolute top-40 right-[-120px] h-[480px] w-[480px] rounded-full bg-navy-900/15 blur-3xl [animation-delay:-5s] dark:bg-navy-800/40" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={item}><Badge>Inscriptions ouvertes 2026-2027</Badge></motion.div>
          <motion.h1 variants={item} className="mt-6 text-[2.6rem] font-bold leading-[1.05] text-navy-950 sm:text-6xl lg:text-[4.25rem] dark:text-white">
            Un cadre d'harmonie pour{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">grandir</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-gold-400/70 sm:h-4 dark:bg-gold-500/50" />
            </span>{' '}
            et réussir.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            De la maternelle au collège, le Complexe Scolaire Harmonia accompagne chaque enfant à Adetikopé (Lomé) avec exigence et bienveillance.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#admissions" className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-4 font-semibold text-white shadow-xl shadow-navy-900/20 transition hover:-translate-y-0.5 hover:bg-navy-950 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400">
              Pré-inscrire mon enfant <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#cycles" className="inline-flex items-center justify-center rounded-full px-7 py-4 font-semibold text-navy-950 ring-1 ring-navy-900/15 transition hover:bg-navy-900/5 dark:text-white dark:ring-white/20 dark:hover:bg-white/5">
              Découvrir nos cycles
            </a>
          </motion.div>
          <motion.dl variants={item} className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-navy-900/10 pt-6 dark:border-white/10">
            {[['2024', 'Année de création'], ['4', "Cycles d'études"], ['19', 'Niveaux de classe']].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-bold text-navy-950 dark:text-white">{v}</dd>
                <dd className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-300">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-950/20 ring-1 ring-navy-900/10">
            <Img name="salles" alt="Salle de classe lumineuse (photo d'illustration)" eager sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0" />
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl bg-white/15 p-4 text-white ring-1 ring-white/25 backdrop-blur-md">
              <MapPin className="h-5 w-5 shrink-0 text-gold-400" />
              <p className="text-sm leading-snug"><strong className="font-semibold">Adetikopé, Lomé</strong><br />Quartier Yevou</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.6 }}
            className="absolute -top-6 left-3 rounded-3xl bg-white p-3 sm:-left-8 shadow-xl ring-1 ring-navy-900/5 dark:bg-navy-900"
          >
            <SchoolLogo size={84} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.75 }}
            className="absolute -right-3 top-1/3 hidden rounded-2xl bg-gold-500 px-4 py-3 text-navy-950 shadow-xl sm:block"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider">Devise</p>
            <p className="font-display text-sm font-bold whitespace-nowrap">Travail · Discipline · Excellence</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  const { container, item } = useCardVariants();
  return (
    <section id="ecole" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle badge="L'école" title={<>Une école jeune, une ambition claire</>} />
            <Reveal>
              <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                <p>Fondé en {SCHOOL_INFO.foundedYear}, le Complexe Scolaire Harmonia est un établissement privé situé à Adetikopé, dans le quartier Yevou. Il réunit le jardin d'enfants, le primaire et le collège, et ouvrira bientôt un lycée (séries A4 et D).</p>
                <p>Notre devise, <strong className="font-semibold text-navy-950 dark:text-white">« {SCHOOL_INFO.motto} »</strong>, guide notre pédagogie : un cadre rigoureux, des effectifs maîtrisés et un vrai suivi de chaque élève.</p>
              </div>
            </Reveal>
          </div>
          <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid content-center gap-4">
            {VALUES.map((v, i) => (
              <motion.li key={v.title} variants={item} className="group flex gap-5 rounded-3xl bg-white p-6 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 dark:bg-white/[0.04] dark:ring-white/10">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 font-display text-lg font-bold text-gold-400">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold text-navy-950 dark:text-white">{v.title}</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{v.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export function Cycles() {
  const { container, item } = useCardVariants();
  return (
    <section id="cycles" className="bg-navy-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <Badge dark>Cycles d'études</Badge>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">De la petite section au baccalauréat</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">Quatre cycles pensés comme un parcours continu, avec les programmes officiels du Togo.</p>
        </Reveal>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(CYCLES) as AcademicCycle[]).map((k) => {
            const c = CYCLES[k];
            return (
              <motion.article key={k} variants={item} className="group flex flex-col overflow-hidden rounded-3xl bg-white/[0.05] ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/[0.08]">
                <div className="relative overflow-hidden">
                  <Img name={c.image} alt={`${c.title} (photo d'illustration)`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={`aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 ${c.soon ? 'grayscale-[40%]' : ''}`} />
                  {c.soon && <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-950">Bientôt</span>}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">{c.age} · {c.levels}</p>
                  <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-200">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />{h}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-xs text-slate-400">{GRADES.filter((g) => g.cycle === k).map((g) => g.name.replace(/ \(.*\)/, '')).join(' · ')}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const ICONS: Record<string, typeof BookOpen> = { salles: GraduationCap, cantine: Utensils, bibliotheque: Library, informatique: Monitor };

export function SchoolLife() {
  const { container, item } = useCardVariants();
  return (
    <section id="vie-scolaire" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle badge="Vie scolaire" title="Des espaces pensés pour apprendre" text="Des infrastructures simples, propres et sécurisées, au service de la concentration et du bien-être des élèves." />
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[250px]">
          {FACILITIES.map((f, i) => {
            const Icon = ICONS[f.id] ?? Sparkles;
            return (
              <motion.article key={f.id} variants={item} className={`group relative overflow-hidden rounded-3xl ring-1 ring-navy-900/5 dark:ring-white/10 ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : i === 3 ? 'lg:col-span-2' : ''}`}>
                <Img name={f.image} alt={`${f.name} (photo d'illustration)`} sizes="(min-width: 768px) 50vw, 100vw" className={`w-full object-cover transition duration-700 group-hover:scale-105 aspect-[4/3] lg:aspect-auto lg:h-full`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/55 to-navy-950/5" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-navy-950"><Icon className="h-5 w-5" /></span>
                  <h3 className="text-xl font-bold">{f.name}</h3>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-200">{f.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
        <Reveal className="mt-6 flex items-start gap-3 rounded-2xl bg-navy-900/5 p-5 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
          <ShieldCheck className="h-5 w-5 shrink-0 text-navy-900 dark:text-gold-400" />
          Cantine et transport scolaire sont proposés en option lors de l'inscription.
        </Reveal>
      </div>
    </section>
  );
}
