import { concat, kebabCase, map } from "lodash";
import type { ComponentType } from "react";

import {
  ActionDropdownPreview,
  AIChatInterfacePreview,
  AvatarExpandPreview,
  BottomModalPreview,
  ContactComposerPreview,
  CounterUpPreview,
  CurrencyConverterCardPreview,
  DraggableListPreview,
  FloatingChatWidgetPreview,
  FlipTextPreview,
  FollowCursorLabelPreview,
  FolderAnimationPreview,
  HolographicBackgroundPreview,
  ImageCheckboxPreview,
  LiquidButtonPreview,
  LikesCounterPreview,
  MorphingButtonPreview,
  NativeUserCardPreview,
  NestedListPreview,
  NotificationBellPreview,
  NotchCardPreview,
  PreviewDetailsCardPreview,
  QuickCommandPreview,
  SocialLoginButtonPreview,
  UploadDropzonePreview,
  VerifiedBadgePreview,
  VolumeComponentPreview,
} from "./tripled-previews";
import type { CatalogItem, CatalogKind } from "./data";

const sourceUrl = "https://ui.tripled.work/components";
const sourceFile = "src/components/shomaui/components/tripled-components.tsx";
const dependencies = ["@base-ui/react", "lodash", "lucide-react", "motion"];

type TripledSpec = {
  slug: string;
  name: string;
  kind: CatalogKind;
  category: string;
  description: string;
  tags: string[];
  preview: ComponentType;
  componentName: string;
};

const specs: TripledSpec[] = [
  {
    slug: "native-user-card",
    name: "Native User Card",
    kind: "components",
    category: "Profiles",
    description:
      "Profile identity card with presence, verification and compact stats.",
    tags: ["profile", "identity", "presence"],
    preview: NativeUserCardPreview,
    componentName: "NativeUserCard",
  },
  {
    slug: "likes-counter",
    name: "Likes Counter",
    kind: "components",
    category: "Feedback",
    description:
      "A tactile like toggle with accessible pressed state and count feedback.",
    tags: ["like", "counter", "feedback"],
    preview: LikesCounterPreview,
    componentName: "LikesCounter",
  },
  {
    slug: "social-login-button",
    name: "Social Login Button",
    kind: "components",
    category: "Buttons",
    description:
      "Provider actions for GitHub and X sign-in flows with connection feedback.",
    tags: ["auth", "social", "button"],
    preview: SocialLoginButtonPreview,
    componentName: "SocialLoginButton",
  },
  {
    slug: "notification-bell",
    name: "Notification Bell",
    kind: "components",
    category: "Feedback",
    description:
      "Unread notification trigger that clears its badge when opened.",
    tags: ["notifications", "badge", "feedback"],
    preview: NotificationBellPreview,
    componentName: "NotificationBell",
  },
  {
    slug: "verified-badge",
    name: "Verified Badge",
    kind: "components",
    category: "Profiles",
    description:
      "Trust signal for creators, teams and verified account surfaces.",
    tags: ["badge", "verification", "identity"],
    preview: VerifiedBadgePreview,
    componentName: "VerifiedBadge",
  },
  {
    slug: "morphing-button",
    name: "Morphing Button",
    kind: "components",
    category: "Buttons",
    description: "A compact publish action that morphs into a completed state.",
    tags: ["button", "motion", "state"],
    preview: MorphingButtonPreview,
    componentName: "MorphingButton",
  },
  {
    slug: "liquid-button",
    name: "Liquid Button",
    kind: "components",
    category: "Buttons",
    description:
      "High-emphasis gradient action with a soft liquid light sweep.",
    tags: ["button", "gradient", "cta"],
    preview: LiquidButtonPreview,
    componentName: "LiquidButton",
  },
  {
    slug: "avatar-expand",
    name: "Avatar Expand",
    kind: "components",
    category: "Profiles",
    description:
      "Overlapping contributors that expand into a readable team label on hover.",
    tags: ["avatar", "team", "hover"],
    preview: AvatarExpandPreview,
    componentName: "AvatarExpand",
  },
  {
    slug: "image-checkbox",
    name: "Image Checkbox",
    kind: "components",
    category: "Forms",
    description:
      "Visual option picker with pressed state and selected check indicator.",
    tags: ["form", "selection", "media"],
    preview: ImageCheckboxPreview,
    componentName: "ImageCheckbox",
  },
  {
    slug: "bottom-modal",
    name: "Bottom Modal",
    kind: "components",
    category: "Overlays",
    description:
      "Compact bottom-sheet interaction for confirmation and quick actions.",
    tags: ["modal", "sheet", "overlay"],
    preview: BottomModalPreview,
    componentName: "BottomModal",
  },
  {
    slug: "nested-list",
    name: "Nested List",
    kind: "components",
    category: "Navigation",
    description:
      "Expandable hierarchy for component libraries, folders and settings.",
    tags: ["tree", "navigation", "disclosure"],
    preview: NestedListPreview,
    componentName: "NestedList",
  },
  {
    slug: "action-dropdown",
    name: "Action Dropdown",
    kind: "components",
    category: "Navigation",
    description:
      "Base UI menu for duplicate, archive and destructive project actions.",
    tags: ["menu", "actions", "dropdown"],
    preview: ActionDropdownPreview,
    componentName: "ActionDropdown",
  },
  {
    slug: "preview-details-card",
    name: "Preview Details Card",
    kind: "components",
    category: "Cards",
    description:
      "Media-forward card with feature label, pricing metadata and save state.",
    tags: ["card", "media", "details"],
    preview: PreviewDetailsCardPreview,
    componentName: "PreviewDetailsCard",
  },
  {
    slug: "draggable-list",
    name: "Draggable List",
    kind: "components",
    category: "Data",
    description: "Reorderable task list with keyboard-friendly move controls.",
    tags: ["list", "reorder", "tasks"],
    preview: DraggableListPreview,
    componentName: "DraggableList",
  },
  {
    slug: "ai-chat-interface",
    name: "AI Chat Interface",
    kind: "components",
    category: "AI",
    description:
      "Small assistant conversation surface with local message state.",
    tags: ["ai", "chat", "input"],
    preview: AIChatInterfacePreview,
    componentName: "AIChatInterface",
  },
  {
    slug: "currency-converter-card",
    name: "Currency Converter Card",
    kind: "components",
    category: "Finance",
    description:
      "Inline amount conversion card with a switchable exchange rate.",
    tags: ["finance", "currency", "card"],
    preview: CurrencyConverterCardPreview,
    componentName: "CurrencyConverterCard",
  },
  {
    slug: "floating-chat-widget",
    name: "Floating Chat Widget",
    kind: "components",
    category: "Feedback",
    description:
      "Floating support trigger that reveals a compact contact prompt.",
    tags: ["chat", "support", "floating"],
    preview: FloatingChatWidgetPreview,
    componentName: "FloatingChatWidget",
  },
  {
    slug: "volume-component",
    name: "Volume Control",
    kind: "components",
    category: "Media",
    description: "Compact media control with mute toggle and range input.",
    tags: ["media", "range", "control"],
    preview: VolumeComponentPreview,
    componentName: "VolumeComponent",
  },
  {
    slug: "upload-dropzone",
    name: "Upload Dropzone",
    kind: "components",
    category: "Forms",
    description:
      "Asset-free file picker surface that previews the selected filename.",
    tags: ["upload", "file", "form"],
    preview: UploadDropzonePreview,
    componentName: "UploadDropzone",
  },
  {
    slug: "contact-composer",
    name: "Contact Composer",
    kind: "components",
    category: "Forms",
    description:
      "Message composer with sender identity and sent confirmation state.",
    tags: ["contact", "form", "feedback"],
    preview: ContactComposerPreview,
    componentName: "ContactComposer",
  },
  {
    slug: "notch-card",
    name: "Notch Card",
    kind: "components",
    category: "Surfaces",
    description:
      "Decorative top notch for floating profile and status surfaces.",
    tags: ["notch", "surface", "decorative"],
    preview: NotchCardPreview,
    componentName: "NotchCard",
  },
  {
    slug: "quick-command",
    name: "Quick Command",
    kind: "components",
    category: "Navigation",
    description:
      "Searchable command list for fast product navigation and actions.",
    tags: ["command", "search", "navigation"],
    preview: QuickCommandPreview,
    componentName: "QuickCommand",
  },
  {
    slug: "holographic-background",
    name: "Holographic Background",
    kind: "backgrounds",
    category: "Atmosphere",
    description:
      "CSS-only refractive gradient surface for hero sections and promos.",
    tags: ["holographic", "gradient", "hero"],
    preview: HolographicBackgroundPreview,
    componentName: "HolographicBackground",
  },
  {
    slug: "follow-cursor-label",
    name: "Follow Cursor Label",
    kind: "effects",
    category: "Pointer",
    description:
      "Spring-following label that adds context to pointer-driven surfaces.",
    tags: ["cursor", "pointer", "motion"],
    preview: FollowCursorLabelPreview,
    componentName: "FollowCursorLabel",
  },
  {
    slug: "folder-animation",
    name: "Folder Animation",
    kind: "animations",
    category: "Microinteractions",
    description:
      "Click-to-open folder motion for files, projects and navigation.",
    tags: ["folder", "microinteraction", "motion"],
    preview: FolderAnimationPreview,
    componentName: "FolderAnimation",
  },
  {
    slug: "counter-up",
    name: "Counter Up",
    kind: "animations",
    category: "Numbers",
    description:
      "RequestAnimationFrame-powered metric count-up for dashboards.",
    tags: ["counter", "numbers", "metrics"],
    preview: CounterUpPreview,
    componentName: "CounterUp",
  },
  {
    slug: "flip-text",
    name: "Flip Text",
    kind: "texts",
    category: "Rotation",
    description: "Interactive rotating phrase with motion-preserving layout.",
    tags: ["text", "flip", "motion"],
    preview: FlipTextPreview,
    componentName: "FlipText",
  },
];

export const tripledCatalogItems: CatalogItem[] = map(specs, (spec) => ({
  slug: spec.slug,
  name: spec.name,
  kind: spec.kind,
  category: spec.category,
  description: spec.description,
  tags: concat(spec.tags, "tripled", kebabCase(spec.category)),
  preview: spec.preview,
  sourceFile,
  registryName: "tripled-components",
  dependencies,
  code: `import { ${spec.componentName} } from "@/components/shomaui/components/tripled-components";\n\n<${spec.componentName} />`,
  sourceUrl,
  author: "ShomaUI + UI TripleD references",
  license: "MIT-compatible original adaptation",
  attribution:
    "Inspired by UI TripleD interaction patterns; implemented as an original ShomaUI component.",
}));
