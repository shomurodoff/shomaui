import type { HTMLAttributes } from "react";
import { get, map, omit } from "lodash";

import { cn } from "#/lib/utils";

export function Marquee(props: HTMLAttributes<HTMLDivElement>) {
  const className = get(props, "className");
  const children = get(props, "children");

  return (
    <div
      {...omit(props, ["className", "children"])}
      className={cn("relative flex overflow-hidden", className)}
      aria-label="Scrolling content"
    >
      {map([0, 1], (copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex min-w-full shrink-0 items-center justify-around gap-8 px-4 [animation:shomaui-marquee_18s_linear_infinite]"
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
