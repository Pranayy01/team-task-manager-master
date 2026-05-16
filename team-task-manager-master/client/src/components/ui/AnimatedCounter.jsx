import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export default function AnimatedCounter({ value = 0, className = '' }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, Number(value) || 0, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
