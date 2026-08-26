import { useState, type ReactNode } from "react";
import { get, map } from "lodash";

import { cn } from "#/lib/utils";

export type DockItem = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

export type DockProps = {
  items?: DockItem[];
  className?: string;
};

const defaultItems: DockItem[] = [
  { label: "Home", icon: "⌂" },
  { label: "Search", icon: "⌕" },
  { label: "Settings", icon: "⚙" },
];

export function Dock({ items = defaultItems, className }: DockProps) {
  const [activeLabel, setActiveLabel] = useState(get(items, "0.label", ""));

  return (
    <nav
      aria-label="Application dock"
      className={cn("flex items-end justify-center gap-2", className)}
    >
      {map(items, (item) => {
        const active = item.label === activeLabel;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              setActiveLabel(item.label);
              item.onClick?.();
            }}
            className={cn(
              "group relative flex size-11 items-center justify-center rounded-2xl border bg-card text-lg shadow-sm transition-all duration-200 hover:-translate-y-2 hover:scale-110",
              active && "-translate-y-1 border-primary/50 text-primary",
            )}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
          >
            {item.icon}
            <span className="pointer-events-none absolute -top-8 scale-90 rounded-md bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default Dock;
