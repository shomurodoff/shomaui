import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import { get, map, range } from "lodash";

import { cn } from "#/lib/utils";

export type BubbleBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  count?: number;
};

export function BubbleBackground({
  count = 18,
  children,
  className,
  ...props
}: BubbleBackgroundProps) {
  const bubbles = useMemo(
    () =>
      map(range(count), (index) => ({
        id: index,
        size: 18 + (index % 5) * 12,
        left: (index * 29) % 100,
        delay: (index % 8) * 0.45,
        duration: 6 + (index % 5),
      })),
    [count],
  );

  return (
    <div
      {...props}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl bg-sky-950 text-white",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {map(bubbles, (bubble) => (
          <span
            key={get(bubble, "id")}
            className="absolute bottom-[-15%] rounded-full border border-white/25 bg-white/10 blur-[.2px] [animation:shomaui-bubble_linear_infinite]"
            style={
              {
                left: `${get(bubble, "left", 0)}%`,
                width: get(bubble, "size", 20),
                height: get(bubble, "size", 20),
                animationDelay: `${get(bubble, "delay", 0)}s`,
                animationDuration: `${get(bubble, "duration", 7)}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BubbleBackground;
