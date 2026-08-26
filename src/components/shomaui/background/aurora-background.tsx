import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function AuroraBackground(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");
  const children = get(props, "children");

  return (
    <div
      {...omit(props, ["className", "children"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl border bg-background",
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-400/15" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/15" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AuroraBackground;
