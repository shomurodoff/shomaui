import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function GradientText(props: HTMLAttributes<HTMLSpanElement>) {
  const className = get(props, "className");

  return (
    <span
      {...omit(props, ["className"])}
      className={cn(
        "bg-[linear-gradient(90deg,var(--color-2),var(--color-4),var(--color-5))] bg-clip-text text-transparent",
        className,
      )}
    />
  );
}

export default GradientText;
