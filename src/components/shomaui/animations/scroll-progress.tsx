import { useEffect, useState, type HTMLAttributes } from "react";
import { clamp, max } from "lodash";

import { cn } from "#/lib/utils";

export function ScrollProgress({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        height > 0 ? clamp((window.scrollY / height) * 100, 0, 100) : 0,
      );
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      {...props}
      className={cn("fixed inset-x-0 top-0 z-50 h-1 bg-transparent", className)}
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150"
        style={{ width: `${max([progress, 0])}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
