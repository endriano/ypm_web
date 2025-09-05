import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  label: string;
  duration?: number;
  delay?: number;
}

export function AnimatedCounter({ target, label, duration = 2, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let startTime: number;
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          
          setCount(Math.floor(progress * target));
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        requestAnimationFrame(animateCount);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, target, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      data-testid={`counter-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="counter text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="counter-value">
        {count}
      </div>
      <p className="text-sm md:text-base text-muted-foreground font-medium" data-testid="counter-label">
        {label}
      </p>
    </motion.div>
  );
}
