import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function EmptyState({ icon: Icon = Sparkles, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center dark:border-white/10 dark:bg-white/[0.05]"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/10 text-primary-500 shadow-glow dark:text-primary-200">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
