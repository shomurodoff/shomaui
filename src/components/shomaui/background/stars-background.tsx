import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import { get, map, range } from "lodash";

import { cn } from "#/lib/utils";

export type StarsBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  count?: number;
  starColor?: string;
};

export function StarsBackground({
  count = 42,
  starColor = "currentColor",
  className,
  children,
  ...props
}: StarsBackgroundProps) {
  const stars = useMemo(
    () =>
      map(range(count), (index) => ({
        id: index,
        left: `${(index * 37) % 101}%`,
        top: `${(index * 61) % 97}%`,
        size: `${1 + (index % 3)}px`,
        delay: `${(index % 9) * 0.35}s`,
        duration: `${2.6 + (index % 5) * 0.45}s`,
      })),
    [count],
  );

  return (
    <div
      {...props}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl bg-slate-950 text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {map(stars, (star) => (
          <span
            key={get(star, "id")}
            className="absolute animate-pulse rounded-full opacity-70"
            style={
              {
                left: get(star, "left"),
                top: get(star, "top"),
                width: get(star, "size"),
                height: get(star, "size"),
                backgroundColor: starColor,
                animationDelay: get(star, "delay"),
                animationDuration: get(star, "duration"),
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default StarsBackground;
