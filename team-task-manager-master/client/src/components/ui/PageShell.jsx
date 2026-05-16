import { motion } from 'framer-motion';
import { fadeUp, pageTransition } from '../../utils/animations';

export default function PageShell({ eyebrow, title, description, actions, children, className = '' }) {
  return (
    <motion.section {...pageTransition} className={`space-y-6 ${className}`}>
      {(title || description || actions) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">
                {eyebrow}
              </p>
            )}
            {title && <h1 className="text-2xl font-bold text-slate-950 dark:text-white md:text-3xl">{title}</h1>}
            {description && <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
          </motion.div>
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </motion.section>
  );
}
