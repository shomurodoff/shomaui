import {
  forwardRef,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
} from "react";

import { filter, get, last, map, omit, split, toNumber } from "lodash";

import { cn } from "#/lib/utils.ts";

type Ripple = {
  x: number;
  y: number;
  size: number;
  key: number;
};

type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  rippleColor?: string;
  duration?: string;
};

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (props, ref) => {
    const children = get(props, "children");
    const className = get(props, "className");
    const duration = get(props, "duration", "600ms");
    const onClick = get(props, "onClick");
    const rippleColor = get(props, "rippleColor", "#ffffff");
    const [buttonRipples, setButtonRipples] = useState<Ripple[]>([]);
    const durationInMilliseconds = toNumber(get(split(duration, "ms"), 0, 0));

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - rippleSize / 2;
      const y = event.clientY - rect.top - rippleSize / 2;
      const newRipple = { x, y, size: rippleSize, key: Date.now() };

      setButtonRipples((previousRipples) => [...previousRipples, newRipple]);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    useEffect(() => {
      const lastRipple = last(buttonRipples);

      if (!lastRipple) return undefined;

      const timeout = setTimeout(() => {
        setButtonRipples((previousRipples) =>
          filter(
            previousRipples,
            (ripple) => get(ripple, "key") !== get(lastRipple, "key"),
          ),
        );
      }, durationInMilliseconds);

      return () => clearTimeout(timeout);
    }, [buttonRipples, duration]);

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary",
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...omit(props, [
          "children",
          "className",
          "duration",
          "onClick",
          "rippleColor",
        ])}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {map(buttonRipples, (ripple) => {
            const rippleKey = get(ripple, "key");
            const rippleSize = get(ripple, "size");
            const rippleX = get(ripple, "x");
            const rippleY = get(ripple, "y");

            return (
              <span
                className="absolute animate-rippling rounded-full bg-background opacity-30"
                key={rippleKey}
                style={
                  {
                    width: `${rippleSize}px`,
                    height: `${rippleSize}px`,
                    top: `${rippleY}px`,
                    left: `${rippleX}px`,
                    backgroundColor: rippleColor,
                    transform: "scale(0)",
                    "--duration": duration,
                  } as CSSProperties
                }
              />
            );
          })}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";

export { RippleButton, type RippleButtonProps };
export default RippleButton;
