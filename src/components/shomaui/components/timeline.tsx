import { Check, Circle } from "lucide-react";
import { get, map } from "lodash";

import { cn } from "#/lib/utils";

export type TimelineItem = {
  title: string;
  description?: string;
  date?: string;
  complete?: boolean;
};

export type TimelineProps = {
  items?: TimelineItem[];
  className?: string;
};

const defaultItems: TimelineItem[] = [
  {
    title: "Discovery",
    description: "Align on the product direction.",
    date: "Week 1",
    complete: true,
  },
  {
    title: "Prototype",
    description: "Shape the first interaction model.",
    date: "Week 2",
    complete: true,
  },
  {
    title: "Launch",
    description: "Ship a polished, measurable experience.",
    date: "Week 3",
  },
];

export function Timeline({ items = defaultItems, className }: TimelineProps) {
  return (
    <ol className={cn("grid gap-0", className)}>
      {map(items, (item, index) => (
        <li
          key={`${item.title}-${index}`}
          className="relative flex gap-3 pb-6 last:pb-0"
        >
          {index < items.length - 1 ? (
            <span
              className="absolute left-3 top-7 h-full w-px bg-border"
              aria-hidden="true"
            />
          ) : null}
          <span
            className={cn(
              "relative z-10 mt-0.5 grid size-6 place-items-center rounded-full border bg-card",
              item.complete &&
                "border-primary bg-primary text-primary-foreground",
            )}
          >
            {item.complete ? (
              <Check className="size-3" aria-hidden="true" />
            ) : (
              <Circle
                className="size-2 fill-muted-foreground text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{item.title}</p>
              {get(item, "date") ? (
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              ) : null}
            </div>
            {get(item, "description") ? (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
