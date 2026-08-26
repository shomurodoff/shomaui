import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function ShineBorder(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative overflow-hidden rounded-2xl p-px before:absolute before:inset-[-40%] before:animate-[spin_4s_linear_infinite] before:bg-[conic-gradient(from_90deg,transparent_0deg,color-mix(in_oklch,var(--primary)_80%,transparent)_90deg,transparent_180deg)]",
        className,
      )}
    >
      <div className="relative z-10 h-full rounded-[calc(1rem-1px)] bg-card p-6">
        {get(props, "children")}
      </div>
    </div>
  );
}

export default ShineBorder;
