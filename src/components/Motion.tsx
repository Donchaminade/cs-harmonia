import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function useCardVariants() {
  const reduce = useReducedMotion();
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } } };
  return { container, item };
}

export function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
        dark ? 'bg-white/10 text-gold-400 ring-1 ring-white/15' : 'bg-navy-900/5 text-navy-900 ring-1 ring-navy-900/10 dark:bg-white/10 dark:text-gold-400 dark:ring-white/15'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
      {children}
    </motion.span>
  );
}

export function SectionTitle({ badge, title, text, center = false, onDark = false }: { badge: string; title: ReactNode; text?: string; center?: boolean; onDark?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <Badge dark={onDark}>{badge}</Badge>
      <h2 className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${onDark ? 'text-white' : 'text-navy-950 dark:text-white'}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${onDark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>{text}</p>}
    </Reveal>
  );
}

export function Img({ name, alt, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false }: { name: string; alt: string; className?: string; sizes?: string; eager?: boolean }) {
  return (
    <img
      src={`/images/${name}-800.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width={800}
      height={533}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );
}
