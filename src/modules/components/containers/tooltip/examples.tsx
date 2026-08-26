import type { ComponentType } from "react";

import { Bell, CircleHelp, Keyboard } from "lucide-react";
import { get, map } from "lodash";

import {
  AnimatedTooltip,
  type AnimatedTooltipItem,
} from "#/components/shomaui/animated-tooltip.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/components/shomaui/tooltip.tsx";
import { Avatar, AvatarFallback } from "#/components/ui/avatar.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";

export type TooltipExample = {
  id: string;
  slug: string;
  title: string;
  description: string;
  preview: ComponentType;
  previewClassName?: string;
  code: string;
};

const tooltipActions = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    content: "View your latest notifications",
  },
  {
    id: "shortcuts",
    label: "Keyboard shortcuts",
    icon: Keyboard,
    content: "Press ? to see all shortcuts",
  },
] as const;

const BasicTooltipPreview = () => (
  <TooltipProvider delay={180}>
    <div className="flex flex-wrap items-center justify-center gap-3">
      {map(tooltipActions, (action) => {
        const Icon = get(action, "icon");

        return (
          <Tooltip key={get(action, "id")}>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="lg"
                  aria-label={get(action, "label")}
                />
              }
            >
              <Icon data-icon="inline-start" />
              {get(action, "label")}
            </TooltipTrigger>
            <TooltipContent>{get(action, "content")}</TooltipContent>
          </Tooltip>
        );
      })}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="More information"
            />
          }
        >
          <CircleHelp />
        </TooltipTrigger>
        <TooltipContent side="bottom">More information</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

const animatedTooltipItems: AnimatedTooltipItem[] = [
  {
    id: "button",
    trigger: <Button size="lg">Hover button</Button>,
    content: (
      <>
        <strong className="font-semibold">Button trigger</strong>
        <span className="text-background/70">
          Any React node can trigger it.
        </span>
      </>
    ),
  },
  {
    id: "badge",
    trigger: (
      <Badge variant="secondary" className="cursor-help px-3 py-1.5">
        In review
      </Badge>
    ),
    content: (
      <>
        <strong className="font-semibold">Badge trigger</strong>
        <span className="text-background/70">
          Useful for compact status context.
        </span>
      </>
    ),
  },
  {
    id: "avatar",
    trigger: (
      <Avatar size="lg" className="cursor-help">
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
    ),
    content: (
      <>
        <strong className="font-semibold">Aisha Khan</strong>
        <span className="text-background/70">Product designer</span>
      </>
    ),
  },
  {
    id: "text",
    trigger: (
      <span className="cursor-help rounded-md border px-3 py-2 text-sm">
        Hover text
      </span>
    ),
    content: (
      <>
        <strong className="font-semibold">Text trigger</strong>
        <span className="text-background/70">
          Content can be any React node too.
        </span>
      </>
    ),
  },
];

const AnimatedTooltipPreview = () => (
  <AnimatedTooltip
    items={animatedTooltipItems}
    className="gap-5"
    itemClassName="min-h-10"
  />
);

const basicTooltipCode = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shomaui/tooltip"
import { Button } from "@/components/ui/button"

export function BasicTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Notifications
        </TooltipTrigger>
        <TooltipContent>View your latest notifications</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`;

const animatedTooltipCode = `import { AnimatedTooltip } from "@/components/shomaui/animated-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AnimatedTooltipDemo() {
  return (
    <AnimatedTooltip
      items={[
        {
          id: "button",
          trigger: <Button>Hover button</Button>,
          content: (
            <>
              <strong>Button trigger</strong>
              <span>Any React node can trigger it.</span>
            </>
          ),
        },
        {
          id: "badge",
          trigger: <Badge>In review</Badge>,
          content: <span>Compact status context.</span>,
        },
      ]}
    />
  )
}`;

export const tooltipExamples: TooltipExample[] = [
  {
    id: "tooltip-basic",
    slug: "tooltip",
    title: "Basic tooltip",
    description:
      "Accessible Base UI tooltip primitives for actions, icons, and contextual help.",
    preview: BasicTooltipPreview,
    previewClassName: "min-h-[18rem]",
    code: basicTooltipCode,
  },
  {
    id: "tooltip-animated",
    slug: "animated-tooltip",
    title: "Animated tooltip",
    description:
      "Spring-powered hover content that accepts buttons, badges, avatars, text, or any React node.",
    preview: AnimatedTooltipPreview,
    previewClassName: "min-h-[18rem]",
    code: animatedTooltipCode,
  },
];
