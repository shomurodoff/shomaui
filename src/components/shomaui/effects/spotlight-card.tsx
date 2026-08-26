import { useState, type HTMLAttributes, type PointerEvent } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
};

export function SpotlightCard({
  spotlightColor = "rgba(120, 119, 198, .18)",
  className,
  ...props
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      {...omit(props, ["onPointerMove"])}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative min-h-48 overflow-hidden rounded-2xl border bg-card p-6 transition-colors",
        className,
      )}
      style={{
        ...get(props, "style"),
        backgroundImage: `radial-gradient(circle at ${position.x}% ${position.y}%, ${spotlightColor}, transparent 38%)`,
      }}
    />
  );
}

export default SpotlightCard;
