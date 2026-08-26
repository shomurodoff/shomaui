import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import { get, map, range } from "lodash";

import { cn } from "#/lib/utils";

export type MeteorsProps = HTMLAttributes<HTMLDivElement> & {
  count?: number;
};

export function Meteors({
  count = 10,
  children,
  className,
  ...props
}: MeteorsProps) {
  const meteors = useMemo(
    () =>
      map(range(count), (index) => ({
        id: index,
        left: (index * 23) % 105,
        delay: (index % 9) * 0.55,
        duration: 2.8 + (index % 4) * 0.55,
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
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {map(meteors, (meteor) => (
          <span
            key={get(meteor, "id")}
            className="absolute top-[-10%] h-px w-20 -rotate-45 bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-70 [animation:shomaui-meteor_linear_infinite]"
            style={
              {
                left: `${get(meteor, "left", 0)}%`,
                animationDelay: `${get(meteor, "delay", 0)}s`,
                animationDuration: `${get(meteor, "duration", 3)}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Meteors;
