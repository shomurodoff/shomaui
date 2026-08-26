import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function RetroGrid(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");

  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate min-h-56 overflow-hidden rounded-2xl border bg-slate-950 [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:34px_34px] [perspective:400px] before:absolute before:inset-x-[-20%] before:bottom-[-65%] before:h-[90%] before:skew-y-[-10deg] before:bg-[linear-gradient(to_bottom,transparent,rgba(56,189,248,.4),transparent)] before:[background-size:100%_8px] before:opacity-80 before:[transform:rotateX(55deg)] before:content-['']",
        className,
      )}
    />
  );
}

export default RetroGrid;
