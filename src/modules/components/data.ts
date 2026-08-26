import type { ComponentType } from "react";
import { size as collectionSize } from "lodash";

import {
  AccordionPreview,
  AlertDialogPreview,
  AlertPreview,
  AspectRatioPreview,
  AutocompletePreview,
  AvatarPreview,
  BadgePreview,
  BreadcrumbPreview,
  ButtonPreview,
  TooltipPreview,
} from "#/modules/components/previews.tsx";
import { avatarExamples } from "./containers/avatar/examples.tsx";
import { buttonExamples } from "./containers/button/examples.tsx";
import { tooltipExamples } from "./containers/tooltip/examples.tsx";

export type ComponentCategory = {
  slug: string;
  label: string;
  count: number;
  href: string;
  isNew?: boolean;
};

export type ComponentCardDefinition = {
  slug: string;
  name: string;
  count: number;
  category: string;
  tags: string[];
  preview: ComponentType;
};

export const componentCards: ComponentCardDefinition[] = [
  {
    slug: "accordion",
    name: "Accordion",
    count: 11,
    category: "accordion",
    tags: ["Filters"],
    preview: AccordionPreview,
  },
  {
    slug: "alert",
    name: "Alert",
    count: 20,
    category: "alert",
    tags: ["Filters"],
    preview: AlertPreview,
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    count: 14,
    category: "alert-dialog",
    tags: ["Filters"],
    preview: AlertDialogPreview,
  },
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    count: 8,
    category: "aspect-ratio",
    tags: ["Chart"],
    preview: AspectRatioPreview,
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    count: 12,
    category: "autocomplete",
    tags: ["Data Grid"],
    preview: AutocompletePreview,
  },
  {
    slug: "avatar",
    name: "Avatar",
    count: collectionSize(avatarExamples),
    category: "avatar",
    tags: ["Kanban"],
    preview: AvatarPreview,
  },
  {
    slug: "button",
    name: "Button",
    count: collectionSize(buttonExamples),
    category: "button",
    tags: ["Navigation"],
    preview: ButtonPreview,
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    count: collectionSize(tooltipExamples),
    category: "tooltip",
    tags: ["Navigation"],
    preview: TooltipPreview,
  },
  {
    slug: "badge",
    name: "Badge",
    count: 25,
    category: "badge",
    tags: ["Filters"],
    preview: BadgePreview,
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    count: 15,
    category: "breadcrumb",
    tags: ["Navigation"],
    preview: BreadcrumbPreview,
  },
];

export const componentCategories: ComponentCategory[] = [
  {
    slug: "all",
    label: "All Components",
    count: collectionSize(componentCards),
    href: "/components",
  },
  // { slug: "accordion", label: "Accordion", count: 11, href: "/components/accordion" },
  // { slug: "alert", label: "Alert", count: 20, href: "/components/alert" },
  // { slug: "alert-dialog", label: "Alert Dialog", count: 14, href: "/components/alert-dialog" },
  // { slug: "aspect-ratio", label: "Aspect Ratio", count: 8, href: "/components/aspect-ratio" },
  // { slug: "autocomplete", label: "Autocomplete", count: 12, href: "/components/autocomplete" },
  {
    slug: "avatar",
    label: "Avatar",
    count: collectionSize(avatarExamples),
    href: "/components/avatar",
  },
  {
    slug: "button",
    label: "Button",
    count: collectionSize(buttonExamples),
    href: "/components/button",
  },
  {
    slug: "tooltip",
    label: "Tooltip",
    count: collectionSize(tooltipExamples),
    href: "/components/tooltip",
  },
  // { slug: "badge", label: "Badge", count: 25, href: "/components/badge" },
  // { slug: "breadcrumb", label: "Breadcrumb", count: 15, href: "/components/breadcrumb" },
  // { slug: "button-group", label: "Button Group", count: 57, href: "/components/button-group" },
  // { slug: "calendar", label: "Calendar", count: 30, href: "/components/calendar" },
  // { slug: "card", label: "Card", count: 18, href: "/components/card" },
  // { slug: "carousel", label: "Carousel", count: 11, href: "/components/carousel" },
  // { slug: "cascader", label: "Cascader", count: 20, href: "/components/cascader", isNew: true },
  // { slug: "chart", label: "Chart", count: 25, href: "/components/chart" },
  // { slug: "checkbox", label: "Checkbox", count: 22, href: "/components/checkbox" },
  // { slug: "code-block", label: "Code Block", count: 27, href: "/components/code-block", isNew: true },
  // { slug: "collapsible", label: "Collapsible", count: 10, href: "/components/collapsible" },
  // { slug: "combobox", label: "Combobox", count: 28, href: "/components/combobox" },
  // { slug: "command", label: "Command", count: 8, href: "/components/command" },
  // { slug: "context-menu", label: "Context Menu", count: 10, href: "/components/context-menu" },
  // { slug: "data-grid", label: "Data Grid", count: 30, href: "/components/data-grid", isNew: true },
];

export const componentTopics = [
  "Data Grid",
  "Event Calendar",
  "Gantt",
  "Cascader",
  "Filters",
  "Kanban",
  "File Upload",
  "Chart",
] as const;

export type ComponentTopic = (typeof componentTopics)[number];
