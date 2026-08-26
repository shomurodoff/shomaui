import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function HexagonBackground(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl border bg-background [background-image:linear-gradient(30deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_12%,transparent_12.5%,transparent_87%,color-mix(in_oklch,var(--foreground)_10%,transparent)_87.5%,color-mix(in_oklch,var(--foreground)_10%,transparent)),linear-gradient(150deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_12%,transparent_12.5%,transparent_87%,color-mix(in_oklch,var(--foreground)_10%,transparent)_87.5%,color-mix(in_oklch,var(--foreground)_10%,transparent)),linear-gradient(30deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_12%,transparent_12.5%,transparent_87%,color-mix(in_oklch,var(--foreground)_10%,transparent)_87.5%,color-mix(in_oklch,var(--foreground)_10%,transparent)),linear-gradient(150deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_12%,transparent_12.5%,transparent_87%,color-mix(in_oklch,var(--foreground)_10%,transparent)_87.5%,color-mix(in_oklch,var(--foreground)_10%,transparent))] [background-position:0_0,0_0,20px_35px,20px_35px] [background-size:40px_70px]",
        className,
      )}
    />
  );
}

export default HexagonBackground;
