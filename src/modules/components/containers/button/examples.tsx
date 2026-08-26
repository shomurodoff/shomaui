import type { ComponentType } from "react";

import { Plus, Settings, Sparkles } from "lucide-react";
import { get, map, toUpper } from "lodash";

import { Button as ShomauiButton } from "#/components/shomaui/button.tsx";
import { InteractiveHoverButton } from "#/components/shomaui/interactive-hover-button.tsx";
import { RainbowButton } from "#/components/shomaui/rainbow-button.tsx";
import { RippleButton } from "#/components/shomaui/ripple-button.tsx";
import { ShinyButton } from "#/components/shomaui/shiny-button.tsx";

export type ButtonExample = {
  id: string;
  slug: string;
  title: string;
  description: string;
  preview: ComponentType;
  previewClassName?: string;
  code: string;
};

const buttonVariants = [
  { label: "Default", variant: "default" as const },
  { label: "Secondary", variant: "secondary" as const },
  { label: "Outline", variant: "outline" as const },
  { label: "Ghost", variant: "ghost" as const },
  { label: "Destructive", variant: "destructive" as const },
  { label: "Link", variant: "link" as const },
];

const textButtonSizes = ["xs", "sm", "default", "lg", "xl"] as const;
const iconButtonSizes = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
] as const;

const rainbowButtonVariants = [
  { label: "Default", variant: "default" as const },
  { label: "Outline", variant: "outline" as const },
  { label: "Link", variant: "link" as const },
];

const rainbowTextButtonSizes = ["xs", "sm", "default", "lg", "xl"] as const;
const rainbowIconButtonSizes = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
] as const;

const ButtonVariantsPreview = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    {map(buttonVariants, (item) => (
      <ShomauiButton key={get(item, "variant")} variant={get(item, "variant")}>
        {get(item, "label")}
      </ShomauiButton>
    ))}
  </div>
);

const ButtonSizesPreview = () => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {map(textButtonSizes, (size) => (
        <ShomauiButton key={size} size={size} variant="outline">
          {size === "default" ? "Default" : toUpper(size)}
        </ShomauiButton>
      ))}
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {map(iconButtonSizes, (size) => (
        <ShomauiButton
          key={size}
          size={size}
          variant="outline"
          aria-label={`${size} button`}
        >
          {size === "icon-xl" ? (
            <Settings aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
        </ShomauiButton>
      ))}
    </div>
  </div>
);

const ButtonStatusesPreview = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    <ShomauiButton status="idle" variant="outline">
      Ready
    </ShomauiButton>
    <ShomauiButton status="loading" variant="outline">
      Saving
    </ShomauiButton>
    <ShomauiButton status="success" variant="outline">
      Saved
    </ShomauiButton>
    <ShomauiButton status="error" variant="outline">
      Failed
    </ShomauiButton>
  </div>
);

const RainbowButtonDefaultPreview = () => (
  <RainbowButton size="xl">Get Unlimited Access</RainbowButton>
);

const RainbowButtonVariantsPreview = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    {map(rainbowButtonVariants, (item) => (
      <RainbowButton key={get(item, "variant")} variant={get(item, "variant")}>
        {get(item, "label")}
      </RainbowButton>
    ))}
  </div>
);

const RainbowButtonSizesPreview = () => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {map(rainbowTextButtonSizes, (size) => (
        <RainbowButton key={size} size={size} variant="outline">
          {size === "default" ? "Default" : toUpper(size)}
        </RainbowButton>
      ))}
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {map(rainbowIconButtonSizes, (size) => (
        <RainbowButton
          key={size}
          size={size}
          variant="outline"
          aria-label={`${size} rainbow button`}
        >
          {size === "icon-xl" ? (
            <Sparkles aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
        </RainbowButton>
      ))}
    </div>
  </div>
);

const InteractiveHoverButtonPreview = () => (
  <InteractiveHoverButton>Get Started</InteractiveHoverButton>
);

const ShinyButtonPreview = () => <ShinyButton>Shiny Button</ShinyButton>;

const RippleButtonPreview = () => <RippleButton>Click to ripple</RippleButton>;

const buttonVariantsCode = `import { Button } from "@/components/shomaui/button"

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`;

const buttonSizesCode = `import { Plus, Settings } from "lucide-react"
import { Button } from "@/components/shomaui/button"

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button>Default</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="icon-xs" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-xl" aria-label="Settings">
        <Settings />
      </Button>
    </div>
  )
}`;

const buttonStatusesCode = `import { Button } from "@/components/shomaui/button"

export function ButtonStatuses() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button status="idle" variant="outline">Ready</Button>
      <Button status="loading" variant="outline">Saving</Button>
      <Button status="success" variant="outline">Saved</Button>
      <Button status="error" variant="outline">Failed</Button>
    </div>
  )
}`;

const rainbowButtonVariantsCode = `import { RainbowButton } from "@/components/shomaui/rainbow-button"

export function RainbowButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <RainbowButton>Default</RainbowButton>
      <RainbowButton variant="outline">Outline</RainbowButton>
      <RainbowButton variant="link">Link</RainbowButton>
    </div>
  )
}`;

const rainbowButtonDefaultCode = `import { RainbowButton } from "@/components/shomaui/rainbow-button"

export function RainbowButtonDefault() {
  return (
    <RainbowButton size="xl">Get Unlimited Access</RainbowButton>
  )
}`;

const rainbowButtonSizesCode = `import { Plus, Sparkles } from "lucide-react"
import { RainbowButton } from "@/components/shomaui/rainbow-button"

export function RainbowButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <RainbowButton size="xs">XS</RainbowButton>
      <RainbowButton size="sm">SM</RainbowButton>
      <RainbowButton>Default</RainbowButton>
      <RainbowButton size="lg">LG</RainbowButton>
      <RainbowButton size="xl">XL</RainbowButton>
      <RainbowButton size="icon-xs" aria-label="Add">
        <Plus />
      </RainbowButton>
      <RainbowButton size="icon-sm" aria-label="Add">
        <Plus />
      </RainbowButton>
      <RainbowButton size="icon" aria-label="Add">
        <Plus />
      </RainbowButton>
      <RainbowButton size="icon-lg" aria-label="Add">
        <Plus />
      </RainbowButton>
      <RainbowButton size="icon-xl" aria-label="Sparkles">
        <Sparkles />
      </RainbowButton>
    </div>
  )
}`;

const interactiveHoverButtonCode = `import { InteractiveHoverButton } from "@/components/shomaui/interactive-hover-button"

export function InteractiveHoverButtonDemo() {
  return <InteractiveHoverButton>Get Started</InteractiveHoverButton>
}`;

const shinyButtonCode = `import { ShinyButton } from "@/components/shomaui/shiny-button"

export function ShinyButtonDemo() {
  return <ShinyButton>Shiny Button</ShinyButton>
}`;

const rippleButtonCode = `import { RippleButton } from "@/components/shomaui/ripple-button"

export function RippleButtonDemo() {
  return <RippleButton>Click to ripple</RippleButton>
}`;

export const buttonExamples: ButtonExample[] = [
  {
    id: "button-variants",
    slug: "button",
    title: "Button variants",
    description:
      "Common action styles for primary, secondary, and destructive actions.",
    preview: ButtonVariantsPreview,
    previewClassName: "min-h-[18rem]",
    code: buttonVariantsCode,
  },
  {
    id: "button-sizes",
    slug: "button",
    title: "Button sizes",
    description:
      "Text and icon sizes from compact controls to the XL action size.",
    preview: ButtonSizesPreview,
    previewClassName: "min-h-[18rem]",
    code: buttonSizesCode,
  },
  {
    id: "button-statuses",
    slug: "button",
    title: "Button statuses",
    description:
      "Idle, loading, success, and error feedback for async actions.",
    preview: ButtonStatusesPreview,
    previewClassName: "min-h-[18rem]",
    code: buttonStatusesCode,
  },
  {
    id: "interactive-hover-button",
    slug: "interactive-hover-button",
    title: "Interactive hover button",
    description:
      "A compact action that reveals its arrow treatment when you hover.",
    preview: InteractiveHoverButtonPreview,
    previewClassName: "min-h-[18rem]",
    code: interactiveHoverButtonCode,
  },
  {
    id: "shiny-button",
    slug: "shiny-button",
    title: "Shiny button",
    description:
      "A subtle animated highlight that sweeps across the button surface.",
    preview: ShinyButtonPreview,
    previewClassName: "min-h-[18rem]",
    code: shinyButtonCode,
  },
  {
    id: "ripple-button",
    slug: "ripple-button",
    title: "Ripple button",
    description:
      "A tactile button that expands a ripple from the point of interaction.",
    preview: RippleButtonPreview,
    previewClassName: "min-h-[18rem]",
    code: rippleButtonCode,
  },
  {
    id: "rainbow-button-default",
    slug: "rainbow-button",
    title: "RainbowButton default",
    description:
      "A dark CTA surface with an animated rainbow border and soft bottom glow.",
    preview: RainbowButtonDefaultPreview,
    previewClassName: "min-h-[18rem]",
    code: rainbowButtonDefaultCode,
  },
  {
    id: "rainbow-button-variants",
    slug: "rainbow-button",
    title: "RainbowButton variants",
    description:
      "Default, outlined, and link actions with animated rainbow accents.",
    preview: RainbowButtonVariantsPreview,
    previewClassName: "min-h-[18rem]",
    code: rainbowButtonVariantsCode,
  },
  {
    id: "rainbow-button-sizes",
    slug: "rainbow-button",
    title: "RainbowButton sizes",
    description:
      "The full Button size scale, including XL and icon XL controls.",
    preview: RainbowButtonSizesPreview,
    previewClassName: "min-h-[18rem]",
    code: rainbowButtonSizesCode,
  },
];
