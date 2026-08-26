import { useState, type HTMLAttributes, type PointerEvent } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export type GlareHoverProps = HTMLAttributes<HTMLDivElement> & {
  glareColor?: string;
};

export function GlareHover({
  glareColor = "rgba(255,255,255,.24)",
  children,
  className,
  ...props
}: GlareHoverProps) {
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
      {...omit(props, ["className", "onPointerMove"])}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
      style={{
        ...get(props, "style"),
        backgroundImage: `radial-gradient(circle at ${position.x}% ${position.y}%, ${glareColor}, transparent 35%)`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GlareHover;
