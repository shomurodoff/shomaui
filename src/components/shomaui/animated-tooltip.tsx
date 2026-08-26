"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { get, map } from "lodash";

import { cn } from "#/lib/utils.ts";

type AnimatedTooltipItem = {
  id: string | number;
  trigger: ReactNode;
  content: ReactNode;
};

type AnimatedTooltipProps = {
  items: AnimatedTooltipItem[];
  className?: string;
  itemClassName?: string;
};

const springConfig = { stiffness: 100, damping: 15 };

const AnimatedTooltip = (props: AnimatedTooltipProps) => {
  const items = get(props, "items", []);
  const className = get(props, "className");
  const itemClassName = get(props, "itemClassName");
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-12, 12]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-24, 24]),
    springConfig,
  );

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const clientX = event.clientX;
    const target = event.currentTarget;

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      x.set(clientX - rect.left - rect.width / 2);
      animationFrameRef.current = null;
    });
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4",
        className,
      )}
    >
      {map(items, (item) => {
        const id = get(item, "id");
        const trigger = get(item, "trigger");
        const content = get(item, "content");

        return (
          <div
            key={id}
            className={cn("group relative inline-flex", itemClassName)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(id)}
            onBlur={() => setHoveredId(null)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence>
              {hoveredId === id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  style={{ translateX, rotate }}
                  className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 flex -translate-x-1/2 flex-col items-center rounded-md bg-foreground px-3 py-2 text-xs text-background shadow-xl"
                >
                  {content}
                  <span className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative">{trigger}</div>
          </div>
        );
      })}
    </div>
  );
};

export { AnimatedTooltip, type AnimatedTooltipItem, type AnimatedTooltipProps };

export default AnimatedTooltip;
