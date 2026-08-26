import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export function GlassCard(props: GlassCardProps) {
  const className = get(props, "className");
  const glow = get(props, "glow", false);

  return (
    <div
      {...omit(props, ["className", "glow"])}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300",
        glow &&
          "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_15%_0%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_36%)] before:opacity-80",
        className,
      )}
    />
  );
}

export default GlassCard;
