import type { CSSProperties, HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type GradientBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  from?: string;
  to?: string;
};

export function GradientBackground({
  from = "rgba(56, 189, 248, .28)",
  to = "rgba(168, 85, 247, .2)",
  children,
  className,
  ...props
}: GradientBackgroundProps) {
  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl border bg-background",
        className,
      )}
      style={
        {
          ...get(props, "style"),
          backgroundImage: `radial-gradient(circle at 15% 20%, ${from}, transparent 42%), radial-gradient(circle at 85% 70%, ${to}, transparent 45%)`,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GradientBackground;
