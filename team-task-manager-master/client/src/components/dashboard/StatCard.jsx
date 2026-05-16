import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function StatCard({ title, value, icon: Icon, tone = 'violet', trend, detail }) {
  const tones = {
    violet: 'from-primary-400/20 to-primary-500/5 text-primary-200 border-primary-300/30',
    cyan: 'from-cyan-400/20 to-cyan-500/5 text-cyan-200 border-cyan-300/30',
    emerald: 'from-emerald-400/20 to-emerald-500/5 text-emerald-200 border-emerald-300/30',
    pink: 'from-pink-400/20 to-pink-500/5 text-pink-200 border-pink-300/30',
    red: 'from-red-400/20 to-red-500/5 text-red-200 border-red-300/30',
    amber: 'from-amber-400/20 to-amber-500/5 text-amber-200 border-amber-300/30',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.075] dark:shadow-panel"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            <AnimatedCounter value={value} />
          </p>
          {trend && <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-300">{trend}</p>}
          {detail && <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{detail}</p>}
        </div>
        <div className={`rounded-lg border bg-gradient-to-br p-3 ${tones[tone] || tones.violet}`}>
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </div>
      </div>
    </motion.div>
  );
}
