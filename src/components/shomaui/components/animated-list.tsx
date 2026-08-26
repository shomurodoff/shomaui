import {
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { get, map, max, toNumber } from "lodash";

import { cn } from "#/lib/utils";

export type AnimatedListProps = HTMLAttributes<HTMLDivElement> & {
  items?: ReactNode[];
  interval?: number;
};

const defaultItems = [
  "New component published",
  "Build completed",
  "Design review ready",
];

export function AnimatedList({
  items = defaultItems,
  interval = 2400,
  className,
  ...props
}: AnimatedListProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % (max([items.length, 1]) ?? 1));
    }, toNumber(interval));

    return () => window.clearInterval(timer);
  }, [interval, items.length]);

  return (
    <div {...props} className={cn("grid gap-2", className)}>
      {map(items, (item, index) => (
        <div
          key={`${index}-${String(item)}`}
          className={cn(
            "flex items-center gap-3 rounded-xl border bg-card px-3 py-2 text-sm transition-all duration-500",
            index === activeIndex
              ? "translate-x-1 border-primary/40 shadow-sm"
              : "opacity-55",
          )}
        >
          <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
          <span className="truncate">{item}</span>
          {index === activeIndex ? (
            <span className="ml-auto text-xs text-primary">Live</span>
          ) : null}
        </div>
      ))}
      {!get(items, 0) ? (
        <p className="text-sm text-muted-foreground">No activity yet.</p>
      ) : null}
    </div>
  );
}

export default AnimatedList;
