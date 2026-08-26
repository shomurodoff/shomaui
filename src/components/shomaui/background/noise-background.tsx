import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function NoiseBackground(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl bg-neutral-950 text-white [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.12),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.09),transparent_18%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,.1),transparent_22%)]",
        className,
      )}
    />
  );
}

export default NoiseBackground;
