import { useEffect, useState, type HTMLAttributes } from "react";
import { get, max, toNumber } from "lodash";

import { cn } from "#/lib/utils";

export type WordRotateProps = HTMLAttributes<HTMLSpanElement> & {
  words?: string[];
  duration?: number;
};

const defaultWords = ["design", "build", "ship"];

export function WordRotate({
  words = defaultWords,
  duration = 1800,
  className,
  ...props
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % (max([words.length, 1]) ?? 1)),
      toNumber(duration),
    );
    return () => window.clearInterval(timer);
  }, [duration, words.length]);

  return (
    <span {...props} className={cn("inline-block animate-pulse", className)}>
      {get(words, index, "")}
    </span>
  );
}

export default WordRotate;
