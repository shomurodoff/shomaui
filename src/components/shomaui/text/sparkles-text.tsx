import { Sparkles } from "lucide-react";
import { get, map, range } from "lodash";
import type { HTMLAttributes } from "react";

import { cn } from "#/lib/utils";

export function SparklesText({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={cn("relative inline-block", className)}>
      {children}
      <span
        className="pointer-events-none absolute -inset-3"
        aria-hidden="true"
      >
        {map(range(4), (index) => (
          <Sparkles
            key={index}
            className="absolute size-3 animate-pulse text-primary"
            style={{
              left: `${get([0, 92, 8, 82], index)}%`,
              top: `${get([5, 14, 70, 85], index)}%`,
              animationDelay: `${index * 0.35}s`,
            }}
          />
        ))}
      </span>
    </span>
  );
}

export default SparklesText;
