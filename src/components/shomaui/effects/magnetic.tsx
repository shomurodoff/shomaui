import { useState, type HTMLAttributes, type PointerEvent } from "react";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils";

export function Magnetic(props: HTMLAttributes<HTMLDivElement>) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const children = get(props, "children");

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.15,
      y: (event.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  return (
    <div
      {...omit(props, ["className", "children", "onPointerMove", "onPointerLeave"])}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn("inline-flex transition-transform duration-200 ease-out", get(props, "className"))}
      style={{
        ...get(props, "style"),
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}

export default Magnetic;
