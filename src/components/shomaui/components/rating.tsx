import { Star } from "lucide-react";
import { clamp, get, map, range } from "lodash";

import { cn } from "#/lib/utils";

export type RatingProps = {
  value?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  className?: string;
};

export function Rating({
  value = 4,
  max = 5,
  onValueChange,
  className,
}: RatingProps) {
  const safeValue = clamp(value, 0, max);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="radiogroup"
      aria-label="Rating"
    >
      {map(range(1, max + 1), (star) => {
        const filled = star <= safeValue;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === safeValue}
            aria-label={`${star} out of ${max}`}
            className="rounded-sm p-0.5 text-amber-500 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onValueChange?.(clamp(star, 0, max))}
          >
            <Star
              className={cn(
                "size-5",
                filled
                  ? "fill-current"
                  : "fill-transparent text-muted-foreground",
              )}
            />
          </button>
        );
      })}
      <span className="ml-1 text-xs text-muted-foreground">
        {get(safeValue, "toFixed") ? safeValue.toFixed(1) : safeValue}/{max}
      </span>
    </div>
  );
}

export default Rating;
