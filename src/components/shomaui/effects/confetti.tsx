import { PartyPopper } from "lucide-react";
import { get, map, range, toNumber } from "lodash";
import { useState, type CSSProperties, type ReactNode } from "react";

import { Button } from "#/components/shomaui/button";
import { cn } from "#/lib/utils";

export type ConfettiProps = {
  children?: ReactNode;
  pieces?: number;
  className?: string;
};

export function Confetti({
  children = "Celebrate",
  pieces = 18,
  className,
}: ConfettiProps) {
  const [burst, setBurst] = useState(0);

  return (
    <div className={cn("relative inline-flex", className)}>
      <Button type="button" onClick={() => setBurst((value) => value + 1)}>
        <PartyPopper data-icon="inline-start" />
        {children}
      </Button>
      <div
        key={burst}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {burst
          ? map(range(pieces), (piece) => (
              <span
                key={`${burst}-${piece}`}
                className="absolute left-1/2 top-1/2 size-1.5 animate-bounce rounded-sm bg-primary"
                style={
                  {
                    transform: `rotate(${piece * 20}deg) translateY(-${24 + (piece % 4) * 9}px)`,
                    animationDelay: `${toNumber(piece) * 0.025}s`,
                    backgroundColor: get(
                      ["#38bdf8", "#a78bfa", "#fbbf24", "#fb7185"],
                      piece % 4,
                    ),
                  } as CSSProperties
                }
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Confetti;
