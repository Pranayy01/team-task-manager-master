import { motion } from 'framer-motion';

export default function ProgressRing({ value = 0, size = 88, stroke = 8, label, tone = 'violet' }) {
  const normalized = Math.min(100, Math.max(0, Math.round(value)));
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalized / 100) * circumference;
  const colors = {
    violet: '#8b5cf6',
    cyan: '#22d3ee',
    emerald: '#34d399',
    pink: '#ec4899',
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200 dark:text-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colors[tone] || colors.violet}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-lg font-bold text-slate-950 dark:text-white">{normalized}%</p>
        {label && <p className="text-[10px] font-medium uppercase text-slate-500 dark:text-slate-400">{label}</p>}
      </div>
    </div>
  );
}
