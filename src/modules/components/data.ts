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
  uniqBy,
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
  tags: string[];
  preview: ComponentType;
  href: string;
  description: string;
  source: "legacy" | "shomaui";
  catalogItem?: CatalogItem;
};

type LegacyComponentCard = Omit<
  ComponentCardDefinition,
  "categorySlug" | "href" | "description" | "source" | "catalogItem"
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

const groupedComponentCards = groupBy(componentCards, "categorySlug");

export const componentCategories: ComponentCategory[] = [
  {
    slug: "all",
    label: "All Components",
    count: collectionSize(componentCards),
    href: "/components",
  },
  ...map(orderBy(keys(groupedComponentCards)), (slug) => {
    const firstCard = find(componentCards, { categorySlug: slug });

    return {
      slug,
      label: get(firstCard, "category", slug),
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
