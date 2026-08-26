import { useEffect, useState, type HTMLAttributes } from "react";
import { get, max, toNumber } from "lodash";

import { cn } from "#/lib/utils";

export type MorphingTextProps = HTMLAttributes<HTMLSpanElement> & {
  words?: string[];
  interval?: number;
};

const defaultWords = ["clear", "playful", "memorable"];

export function MorphingText({
  words = defaultWords,
  interval = 2200,
  className,
  ...props
}: MorphingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % (max([words.length, 1]) ?? 1)),
      toNumber(interval),
    );
    return () => window.clearInterval(timer);
  }, [interval, words.length]);

  return (
    <span
      {...props}
      className={cn(
        "inline-block min-w-24 transition-all duration-500",
        className,
      )}
    >
      {get(words, index, "")}
    </span>
  );
}

export default MorphingText;
