import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function AuroraText({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...omit(props, ["className"])}
      className={cn(
        "inline-block bg-[linear-gradient(110deg,#38bdf8,#a78bfa,#f472b6,#38bdf8)] bg-[length:300%_100%] bg-clip-text text-transparent [animation:shomaui-aurora-text_6s_ease_infinite]",
        className,
      )}
      style={{ ...get(props, "style") }}
    >
      {children}
    </span>
  );
}

export default AuroraText;
