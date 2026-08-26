import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type BlurFadeProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  offset?: number;
};

export function BlurFade({
  delay = 0,
  offset = 12,
  children,
  className,
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      {...omit(props, ["className"])}
      className={cn(
        "transition duration-700",
        visible ? "translate-y-0 opacity-100 blur-0" : "opacity-0 blur-md",
        className,
      )}
      style={{
        ...get(props, "style"),
        transform: visible ? "translateY(0)" : `translateY(${offset}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default BlurFade;
