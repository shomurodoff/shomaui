import type { ComponentType } from "react";
import {
  concat,
  find,
  get,
  groupBy,
  kebabCase,
  keys,
  map,
  orderBy,
  size as collectionSize,
  startCase,
  uniqBy,
  uniq,
} from "lodash";

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
import { getCatalogItems, type CatalogItem } from "#/modules/catalog/data";
import {
  ButtonGroup,
  CarouselGallery,
  ChartCard,
  CheckboxGroup,
  CodeBlock,
  CollapsibleCard,
  CommandMenu,
  ContextMenu,
  DataGridPro,
  EventCalendar,
  FilterPanel,
  ProfileCard,
  SearchableDropdown,
} from "#/components/shomaui/components/reference-components";
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
  categorySlug: string;
  groupSlug: string;
  groupName: string;
  tags: string[];
  preview: ComponentType;
  href: string;
  description: string;
  source: "legacy" | "shomaui";
  catalogItem?: CatalogItem;
};

type LegacyComponentCard = Omit<
  ComponentCardDefinition,
  | "categorySlug"
  | "groupSlug"
  | "groupName"
  | "href"
  | "description"
  | "source"
  | "catalogItem"
>;

const legacyComponentCards: LegacyComponentCard[] = [
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

const additionalLegacyComponentCards: LegacyComponentCard[] = [
  {
    slug: "button-group",
    name: "Button Group",
    count: 1,
    category: "Buttons",
    tags: ["actions"],
    preview: ButtonGroup,
  },
  {
    slug: "calendar",
    name: "Calendar",
    count: 1,
    category: "Data",
    tags: ["data"],
    preview: EventCalendar,
  },
  {
    slug: "card",
    name: "Card",
    count: 1,
    category: "Layout",
    tags: ["layout"],
    preview: ProfileCard,
  },
  {
    slug: "carousel",
    name: "Carousel",
    count: 1,
    category: "Media",
    tags: ["media"],
    preview: CarouselGallery,
  },
  {
    slug: "cascader",
    name: "Cascader",
    count: 1,
    category: "Forms",
    tags: ["forms"],
    preview: FilterPanel,
  },
  {
    slug: "chart",
    name: "Chart",
    count: 1,
    category: "Data",
    tags: ["data"],
    preview: ChartCard,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    count: 1,
    category: "Forms",
    tags: ["forms"],
    preview: CheckboxGroup,
  },
  {
    slug: "code-block",
    name: "Code Block",
    count: 1,
    category: "Code",
    tags: ["code"],
    preview: CodeBlock,
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    count: 1,
    category: "Layout",
    tags: ["layout"],
    preview: CollapsibleCard,
  },
  {
    slug: "combobox",
    name: "Combobox",
    count: 1,
    category: "Forms",
    tags: ["forms"],
    preview: SearchableDropdown,
  },
  {
    slug: "command",
    name: "Command",
    count: 1,
    category: "Navigation",
    tags: ["navigation"],
    preview: CommandMenu,
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    count: 1,
    category: "Navigation",
    tags: ["navigation"],
    preview: ContextMenu,
  },
  {
    slug: "data-grid",
    name: "Data Grid",
    count: 1,
    category: "Data",
    tags: ["data"],
    preview: DataGridPro,
  },
];

const componentFamilyBySlug: Record<string, string> = {
  "rainbow-button": "button",
  "ripple-button": "button",
  "shiny-button": "button",
  "interactive-hover-button": "button",
  "copy-button": "button",
  "shimmer-button": "button",
  "pulsating-button": "button",
  "magnetic-button": "button",
  "clip-corners-button": "button",
  "dot-morph-button": "button",
  "flip-button": "button",
  "icon-button": "button",
  "loading-button": "button",
  "split-button": "button",
  "download-button": "button",
  "hold-button": "button",
  "social-button": "button",
  "input-otp": "input-otp",
  "phone-input": "phone-input",
  "number-field": "number-field",
  "color-picker": "color-picker",
  "range-slider": "slider",
  "date-range-picker": "date-selector",
  "multi-select": "select",
  "searchable-dropdown": "combobox",
  "password-field": "input",
  "tag-input": "input",
  "form-stepper": "stepper",
  "filter-panel": "filters",
  "radio-card-group": "radio-group",
  "checkbox-group": "checkbox",
  "animated-file-upload": "file-upload",
  "mega-menu": "navigation-menu",
  "navigation-rail": "navigation-menu",
  "command-menu": "command",
  "dropdown-menu": "dropdown-menu",
  "context-menu-card": "context-menu",
  "menu-bar": "menubar",
  "link-preview": "link-preview",
  "sidebar-nav": "navigation-menu",
  "breadcrumb-nav": "breadcrumb",
  "toast-stack": "sonner",
  "progress-card": "progress",
  "notification-badge": "badge",
  "empty-state": "empty",
  "skeleton-card": "skeleton",
  "confirm-dialog": "dialog",
  "status-chip": "badge",
  "animated-progress": "progress",
  "bento-grid": "bento-grid",
  "masonry-grid": "masonry-grid",
  "split-pane": "resizable",
  "resizable-panels": "resizable",
  "accordion-stack": "accordion",
  "collapsible-card": "collapsible",
  "aspect-ratio-media": "aspect-ratio",
  "data-grid-pro": "data-grid",
  "event-calendar": "event-calendar",
  "gantt-chart": "gantt",
  "kanban-board": "kanban",
  "sortable-list": "sortable",
  "tree-view": "tree",
  "stats-card": "stats",
  "activity-feed": "timeline",
  "schedule-board": "schedule",
  "comparison-table": "table",
  "data-list": "list",
  "chart-card": "chart",
  "stepper-table": "stepper",
  "filter-table": "filters",
  "horizontal-timeline": "timeline",
  "carousel-gallery": "carousel",
  "image-tabs": "tabs",
  "media-modal": "dialog",
  "avatar-circles": "avatar",
  "code-block-pro": "code-block",
  "code-tabs": "code-tabs",
  "code-comparison": "code-comparison",
  "neon-card": "card",
  "magic-card": "card",
  "spotlight-surface": "card",
  "gradient-border-card": "card",
  "liquid-glass": "card",
};

const componentFamilyNameBySlug: Record<string, string> = {
  "input-otp": "Input Otp",
  "date-selector": "Date Selector",
  "radio-group": "Radio Group",
  "navigation-menu": "Navigation Menu",
  menubar: "Menubar",
  "context-menu": "Context Menu",
  "dropdown-menu": "Dropdown Menu",
  "link-preview": "Link Preview",
  sonner: "Sonner",
  empty: "Empty",
  skeleton: "Skeleton",
  dialog: "Dialog",
  progress: "Progress",
  "bento-grid": "Bento Grid",
  "masonry-grid": "Masonry Grid",
  resizable: "Resizable",
  accordion: "Accordion",
  collapsible: "Collapsible",
  "aspect-ratio": "Aspect Ratio",
  "data-grid": "Data Grid",
  "event-calendar": "Event Calendar",
  gantt: "Gantt",
  kanban: "Kanban",
  sortable: "Sortable",
  tree: "Tree",
  stats: "Stats",
  timeline: "Timeline",
  schedule: "Schedule",
  table: "Table",
  list: "List",
  chart: "Chart",
  stepper: "Stepper",
  filters: "Filters",
  carousel: "Carousel",
  tabs: "Tabs",
  avatar: "Avatar",
  "code-block": "Code Block",
  "code-tabs": "Code Tabs",
  "code-comparison": "Code Comparison",
  card: "Card",
};

export const getComponentFamily = (slug: string, name: string) => {
  const groupSlug = get(componentFamilyBySlug, slug, kebabCase(name));

  return {
    groupSlug,
    groupName: get(componentFamilyNameBySlug, groupSlug, startCase(groupSlug)),
  };
};

const legacyCategoryBySlug: Record<string, string> = {
  accordion: "Layout",
  alert: "Feedback",
  "alert-dialog": "Feedback",
  "aspect-ratio": "Layout",
  autocomplete: "Forms",
  avatar: "Profiles",
  badge: "Feedback",
  breadcrumb: "Navigation",
  button: "Buttons",
  tooltip: "Feedback",
};

const legacyDescriptionBySlug: Record<string, string> = {
  accordion: "Expandable sections for progressive disclosure.",
  alert: "Inline feedback for status, validation and announcements.",
  "alert-dialog": "A focused confirmation dialog for destructive actions.",
  "aspect-ratio": "A predictable media frame that preserves its ratio.",
  autocomplete: "Searchable suggestions for fast form completion.",
  avatar: "Identity primitives for people, teams and presence.",
  badge: "Compact labels for status, category and metadata.",
  breadcrumb: "Contextual navigation for nested product surfaces.",
  button: "Accessible actions with consistent variants and sizes.",
  tooltip: "Contextual help that works with pointer and keyboard input.",
};

const normalizeLegacyCard = (
  card: LegacyComponentCard,
): ComponentCardDefinition => {
  const category = get(legacyCategoryBySlug, card.slug, card.category);

  return {
    ...card,
    category,
    categorySlug: kebabCase(category),
    ...getComponentFamily(card.slug, card.name),
    href: `/components/${card.slug}`,
    description: get(
      legacyDescriptionBySlug,
      card.slug,
      `${card.name} for product interfaces.`,
    ),
    source: "legacy",
  };
};

const shomauiComponentCards: ComponentCardDefinition[] = map(
  getCatalogItems("components"),
  (item) => ({
    slug: item.slug,
    name: item.name,
    count: 1,
    category: item.category,
    categorySlug: kebabCase(item.category),
    ...getComponentFamily(item.slug, item.name),
    tags: item.tags,
    preview: item.preview,
    href: `/components/${item.slug}`,
    description: item.description,
    source: "shomaui",
    catalogItem: item,
  }),
);

export const componentCards = uniqBy(
  concat(
    map(
      [...legacyComponentCards, ...additionalLegacyComponentCards],
      normalizeLegacyCard,
    ),
    shomauiComponentCards,
  ),
  "slug",
);

const groupedComponentCards = groupBy(componentCards, "groupSlug");

const componentFamilyOrder = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "cascader",
  "chart",
  "checkbox",
  "code-block",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "data-grid",
  "date-selector",
  "dialog",
  "dropdown-menu",
  "empty",
  "event-calendar",
  "file-upload",
  "filters",
  "gantt",
  "kanban",
  "input",
  "input-otp",
  "number-field",
  "phone-input",
  "pagination",
  "progress",
  "radio-group",
  "rating",
  "resizable",
  "select",
  "skeleton",
  "slider",
  "sortable",
  "sonner",
  "stepper",
  "tabs",
  "table",
  "timeline",
  "tooltip",
  "tree",
];

const orderedComponentFamilySlugs = uniq(
  concat(componentFamilyOrder, orderBy(keys(groupedComponentCards))),
);

export const componentCategories: ComponentCategory[] = [
  {
    slug: "all",
    label: "All Components",
    count: collectionSize(componentCards),
    href: "/components",
  },
  ...map(orderedComponentFamilySlugs, (slug) => {
    const firstCard = find(componentCards, { groupSlug: slug });

    return {
      slug,
      label: get(firstCard, "groupName", startCase(slug)),
      count: collectionSize(get(groupedComponentCards, slug, [])),
      href: "/components",
    };
  }),
];

export const getComponentCard = (slug: string) =>
  find(componentCards, { slug });

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
