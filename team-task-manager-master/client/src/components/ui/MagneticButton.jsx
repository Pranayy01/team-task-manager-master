import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const variants = {
  primary:
    'border-primary-400/40 bg-primary-500 text-white shadow-glow hover:bg-primary-400',
  secondary:
    'border-white/10 bg-white/10 text-white hover:border-primary-300/50 hover:bg-white/15',
  light:
    'border-slate-200 bg-white text-slate-950 hover:border-primary-300 hover:text-primary-700',
};

export default function MagneticButton({
  children,
  to,
  icon: Icon,
  variant = 'primary',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const Component = to ? motion(Link) : motion.button;

  const handleMove = (event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Component
      ref={ref}
      to={to}
      type={to ? undefined : 'button'}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400/60 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </Component>
  );
}
