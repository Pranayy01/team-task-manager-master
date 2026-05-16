import { motion } from 'framer-motion';
import { panelPop } from '../../utils/animations';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  delay = 0,
  as = 'div',
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={panelPop}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={hover ? { y: -4, borderColor: 'rgba(167, 139, 250, 0.42)' } : undefined}
      className={`rounded-lg border border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl transition-all duration-200 dark:border-white/10 dark:bg-white/[0.075] dark:shadow-panel ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
