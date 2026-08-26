import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import { get, map, range } from "lodash";

import { cn } from "#/lib/utils";

export type FlickeringGridProps = HTMLAttributes<HTMLDivElement> & {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
};

export function FlickeringGrid({
  squareSize = 6,
  gridGap = 5,
  flickerChance = 0.18,
  children,
  className,
  ...props
}: FlickeringGridProps) {
  const cells = useMemo(
    () =>
      map(range(72), (index) => ({
        id: index,
        delay: `${(index % 11) * 0.19}s`,
        active: index % 7 === 0 || index % 13 === 0,
      })),
    [],
  );

  return (
    <div
      {...props}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border bg-background p-5",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 grid grid-cols-12 content-start gap-1.5 p-4 opacity-70"
        aria-hidden="true"
      >
        {map(cells, (cell) => (
          <span
            key={get(cell, "id")}
            className={cn(
              "aspect-square rounded-[2px] bg-primary/15",
              cell.active && "animate-pulse bg-primary/45",
            )}
            style={
              {
                animationDelay: get(cell, "delay"),
                animationDuration: `${2 + (get(cell, "id", 0) % 5) * flickerChance + 1}s`,
                width: squareSize,
                height: squareSize,
                margin: gridGap / 2,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default FlickeringGrid;
