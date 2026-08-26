import { useState, type ImgHTMLAttributes } from "react";
import { get } from "lodash";

import { cn } from "#/lib/utils";

export type ImageRevealProps = ImgHTMLAttributes<HTMLImageElement> & {
  revealOn?: "hover" | "always";
};

export function ImageReveal({
  revealOn = "hover",
  className,
  alt = "",
  ...props
}: ImageRevealProps) {
  const [revealed, setRevealed] = useState(revealOn === "always");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-muted",
        className,
      )}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => revealOn === "hover" && setRevealed(false)}
    >
      <img
        {...props}
        alt={alt}
        className={cn(
          "block aspect-video w-full object-cover transition duration-700",
          revealed ? "scale-100 blur-0" : "scale-110 blur-xl",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity",
          revealed ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      />
      <span className="absolute inset-x-0 bottom-3 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {get(props, "alt", "Preview")}
      </span>
    </div>
  );
}

export default ImageReveal;
