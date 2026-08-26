import type { HTMLAttributes } from "react";
import { omit } from "lodash";

import { cn } from "#/lib/utils";

export type TextHighlighterProps = HTMLAttributes<HTMLSpanElement> & {
  color?: string;
};

export function TextHighlighter({
  color = "rgba(250, 204, 21, .38)",
  className,
  children,
  ...props
}: TextHighlighterProps) {
  return (
    <span
      {...omit(props, ["className"])}
      className={cn("relative inline-block px-1", className)}
    >
      <span
        className="absolute inset-x-0 bottom-0 z-0 h-[45%] -rotate-1 rounded-sm"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export default TextHighlighter;
