import { Check, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Separator } from "#/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { Button as ShomauiButton } from "#/components/shomaui/button";
import InteractiveHoverButton from "#/components/shomaui/interactive-hover-button";
import RainbowButton from "#/components/shomaui/rainbow-button";
import RippleButton from "#/components/shomaui/ripple-button";
import ShinyButton from "#/components/shomaui/shiny-button";
import ActionMenu from "#/components/shomaui/components/action-menu";
import GlassCard from "#/components/shomaui/components/glass-card";
import SegmentedControl from "#/components/shomaui/components/segmented-control";
import StatusBadge from "#/components/shomaui/components/status-badge";
import AuroraBackground from "#/components/shomaui/background/aurora-background";
import GridBackground from "#/components/shomaui/background/grid-background";
import NoiseBackground from "#/components/shomaui/background/noise-background";
import StarsBackground from "#/components/shomaui/background/stars-background";
import GlowHoverCard from "#/components/shomaui/effects/glow-hover-card";
import Magnetic from "#/components/shomaui/effects/magnetic";
import ShineBorder from "#/components/shomaui/effects/shine-border";
import SpotlightCard from "#/components/shomaui/effects/spotlight-card";
import Marquee from "#/components/shomaui/animations/marquee";
import NumberTicker from "#/components/shomaui/animations/number-ticker";
import Reveal from "#/components/shomaui/animations/reveal";
import GradientText from "#/components/shomaui/text/gradient-text";
import ShimmerText from "#/components/shomaui/text/shimmer-text";
import TypingText from "#/components/shomaui/text/typing-text";

export function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-xl border bg-muted/20 p-5">
      <div className="w-full max-w-72">{children}</div>
    </div>
  );
}

export function AvatarCatalogPreview() {
  return (
    <PreviewFrame>
      <div className="flex items-center justify-center">
        <AvatarGroup>
          {mapAvatars(["SK", "JD", "AM", "+4"])}
        </AvatarGroup>
      </div>
    </PreviewFrame>
  );
}

function mapAvatars(labels: string[]) {
  return labels.map((label) => (
    <Avatar key={label} size="lg">
      <AvatarFallback className="bg-primary/10 text-xs text-primary">
        {label}
      </AvatarFallback>
    </Avatar>
  ));
}

export function ButtonCatalogPreview() {
  return (
    <PreviewFrame>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ShomauiButton size="sm">Continue</ShomauiButton>
        <ShomauiButton variant="outline" size="sm">
          Preview
        </ShomauiButton>
      </div>
    </PreviewFrame>
  );
}

export function TooltipCatalogPreview() {
  return (
    <PreviewFrame>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" className="mx-auto flex" />}>
            Hover to discover
          </TooltipTrigger>
          <TooltipContent>Contextual help</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PreviewFrame>
  );
}

export function ActionMenuPreview() {
  return (
    <PreviewFrame>
      <div className="flex justify-end">
        <ActionMenu />
      </div>
    </PreviewFrame>
  );
}

export function GlassCardPreview() {
  return (
    <PreviewFrame>
      <GlassCard glow className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Weekly revenue</p>
            <p className="mt-1 text-2xl font-semibold">$12,480</p>
          </div>
          <Badge variant="outline">+18%</Badge>
        </div>
      </GlassCard>
    </PreviewFrame>
  );
}

export function StatusBadgePreview() {
  return (
    <PreviewFrame>
      <div className="flex flex-wrap justify-center gap-2">
        <StatusBadge status="new" />
        <StatusBadge status="stable" />
        <StatusBadge status="beta" />
      </div>
    </PreviewFrame>
  );
}

export function SegmentedControlPreview() {
  return (
    <PreviewFrame>
      <SegmentedControl items={["Day", "Week", "Month"]} />
    </PreviewFrame>
  );
}

export function RainbowButtonPreview() {
  return (
    <PreviewFrame>
      <RainbowButton className="mx-auto">Launch project</RainbowButton>
    </PreviewFrame>
  );
}

export function RippleButtonPreview() {
  return (
    <PreviewFrame>
      <RippleButton className="mx-auto">Click me</RippleButton>
    </PreviewFrame>
  );
}

export function ShinyButtonPreview() {
  return (
    <PreviewFrame>
      <ShinyButton className="mx-auto">Shiny action</ShinyButton>
    </PreviewFrame>
  );
}

export function InteractiveHoverButtonPreview() {
  return (
    <PreviewFrame>
      <InteractiveHoverButton className="mx-auto">View details</InteractiveHoverButton>
    </PreviewFrame>
  );
}

export function StarsPreview() {
  return (
    <PreviewFrame>
      <StarsBackground className="min-h-44">
        <div className="flex h-44 flex-col items-center justify-center gap-2 text-center">
          <Sparkles className="size-5 text-sky-200" />
          <p className="text-sm font-medium">A quiet space for ideas</p>
        </div>
      </StarsBackground>
    </PreviewFrame>
  );
}

export function GridPreview() {
  return (
    <PreviewFrame>
      <GridBackground>
        <div className="flex min-h-44 items-center justify-center">
          <div className="rounded-xl border bg-background/90 px-5 py-3 text-sm shadow-sm">
            Grid system
          </div>
        </div>
      </GridBackground>
    </PreviewFrame>
  );
}

export function AuroraPreview() {
  return (
    <PreviewFrame>
      <AuroraBackground>
        <div className="flex min-h-44 items-center justify-center text-center">
          <p className="max-w-44 text-sm font-medium">Soft color, sharp focus.</p>
        </div>
      </AuroraBackground>
    </PreviewFrame>
  );
}

export function NoisePreview() {
  return (
    <PreviewFrame>
      <NoiseBackground>
        <div className="flex min-h-44 items-end p-4">
          <p className="text-sm font-medium">Texture without assets</p>
        </div>
      </NoiseBackground>
    </PreviewFrame>
  );
}

export function SpotlightPreview() {
  return (
    <PreviewFrame>
      <SpotlightCard>
        <p className="text-sm font-medium">Move your pointer here</p>
        <p className="mt-1 text-xs text-muted-foreground">The light follows focus.</p>
      </SpotlightCard>
    </PreviewFrame>
  );
}

export function ShineBorderPreview() {
  return (
    <PreviewFrame>
      <ShineBorder>
        <p className="text-sm font-medium">Animated border</p>
        <p className="mt-1 text-xs text-muted-foreground">CSS-first effect.</p>
      </ShineBorder>
    </PreviewFrame>
  );
}

export function MagneticPreview() {
  return (
    <PreviewFrame>
      <Magnetic className="mx-auto">
        <Button>Magnetic action</Button>
      </Magnetic>
    </PreviewFrame>
  );
}

export function GlowCardPreview() {
  return (
    <PreviewFrame>
      <GlowHoverCard>
        <p className="text-sm font-medium">Hover to lift</p>
        <p className="mt-1 text-xs text-muted-foreground">A subtle glow and shadow.</p>
      </GlowHoverCard>
    </PreviewFrame>
  );
}

export function MarqueePreview() {
  return (
    <PreviewFrame>
      <Marquee className="rounded-lg border py-3 text-xs text-muted-foreground">
        {mapAvatars(["UI", "UX", "DX", "AI"]).map((_, index) => (
          <span key={index} className="whitespace-nowrap">
            {[
              "UI",
              "UX",
              "DX",
              "AI",
            ][index]}
          </span>
        ))}
      </Marquee>
    </PreviewFrame>
  );
}

export function RevealPreview() {
  return (
    <PreviewFrame>
      <Reveal className="rounded-xl border bg-background p-5">
        <p className="text-sm font-medium">Reveal on scroll</p>
        <p className="mt-1 text-xs text-muted-foreground">IntersectionObserver powered.</p>
      </Reveal>
    </PreviewFrame>
  );
}

export function NumberTickerPreview() {
  return (
    <PreviewFrame>
      <div className="text-center">
        <p className="text-4xl font-semibold tabular-nums">
          <NumberTicker value={12840} />
        </p>
        <p className="mt-1 text-xs text-muted-foreground">monthly active users</p>
      </div>
    </PreviewFrame>
  );
}

export function TypingPreview() {
  return (
    <PreviewFrame>
      <div className="text-center text-lg font-semibold">
        Build <TypingText className="text-primary" />
      </div>
    </PreviewFrame>
  );
}

export function ShimmerPreview() {
  return (
    <PreviewFrame>
      <ShimmerText className="text-xl font-semibold">ShomaUI in motion</ShimmerText>
    </PreviewFrame>
  );
}

export function GradientPreview() {
  return (
    <PreviewFrame>
      <GradientText className="text-center text-2xl font-bold">Make it memorable</GradientText>
    </PreviewFrame>
  );
}

export function FormPreview() {
  return (
    <PreviewFrame>
      <Card>
        <CardContent className="grid gap-3 p-4">
          <Input placeholder="Your email" />
          <Button>
            <Check data-icon="inline-start" />
            Join waitlist
          </Button>
          <Separator />
          <p className="text-center text-xs text-muted-foreground">No spam, ever.</p>
        </CardContent>
      </Card>
    </PreviewFrame>
  );
}
