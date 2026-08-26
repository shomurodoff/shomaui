import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { get, omit } from "lodash";

import { cn } from "#/lib/utils.ts";

const avatarSizeClasses = {
  default: "size-8",
  sm: "size-6",
  lg: "size-10",
} as const;

const Avatar = (
  props: AvatarPrimitive.Root.Props & {
    size?: "default" | "sm" | "lg";
  },
) => {
  const className = get(props, "className");
  const size = get(props, "size", "default");

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        get(avatarSizeClasses, size),
        className,
      )}
      {...omit(props, ["className", "size"])}
    />
  );
};

const AvatarImage = (props: AvatarPrimitive.Image.Props) => {
  const className = get(props, "className");

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...omit(props, "className")}
    />
  );
};

const AvatarFallback = (props: AvatarPrimitive.Fallback.Props) => {
  const className = get(props, "className");

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...omit(props, "className")}
    />
  );
};

const AvatarBadge = (props: React.ComponentProps<"span">) => {
  const className = get(props, "className");

  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...omit(props, "className")}
    />
  );
};

const AvatarGroup = (props: React.ComponentProps<"div">) => {
  const className = get(props, "className");

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...omit(props, "className")}
    />
  );
};

const AvatarGroupCount = (props: React.ComponentProps<"div">) => {
  const className = get(props, "className");

  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...omit(props, "className")}
    />
  );
};

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
