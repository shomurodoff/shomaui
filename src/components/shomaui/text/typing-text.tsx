import { useEffect, useState } from "react";
import { get, toNumber } from "lodash";

type TypingTextProps = {
  words?: string[];
  speed?: number;
  className?: string;
};

const defaultTypingWords = ["thoughtful interfaces", "faster launches", "better products"];

export function TypingText({
  words = defaultTypingWords,
  speed = 75,
  className,
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);

  useEffect(() => {
    const word = get(words, wordIndex, "");
    const timeout = window.setTimeout(() => {
      if (characterIndex >= word.length) {
        setCharacterIndex(0);
        setWordIndex((index) => (index + 1) % Math.max(words.length, 1));
        return;
      }
      setCharacterIndex((index) => index + 1);
    }, characterIndex >= word.length ? toNumber(speed) * 8 : speed);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, speed, wordIndex, words]);

  return (
    <span className={className} aria-live="polite">
      {get(words, wordIndex, "").slice(0, characterIndex)}
      <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-current align-[-0.1em]" aria-hidden="true" />
    </span>
  );
}

export default TypingText;
