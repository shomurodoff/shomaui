import type { ComponentType, SVGProps } from "react";
import {
  BadgeDollarSign,
  Blocks,
  BookOpen,
  Component,
  Activity,
  Eclipse,
  LayoutTemplate,
  LifeBuoy,
  Map,
  Server,
  Sparkles,
  TextCursorInput,
  WandSparkles,
} from "lucide-react";

export type SiteIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type SitePath =
  | "/"
  | "/components"
  | "/backgrounds"
  | "/effects"
  | "/animations"
  | "/texts"
  | "/blocks"
  | "/templates"
  | "/icons"
  | "/all-access"
  | "/mcp-server"
  | "/agent-skills"
  | "/roadmap"
  | "/docs"
  | "/support"
  | "/pricing"
  | "/figma";

export type SiteNavigationItem = {
  label: string;
  href: SitePath;
  description: string;
  icon: SiteIcon;
  badge?: string;
  badgeVariant?: "default" | "outline";
};

export const productItems = [
  {
    label: "Components",
    href: "/components",
    description: "Copy-ready product building blocks",
    icon: Component,
    badge: "Open-source",
    badgeVariant: "outline",
  },
  {
    label: "Backgrounds",
    href: "/backgrounds",
    description: "Atmospheric surfaces and patterns",
    icon: Eclipse,
    badge: "New",
    badgeVariant: "outline",
  },
  {
    label: "Effects",
    href: "/effects",
    description: "Pointer, hover and glow interactions",
    icon: Sparkles,
  },
  {
    label: "Animations",
    href: "/animations",
    description: "Motion primitives for modern interfaces",
    icon: Activity,
  },
  {
    label: "Texts",
    href: "/texts",
    description: "Expressive text animation and type",
    icon: TextCursorInput,
  },
  {
    label: "Blocks",
    href: "/blocks",
    description: "510+ production-ready Pro blocks",
    icon: Blocks,
    badge: "Pro",
  },
  {
    label: "Templates",
    href: "/templates",
    description: "14 full-page starter templates",
    icon: LayoutTemplate,
    badge: "Ultimate",
  },
] as const satisfies readonly SiteNavigationItem[];

export const allAccessItem = {
  label: "Get All-Access",
  href: "/all-access",
  description: "Every Pro block, template, and update.",
  icon: Sparkles,
} as const satisfies SiteNavigationItem;

export const resourceItems = [
  {
    label: "MCP Server",
    href: "/mcp-server",
    description: "Your agent installs real SHOMAUI, not hallucinated UI.",
    icon: Server,
  },
  {
    label: "Agent Skills",
    href: "/agent-skills",
    description: "Skills that turn your agent into a SHOMAUI expert.",
    icon: WandSparkles,
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    description: "Every SHOMAUI release and what is shipping next.",
    icon: Map,
    badge: "New",
  },
] as const satisfies readonly SiteNavigationItem[];

export const primaryItems = [
  {
    label: "Docs",
    href: "/docs",
    description: "Learn how to build with SHOMAUI.",
    icon: BookOpen,
  },
  {
    label: "Support",
    href: "/support",
    description: "Get help with your SHOMAUI workflow.",
    icon: LifeBuoy,
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Explore SHOMAUI plans and access.",
    icon: BadgeDollarSign,
  },
] as const satisfies readonly SiteNavigationItem[];

export const commandGroups: readonly {
  label: string;
  items: readonly SiteNavigationItem[];
}[] = [
  { label: "Products", items: [...productItems, allAccessItem] },
  { label: "Resources", items: resourceItems },
  { label: "More", items: primaryItems },
];
