import { concat, kebabCase, map } from "lodash";
import type { CatalogItem } from "./data";
import { getReferencePreview } from "./reference-previews";

const sourceLinks = {
  magic: "https://magicui.design/docs/components",
  reui: "https://reui.io/components",
  layouts: "https://www.ui-layouts.com/components/buttons",
  triple: "https://ui.tripled.work/components",
  animate: "https://animate-ui.com/docs/components/backgrounds/stars",
  smooth: "https://smoothui.dev/docs/components/dropdown-menu",
} as const;

type SourceKey = keyof typeof sourceLinks;
type ReferenceSpec = {
  slug: string;
  name: string;
  exportName: string;
  category: string;
  source: SourceKey;
};
type SpecTuple = [
  slug: string,
  name: string,
  exportName: string,
  source: SourceKey,
];

const createSpecs = (
  category: string,
  specs: readonly SpecTuple[],
): ReferenceSpec[] =>
  map(specs, ([slug, name, exportName, source]) => ({
    slug,
    name,
    exportName,
    category,
    source,
  }));

const referenceSpecs = concat(
  createSpecs("Buttons", [
    ["shimmer-button", "Shimmer Button", "ShimmerButton", "magic"],
    ["pulsating-button", "Pulsating Button", "PulsatingButton", "magic"],
    ["magnetic-button", "Magnetic Button", "MagneticButton", "smooth"],
    [
      "clip-corners-button",
      "Clip Corners Button",
      "ClipCornersButton",
      "smooth",
    ],
    ["dot-morph-button", "Dot Morph Button", "DotMorphButton", "smooth"],
    ["flip-button", "Flip Button", "FlipButton", "triple"],
    ["icon-button", "Icon Button", "IconButton", "reui"],
    ["loading-button", "Loading Button", "LoadingButton", "reui"],
    ["split-button", "Split Button", "SplitButton", "reui"],
    ["download-button", "Download Button", "DownloadButton", "layouts"],
    ["hold-button", "Hold Button", "HoldButton", "layouts"],
    ["social-button", "Social Button", "SocialButton", "animate"],
  ]),
  createSpecs("Forms", [
    ["input", "Animated Input", "InputField", "smooth"],
    ["input-otp", "Input OTP", "InputOtpField", "reui"],
    ["phone-input", "Phone Input", "PhoneInput", "reui"],
    ["number-field", "Number Field", "NumberField", "reui"],
    ["color-picker", "Color Picker", "ColorPicker", "layouts"],
    ["range-slider", "Range Slider", "RangeSlider", "layouts"],
    ["date-range-picker", "Date Range Picker", "DateRangePicker", "reui"],
    ["multi-select", "Multi Selector", "MultiSelect", "layouts"],
    [
      "searchable-dropdown",
      "Searchable Dropdown",
      "SearchableDropdown",
      "smooth",
    ],
    ["password-field", "Password Field", "PasswordField", "layouts"],
    ["tag-input", "Tag Input", "TagInput", "smooth"],
    ["form-stepper", "Form Stepper", "FormStepper", "reui"],
    ["filter-panel", "Filter Panel", "FilterPanel", "reui"],
    ["radio-card-group", "Radio Card Group", "RadioCardGroup", "animate"],
    ["checkbox-group", "Checkbox Group", "CheckboxGroup", "animate"],
    [
      "animated-file-upload",
      "Animated File Upload",
      "AnimatedFileUpload",
      "smooth",
    ],
  ]),
  createSpecs("Navigation", [
    ["pagination", "Pagination", "PaginationBar", "reui"],
    ["tabs", "Animated Tabs", "TabsNavigation", "animate"],
    ["mega-menu", "Mega Menu", "MegaMenu", "layouts"],
    ["navigation-rail", "Navigation Rail", "NavigationRail", "reui"],
    ["command-menu", "Command Menu", "CommandMenu", "smooth"],
    ["dropdown-menu", "Dropdown Menu", "DropdownMenu", "smooth"],
    ["context-menu-card", "Context Menu", "ContextMenu", "smooth"],
    ["menu-bar", "Menu Bar", "MenuBar", "animate"],
    ["stepper", "Stepper", "StepperNavigation", "reui"],
    ["link-preview", "Link Preview", "LinkPreview", "magic"],
    ["sidebar-nav", "Sidebar Navigation", "SidebarNavigation", "reui"],
    [
      "breadcrumb-nav",
      "Breadcrumb Navigation",
      "BreadcrumbNavigation",
      "smooth",
    ],
  ]),
  createSpecs("Feedback", [
    ["toast-stack", "Toast Stack", "ToastStack", "smooth"],
    ["progress-card", "Progress Card", "ProgressCard", "reui"],
    ["notification-badge", "Notification Badge", "NotificationBadge", "smooth"],
    ["success-alert", "Success Alert", "SuccessAlert", "reui"],
    ["warning-alert", "Warning Alert", "WarningAlert", "reui"],
    ["empty-state", "Empty State", "EmptyState", "reui"],
    ["skeleton-card", "Skeleton Card", "SkeletonCard", "smooth"],
    ["confirm-dialog", "Confirm Dialog", "ConfirmDialog", "animate"],
    ["status-chip", "Status Chip", "StatusChip", "reui"],
    ["animated-progress", "Animated Progress", "AnimatedProgress", "smooth"],
  ]),
  createSpecs("Layout", [
    ["bento-grid", "Bento Grid", "BentoGrid", "magic"],
    ["masonry-grid", "Masonry Grid", "MasonryGrid", "layouts"],
    ["split-pane", "Split Pane", "SplitPane", "reui"],
    ["resizable-panels", "Resizable Panels", "ResizablePanels", "reui"],
    ["accordion-stack", "Accordion Stack", "AccordionStack", "animate"],
    ["collapsible-card", "Collapsible Card", "CollapsibleCard", "smooth"],
    ["header", "Responsive Header", "HeaderLayout", "layouts"],
    ["footer", "Footer Layout", "FooterLayout", "layouts"],
    ["aspect-ratio-media", "Aspect Ratio Media", "AspectRatioMedia", "reui"],
    ["expandable-card", "Expandable Card", "ExpandableCard", "triple"],
  ]),
  createSpecs("Data", [
    ["data-grid-pro", "Data Grid", "DataGridPro", "reui"],
    ["event-calendar", "Event Calendar", "EventCalendar", "reui"],
    ["gantt-chart", "Gantt Chart", "GanttChart", "reui"],
    ["kanban-board", "Kanban Board", "KanbanBoard", "reui"],
    ["sortable-list", "Sortable List", "SortableList", "reui"],
    ["tree-view", "Tree View", "TreeView", "reui"],
    ["stats-card", "Stats Card", "StatsCard", "reui"],
    ["activity-feed", "Activity Feed", "ActivityFeed", "reui"],
    ["schedule-board", "Schedule Board", "ScheduleBoard", "reui"],
    ["comparison-table", "Comparison Table", "ComparisonTable", "reui"],
    ["data-list", "Data List", "DataList", "reui"],
    ["chart-card", "Chart Card", "ChartCard", "reui"],
    ["stepper-table", "Stepper Table", "StepperTable", "reui"],
    ["filter-table", "Filter Table", "FilterTable", "reui"],
    [
      "horizontal-timeline",
      "Horizontal Timeline",
      "HorizontalTimeline",
      "reui",
    ],
  ]),
  createSpecs("Media", [
    ["carousel-gallery", "Carousel Gallery", "CarouselGallery", "layouts"],
    ["image-mask", "Image Mask", "ImageMask", "layouts"],
    ["video-card", "Video Card", "VideoCard", "magic"],
    ["product-card", "Product Card", "ProductCard", "reui"],
    ["photo-stack", "Photo Stack", "PhotoStack", "smooth"],
    ["image-tabs", "Image Tabs", "ImageTabs", "layouts"],
    ["media-modal", "Media Modal", "MediaModal", "layouts"],
    ["avatar-circles", "Avatar Circles", "AvatarCircles", "magic"],
  ]),
  createSpecs("Content", [
    ["tweet-card", "Tweet Card", "TweetCard", "magic"],
    ["testimonial-card", "Testimonial Card", "TestimonialCard", "reui"],
    ["feature-list", "Feature List", "FeatureList", "reui"],
    ["announcement-card", "Announcement Card", "AnnouncementCard", "magic"],
    ["pricing-card", "Pricing Card", "PricingCard", "reui"],
    ["blog-card", "Blog Card", "BlogCard", "reui"],
    ["file-tree", "File Tree", "FileTree", "magic"],
    ["terminal-card", "Terminal Card", "TerminalCard", "magic"],
  ]),
  createSpecs("Profiles", [
    ["profile-card", "Profile Card", "ProfileCard", "reui"],
    ["user-presence", "User Presence", "UserPresence", "animate"],
    ["team-stack", "Team Stack", "TeamStack", "triple"],
    ["account-menu", "Account Menu", "AccountMenu", "smooth"],
    ["contact-card", "Contact Card", "ContactCard", "reui"],
    ["profile-stat", "Profile Stats", "ProfileStat", "reui"],
  ]),
  createSpecs("Code", [
    ["code-block-pro", "Code Block", "CodeBlock", "layouts"],
    ["code-tabs", "Code Tabs", "CodeTabs", "animate"],
    ["code-comparison", "Code Comparison", "CodeComparison", "magic"],
    ["terminal", "Terminal", "Terminal", "magic"],
    ["diff-viewer", "Diff Viewer", "DiffViewer", "reui"],
  ]),
  createSpecs("Surfaces", [
    ["neon-card", "Neon Card", "NeonCard", "magic"],
    ["magic-card", "Magic Card", "MagicCard", "magic"],
    ["spotlight-surface", "Spotlight Surface", "SpotlightSurface", "layouts"],
    [
      "gradient-border-card",
      "Gradient Border Card",
      "GradientBorderCard",
      "layouts",
    ],
    ["liquid-glass", "Liquid Glass", "LiquidGlass", "layouts"],
  ]),
) as ReferenceSpec[];

const referenceComponentFile =
  "src/components/shomaui/components/reference-components.tsx";

export const referenceCatalogItems: CatalogItem[] = map(
  referenceSpecs,
  (spec) => ({
    slug: spec.slug,
    name: spec.name,
    kind: "components",
    category: spec.category,
    description: `${spec.name} pattern for accessible product interfaces and responsive layouts.`,
    tags: [kebabCase(spec.category), spec.source, "base-ui"],
    preview: getReferencePreview(
      spec.slug as Parameters<typeof getReferencePreview>[0],
    ),
    sourceFile: referenceComponentFile,
    registryName: spec.slug,
    dependencies: ["@base-ui/react", "lodash", "lucide-react"],
    code: `import { ${spec.exportName} } from "@/components/shomaui/components/reference-components";\n\n<${spec.exportName} />`,
    sourceUrl: sourceLinks[spec.source],
    author: "ShomaUI",
    license: "MIT-compatible original adaptation",
    attribution: `Inspired by ${spec.source} reference patterns; implemented as an original ShomaUI component.`,
  }),
);

export const referenceComponentSpecs = referenceSpecs;
