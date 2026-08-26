import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function ShimmerText(props: HTMLAttributes<HTMLSpanElement>) {
  const className = get(props, "className");

  return (
    <span
      {...omit(props, ["className"])}
      className={cn(
        "inline-block bg-[linear-gradient(110deg,var(--muted-foreground)_35%,var(--foreground)_50%,var(--muted-foreground)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:shomaui-shimmer_2.4s_linear_infinite]",
        className,
      )}
    />
  );
}

export default ShimmerText;
