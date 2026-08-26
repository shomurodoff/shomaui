import { get, map } from "lodash";
import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

export type StackingCardProps = {
  cards?: ReactNode[];
  className?: string;
};

const defaultCards = ["Briefing", "Prototype", "Ship it"];

export function StackingCard({
  cards = defaultCards,
  className,
}: StackingCardProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {map(cards, (card, index) => (
        <div
          key={index}
          className="sticky flex min-h-20 items-center rounded-2xl border bg-card px-5 text-sm font-medium shadow-sm transition-transform hover:-translate-y-1"
          style={{
            top: `${get(cards, "length", 1) * 10 + index * 16}px`,
            zIndex: index,
          }}
        >
          <span className="mr-3 text-xs text-muted-foreground">
            0{index + 1}
          </span>
          {card}
        </div>
      ))}
    </div>
  );
}

export default StackingCard;
