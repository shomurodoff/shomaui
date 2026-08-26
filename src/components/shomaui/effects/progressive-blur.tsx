import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type ProgressiveBlurProps = HTMLAttributes<HTMLDivElement> & {
  position?: "top" | "bottom";
};

export function ProgressiveBlur({
  position = "bottom",
  children,
  className,
  ...props
}: ProgressiveBlurProps) {
  const isTop = position === "top";

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card",
        className,
      )}
    >
      <div className="relative z-10 p-5">{children}</div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-20 h-16 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black)]",
          isTop ? "top-0 rotate-180" : "bottom-0",
        )}
        style={{ opacity: get(props, "style.opacity", 1) }}
        aria-hidden="true"
      />
    </div>
  );
}

export default ProgressiveBlur;
