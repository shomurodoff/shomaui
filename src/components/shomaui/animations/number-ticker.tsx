import { useEffect, useState } from "react";
import { clamp, get, toNumber } from "lodash";

type NumberTickerProps = {
  value?: number;
  duration?: number;
  className?: string;
};

export function NumberTicker({
  value = 100,
  duration = 900,
  className,
}: NumberTickerProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const target = toNumber(value);
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = clamp((now - start) / duration, 0, 1);
      setCurrent(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return (
    <span className={get({ className }, "className")} aria-label={`${value}`}>
      {current.toLocaleString()}
    </span>
  );
}

export default NumberTicker;
