import type { HTMLAttributes } from "react";
import { omit } from "lodash";

import { cn } from "#/lib/utils";

export type BorderBeamProps = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  duration?: number;
};

export function BorderBeam({
  color = "var(--primary)",
  duration = 5,
  children,
  className,
  ...props
}: BorderBeamProps) {
  return (
    <div
      {...omit(props, ["className"])}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl p-px",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-[-100%] [animation:shomaui-beam_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 70%, ${color} 82%, transparent 92%)`,
          animationDuration: `${duration}s`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full rounded-[calc(1rem-1px)] bg-card p-5">
        {children}
      </div>
    </div>
  );
}

export default BorderBeam;
