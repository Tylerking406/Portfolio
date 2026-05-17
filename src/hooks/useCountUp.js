import { useEffect, useState, useRef } from "react";

export function useCountUp(target, duration = 2000, active = false, decimals = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const startVal = 0;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startVal + (target - startVal) * eased;
      setCount(parseFloat(value.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);

  return count;
}

export function formatStatValue(value, suffix = "") {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k${suffix}`;
  return `${Math.round(value)}${suffix}`;
}
