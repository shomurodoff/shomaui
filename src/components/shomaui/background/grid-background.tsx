import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function GridBackground(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl border bg-background [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_9%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_9%,transparent)_1px,transparent_1px)] [background-size:32px_32px]",
        className,
      )}
    />
  );
}

export default GridBackground;
