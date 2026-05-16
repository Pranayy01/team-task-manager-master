export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-300',
    primary: 'border-primary-300/40 bg-primary-500/10 text-primary-700 dark:text-primary-200',
    success: 'border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    warning: 'border-amber-300/40 bg-amber-500/10 text-amber-700 dark:text-amber-200',
    danger: 'border-red-300/40 bg-red-500/10 text-red-700 dark:text-red-200',
    cyan: 'border-cyan-300/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
