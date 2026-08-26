import { Check, Copy, Home, Search, Settings, Sparkles } from "lucide-react";

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
import AnimatedList from "#/components/shomaui/components/animated-list";
import CopyButton from "#/components/shomaui/components/copy-button";
import Dock from "#/components/shomaui/components/dock";
import FileUpload from "#/components/shomaui/components/file-upload";
import GlassCard from "#/components/shomaui/components/glass-card";
import Rating from "#/components/shomaui/components/rating";
import SegmentedControl from "#/components/shomaui/components/segmented-control";
import StatusBadge from "#/components/shomaui/components/status-badge";
import Timeline from "#/components/shomaui/components/timeline";
import AuroraBackground from "#/components/shomaui/background/aurora-background";
import BubbleBackground from "#/components/shomaui/background/bubble-background";
import DotPattern from "#/components/shomaui/background/dot-pattern";
import FlickeringGrid from "#/components/shomaui/background/flickering-grid";
import GradientBackground from "#/components/shomaui/background/gradient-background";
import GridBackground from "#/components/shomaui/background/grid-background";
import HexagonBackground from "#/components/shomaui/background/hexagon-background";
import NoiseBackground from "#/components/shomaui/background/noise-background";
import RetroGrid from "#/components/shomaui/background/retro-grid";
import StarsBackground from "#/components/shomaui/background/stars-background";
import BlurFade from "#/components/shomaui/animations/blur-fade";
import GlowHoverCard from "#/components/shomaui/effects/glow-hover-card";
import BorderBeam from "#/components/shomaui/effects/border-beam";
import Confetti from "#/components/shomaui/effects/confetti";
import GlareHover from "#/components/shomaui/effects/glare-hover";
import ImageReveal from "#/components/shomaui/effects/image-reveal";
import Magnetic from "#/components/shomaui/effects/magnetic";
import Meteors from "#/components/shomaui/effects/meteors";
import ProgressiveBlur from "#/components/shomaui/effects/progressive-blur";
import ShineBorder from "#/components/shomaui/effects/shine-border";
import SpotlightCard from "#/components/shomaui/effects/spotlight-card";
import Marquee from "#/components/shomaui/animations/marquee";
import NumberTicker from "#/components/shomaui/animations/number-ticker";
import Reveal from "#/components/shomaui/animations/reveal";
import ScrollProgress from "#/components/shomaui/animations/scroll-progress";
import ShimmerLoader from "#/components/shomaui/animations/shimmer-loader";
import StackingCard from "#/components/shomaui/animations/stacking-card";
import AuroraText from "#/components/shomaui/text/aurora-text";
import GradientText from "#/components/shomaui/text/gradient-text";
import MorphingText from "#/components/shomaui/text/morphing-text";
import ShimmerText from "#/components/shomaui/text/shimmer-text";
import SparklesText from "#/components/shomaui/text/sparkles-text";
import TextHighlighter from "#/components/shomaui/text/text-highlighter";
import TextReveal from "#/components/shomaui/text/text-reveal";
import TypingText from "#/components/shomaui/text/typing-text";
import WordRotate from "#/components/shomaui/text/word-rotate";

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
        <AvatarGroup>{mapAvatars(["SK", "JD", "AM", "+4"])}</AvatarGroup>
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
          <TooltipTrigger
            render={<Button variant="outline" className="mx-auto flex" />}
          >
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

export function AnimatedListPreview() {
  return (
    <PreviewFrame>
      <AnimatedList
        items={[
          "Design tokens synced",
          "Review requested",
          "Release notes ready",
        ]}
      />
    </PreviewFrame>
  );
}

export function DockPreview() {
  return (
    <PreviewFrame>
      <Dock
        items={[
          { label: "Home", icon: <Home className="size-5" /> },
          { label: "Search", icon: <Search className="size-5" /> },
          { label: "Settings", icon: <Settings className="size-5" /> },
        ]}
      />
    </PreviewFrame>
  );
}

export function TimelinePreview() {
  return (
    <PreviewFrame>
      <Timeline />
    </PreviewFrame>
  );
}

export function RatingPreview() {
  return (
    <PreviewFrame>
      <Rating className="justify-center" value={4} />
    </PreviewFrame>
  );
}

export function FileUploadPreview() {
  return (
    <PreviewFrame>
      <FileUpload />
    </PreviewFrame>
  );
}

export function CopyButtonPreview() {
  return (
    <PreviewFrame>
      <CopyButton
        className="mx-auto"
        value="npx shadcn add https://shomaui.vercel.app/r/copy-button.json"
      >
        <Copy data-icon="inline-start" />
        Copy install command
      </CopyButton>
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
      <InteractiveHoverButton className="mx-auto">
        View details
      </InteractiveHoverButton>
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

export function FlickeringGridPreview() {
  return (
    <PreviewFrame>
      <FlickeringGrid>
        <div className="flex min-h-44 items-center justify-center">
          <div className="rounded-xl border bg-background/90 px-4 py-3 text-center shadow-sm">
            <p className="text-sm font-medium">Live workspace</p>
            <p className="mt-1 text-xs text-muted-foreground">
              A responsive grid in motion.
            </p>
          </div>
        </div>
      </FlickeringGrid>
    </PreviewFrame>
  );
}

export function RetroGridPreview() {
  return (
    <PreviewFrame>
      <RetroGrid>
        <div className="flex min-h-44 items-center justify-center text-center text-white">
          <p className="text-sm font-semibold tracking-wide">
            Future is a feeling
          </p>
        </div>
      </RetroGrid>
    </PreviewFrame>
  );
}

export function DotPatternPreview() {
  return (
    <PreviewFrame>
      <DotPattern>
        <div className="flex min-h-44 items-center justify-center">
          <span className="rounded-full border bg-background/90 px-4 py-2 text-xs font-medium shadow-sm">
            Dot pattern
          </span>
        </div>
      </DotPattern>
    </PreviewFrame>
  );
}

export function BubblePreview() {
  return (
    <PreviewFrame>
      <BubbleBackground>
        <div className="flex min-h-44 items-center justify-center text-center">
          <p className="text-sm font-medium">Float through the details.</p>
        </div>
      </BubbleBackground>
    </PreviewFrame>
  );
}

export function GradientBackgroundPreview() {
  return (
    <PreviewFrame>
      <GradientBackground>
        <div className="flex min-h-44 items-center justify-center text-center">
          <p className="text-sm font-medium">A soft gradient atmosphere.</p>
        </div>
      </GradientBackground>
    </PreviewFrame>
  );
}

export function HexagonPreview() {
  return (
    <PreviewFrame>
      <HexagonBackground>
        <div className="flex min-h-44 items-center justify-center">
          <span className="rounded-lg border bg-background/90 px-4 py-2 text-xs font-medium">
            Hex grid
          </span>
        </div>
      </HexagonBackground>
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
          <p className="max-w-44 text-sm font-medium">
            Soft color, sharp focus.
          </p>
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
        <p className="mt-1 text-xs text-muted-foreground">
          The light follows focus.
        </p>
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

export function BorderBeamPreview() {
  return (
    <PreviewFrame>
      <BorderBeam>
        <p className="text-sm font-medium">Beam around the edge</p>
        <p className="mt-1 text-xs text-muted-foreground">
          A focused loading or status surface.
        </p>
      </BorderBeam>
    </PreviewFrame>
  );
}

export function GlareHoverPreview() {
  return (
    <PreviewFrame>
      <GlareHover>
        <p className="text-sm font-medium">Move across the card</p>
        <p className="mt-1 text-xs text-muted-foreground">
          The glare follows your pointer.
        </p>
      </GlareHover>
    </PreviewFrame>
  );
}

export function MeteorsPreview() {
  return (
    <PreviewFrame>
      <Meteors>
        <div className="flex min-h-44 items-center justify-center text-center">
          <p className="text-sm font-medium">Make a moment feel cosmic.</p>
        </div>
      </Meteors>
    </PreviewFrame>
  );
}

export function ConfettiPreview() {
  return (
    <PreviewFrame>
      <div className="flex justify-center">
        <Confetti>Celebrate release</Confetti>
      </div>
    </PreviewFrame>
  );
}

export function ProgressiveBlurPreview() {
  return (
    <PreviewFrame>
      <ProgressiveBlur>
        <p className="text-sm leading-7">
          Progressive blur keeps long content comfortable to scan even when a
          card needs a compact height.
        </p>
      </ProgressiveBlur>
    </PreviewFrame>
  );
}

export function ImageRevealPreview() {
  return (
    <PreviewFrame>
      <ImageReveal
        src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=640&q=80"
        alt="Mountain landscape"
      />
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
        <p className="mt-1 text-xs text-muted-foreground">
          A subtle glow and shadow.
        </p>
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
            {["UI", "UX", "DX", "AI"][index]}
          </span>
        ))}
      </Marquee>
    </PreviewFrame>
  );
}

export function BlurFadePreview() {
  return (
    <PreviewFrame>
      <BlurFade className="rounded-xl border bg-background p-5" delay={80}>
        <p className="text-sm font-medium">Fade in with intention.</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Viewport-aware and reduced-motion friendly.
        </p>
      </BlurFade>
    </PreviewFrame>
  );
}

export function StackingCardPreview() {
  return (
    <PreviewFrame>
      <StackingCard cards={["Plan", "Design", "Deliver"]} />
    </PreviewFrame>
  );
}

export function ShimmerLoaderPreview() {
  return (
    <PreviewFrame>
      <ShimmerLoader />
    </PreviewFrame>
  );
}

export function ScrollProgressPreview() {
  return (
    <PreviewFrame>
      <div className="relative h-40 overflow-hidden rounded-lg border bg-muted/20 p-4">
        <ScrollProgress />
        <div className="grid gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-full rounded bg-muted" />
          <span className="h-2 w-5/6 rounded bg-muted" />
          <span className="h-2 w-2/3 rounded bg-muted" />
          <span className="h-16 rounded bg-muted/70" />
        </div>
      </div>
    </PreviewFrame>
  );
}

export function RevealPreview() {
  return (
    <PreviewFrame>
      <Reveal className="rounded-xl border bg-background p-5">
        <p className="text-sm font-medium">Reveal on scroll</p>
        <p className="mt-1 text-xs text-muted-foreground">
          IntersectionObserver powered.
        </p>
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
        <p className="mt-1 text-xs text-muted-foreground">
          monthly active users
        </p>
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
      <ShimmerText className="text-xl font-semibold">
        ShomaUI in motion
      </ShimmerText>
    </PreviewFrame>
  );
}

export function GradientPreview() {
  return (
    <PreviewFrame>
      <GradientText className="text-center text-2xl font-bold">
        Make it memorable
      </GradientText>
    </PreviewFrame>
  );
}

export function AuroraTextPreview() {
  return (
    <PreviewFrame>
      <AuroraText className="text-center text-2xl font-bold">
        Stay curious
      </AuroraText>
    </PreviewFrame>
  );
}

export function SparklesTextPreview() {
  return (
    <PreviewFrame>
      <SparklesText className="text-center text-2xl font-bold">
        A little magic
      </SparklesText>
    </PreviewFrame>
  );
}

export function MorphingTextPreview() {
  return (
    <PreviewFrame>
      <div className="text-center text-xl font-semibold">
        Build something <MorphingText className="text-primary" />
      </div>
    </PreviewFrame>
  );
}

export function TextRevealPreview() {
  return (
    <PreviewFrame>
      <TextReveal className="text-center text-2xl font-bold">
        Reveal the idea
      </TextReveal>
    </PreviewFrame>
  );
}

export function TextHighlighterPreview() {
  return (
    <PreviewFrame>
      <p className="text-center text-xl font-semibold">
        Make the <TextHighlighter>important</TextHighlighter> part clear.
      </p>
    </PreviewFrame>
  );
}

export function WordRotatePreview() {
  return (
    <PreviewFrame>
      <div className="text-center text-xl font-semibold">
        We <WordRotate className="text-primary" /> together.
      </div>
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
          <p className="text-center text-xs text-muted-foreground">
            No spam, ever.
          </p>
        </CardContent>
      </Card>
    </PreviewFrame>
  );
}
