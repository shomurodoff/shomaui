import type { HTMLAttributes } from "react";
import { get, omit } from "lodash";

import { Badge } from "#/components/ui/badge";

type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status?: "new" | "stable" | "beta" | "deprecated";
};

const statusLabel = {
  new: "New",
  stable: "Stable",
  beta: "Beta",
  deprecated: "Deprecated",
} as const;

export function StatusBadge({ status = "new", ...props }: StatusBadgeProps) {
  const label = get(statusLabel, status);

  return (
    <Badge
      {...omit(props, ["status"])}
      variant={status === "deprecated" ? "destructive" : "outline"}
      className="rounded-full"
    >
      {label}
    </Badge>
  );
}

export default StatusBadge;
