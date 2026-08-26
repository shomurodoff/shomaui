import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function GlowHoverCard(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "group relative min-h-48 overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_50px_-20px_color-mix(in_oklch,var(--primary)_60%,transparent)]",
        className,
      )}
    />
  );
}

export default GlowHoverCard;
