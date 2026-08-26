import { get, map, omit, range } from "lodash";
import type { HTMLAttributes } from "react";

import { cn } from "#/lib/utils";

export type ShimmerLoaderProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number;
};

export function ShimmerLoader({
  lines = 3,
  className,
  ...props
}: ShimmerLoaderProps) {
  return (
    <div
      {...omit(props, ["className"])}
      className={cn("grid gap-2", className)}
      aria-label="Loading"
    >
      {map(range(lines), (index) => (
        <div
          key={index}
          className={cn(
            "h-3 animate-pulse rounded-full bg-muted",
            index === lines - 1 ? "w-2/3" : "w-full",
          )}
          style={{ animationDelay: `${get([0, 80, 160], index % 3)}ms` }}
        />
      ))}
    </div>
  );
}

export default ShimmerLoader;
