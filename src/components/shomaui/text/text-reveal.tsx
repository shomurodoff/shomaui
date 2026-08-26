import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function TextReveal({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      {...omit(props, ["className"])}
      className={cn("inline-block overflow-hidden align-bottom", className)}
    >
      <span
        className={cn(
          "inline-block transition duration-700",
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
        style={{
          transitionDelay: `${get(props, "style.transitionDelay", "0ms")}`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default TextReveal;
