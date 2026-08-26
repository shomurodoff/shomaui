import type { CSSProperties, HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type DotPatternProps = HTMLAttributes<HTMLDivElement> & {
  dotColor?: string;
  dotSize?: number;
  gap?: number;
};

export function DotPattern({
  dotColor = "color-mix(in oklch, var(--foreground) 18%, transparent)",
  dotSize = 1.5,
  gap = 22,
  className,
  ...props
}: DotPatternProps) {
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
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
        } as CSSProperties
      }
    />
  );
}

export default DotPattern;
