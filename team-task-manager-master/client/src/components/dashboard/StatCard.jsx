import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function StatCard({ title, value, icon: Icon, tone = 'violet', trend, detail }) {
  const tones = {
    violet: 'from-primary-500/20 to-primary-500/5 text-primary-600 border-primary-300/20 dark:text-primary-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-600 border-cyan-300/20 dark:text-cyan-400',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 border-emerald-300/20 dark:text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-600 border-amber-300/20 dark:text-amber-400',
    red: 'from-red-500/20 to-red-500/5 text-red-600 border-red-300/20 dark:text-red-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-lg border bg-gradient-to-br p-5 shadow-sm backdrop-blur-xl transition-all dark:shadow-panel ${tones[tone] || tones.violet}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
            <AnimatedCounter value={value} />
          </p>
          {trend && <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{trend}</p>}
          {detail && <p className="mt-2 text-xs text-slate-600 dark:text-slate-500">{detail}</p>}
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-current/20 bg-white/50 dark:bg-white/10`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
