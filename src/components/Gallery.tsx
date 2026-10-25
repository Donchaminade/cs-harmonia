import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY } from '../data/schoolData';
import { Img, SectionTitle } from './Motion';

export default function Gallery() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const n = GALLERY.length;
  const go = useCallback((d: number) => { setDir(d); setI((v) => (v + d + n) % n); }, [n]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, reduce, i]);

  const at = (o: number) => GALLERY[(i + o + n) % n];

  return (
    <section id="galerie" className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="orb absolute left-1/4 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="orb absolute bottom-0 right-10 h-96 w-96 rounded-full bg-navy-800/60 blur-3xl [animation-delay:-7s]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle badge="Galerie" title="Un aperçu de la vie à Harmonia" center onDark />

        <div className="relative mx-auto flex h-[360px] max-w-5xl items-center justify-center sm:h-[460px]" role="region" aria-roledescription="carrousel" aria-label="Galerie photos">
          {[-1, 1].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => go(o)}
              tabIndex={-1}
              aria-hidden="true"
              className={`absolute hidden h-[70%] w-[34%] overflow-hidden rounded-3xl opacity-50 ring-1 ring-white/10 transition hover:opacity-70 md:block ${o < 0 ? 'left-0 -rotate-2' : 'right-0 rotate-2'}`}
            >
              <Img name={at(o).image} alt="" sizes="30vw" className="h-full w-full object-cover blur-[1px]" />
            </button>
          ))}

          <div className="relative z-10 h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/20 md:w-[62%]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={i}
                custom={dir}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1); }}
              >
                <Img name={at(0).image} alt={`${at(0).caption} (photo d'illustration)`} sizes="(min-width: 768px) 60vw, 100vw" className="h-full w-full select-none object-cover" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/25 backdrop-blur-xl">
                  <p className="font-display text-lg font-semibold">{at(0).caption}</p>
                  <p className="text-sm tabular-nums text-slate-200" aria-live="polite">{i + 1} / {n}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 active:scale-95">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1">
            {GALLERY.map((g, k) => (
              <button key={g.caption} type="button" onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Voir la photo ${k + 1} : ${g.caption}`} aria-current={k === i} className="grid h-6 min-w-6 place-items-center">
                <span className={`block h-2 rounded-full transition-all ${k === i ? 'w-8 bg-gold-400' : 'w-2 bg-white/40'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 active:scale-95">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">Photos d'illustration : les photos de l'établissement seront ajoutées prochainement.</p>
      </div>
    </section>
  );
}
