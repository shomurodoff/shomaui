import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Download,
  GripVertical,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  filter,
  includes,
  join,
  last,
  map,
  split,
  startsWith,
  takeRight,
  toLower,
  toString,
} from "lodash";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Progress } from "#/components/ui/progress";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";
import { cn } from "#/lib/utils";

const frameClassName =
  "rounded-xl border bg-background p-4 shadow-sm shadow-black/5";

function ReferenceHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {eyebrow}
        </p>
        <p className="mt-1 truncate text-sm font-semibold">{title}</p>
      </div>
      {action}
    </div>
  );
}

function ReferenceRows({
  rows,
  active,
  onSelect,
}: {
  rows: string[];
  active?: string;
  onSelect?: (row: string) => void;
}) {
  return (
    <div className="grid gap-1.5">
      {map(rows, (row, index) => (
        <button
          key={row}
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted",
            active === row && "border-primary/30 bg-primary/5",
          )}
          onClick={() => onSelect?.(row)}
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-[0.65rem] text-muted-foreground">
            {index + 1}
          </span>
          <span className="min-w-0 flex-1 truncate">{row}</span>
          {active === row ? <Check className="size-3.5 text-primary" /> : null}
        </button>
      ))}
    </div>
  );
}

function ReferenceButton({
  label,
  className,
  variant = "default",
  icon,
}: {
  label: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  icon?: ReactNode;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      variant={pressed ? "secondary" : variant}
      className={cn("relative overflow-hidden", className)}
      onClick={() => setPressed((value) => !value)}
      aria-pressed={pressed}
    >
      {icon}
      {pressed ? "Selected" : label}
    </Button>
  );
}

function ReferenceButtonGroup({
  title,
  mode = "default",
}: {
  title: string;
  mode?: "default" | "shine" | "flip" | "morph" | "social";
}) {
  const [active, setActive] = useState("Primary");
  const labels =
    mode === "social"
      ? ["GitHub", "Share", "Follow"]
      : mode === "morph"
        ? ["Add item", "Continue", "Publish"]
        : ["Primary", "Secondary", "More"];

  return (
    <div
      className={cn(
        frameClassName,
        mode === "shine" && "bg-primary text-primary-foreground",
      )}
    >
      <ReferenceHeader
        eyebrow="Buttons"
        title={title}
        action={<Badge variant="outline">{active}</Badge>}
      />
      <div className="flex flex-wrap gap-2">
        {map(labels, (label, index) => (
          <Button
            key={label}
            type="button"
            size="sm"
            variant={active === label ? "default" : "outline"}
            className={cn(
              mode === "shine" &&
                (active === label
                  ? "bg-background text-foreground hover:bg-background/90"
                  : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"),
              mode === "flip" && "hover:-translate-y-0.5",
            )}
            onClick={() => setActive(label)}
          >
            {index === 0 && mode === "social" ? <Sparkles /> : null}
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function ShimmerButton() {
  return <ReferenceButtonGroup title="Shimmer Button" mode="shine" />;
}

export function PulsatingButton() {
  return (
    <ReferenceButton
      label="Start trial"
      className="mx-auto shadow-[0_0_0_5px_color-mix(in_oklch,var(--primary)_12%,transparent)]"
      icon={<Sparkles data-icon="inline-start" />}
    />
  );
}

export function MagneticButton() {
  return <ReferenceButtonGroup title="Magnetic Button" mode="morph" />;
}

export function ClipCornersButton() {
  return (
    <ReferenceButton
      label="Clip corners"
      className="rounded-none [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]"
    />
  );
}

export function DotMorphButton() {
  return <ReferenceButtonGroup title="Dot Morph" mode="morph" />;
}

export function FlipButton() {
  return <ReferenceButtonGroup title="Flip Button" mode="flip" />;
}

export function IconButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      type="button"
      size="icon"
      variant={liked ? "secondary" : "outline"}
      onClick={() => setLiked((value) => !value)}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={cn(liked && "fill-current text-amber-500")} />
    </Button>
  );
}

export function LoadingButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      status={loading ? "loading" : "idle"}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 900);
      }}
    >
      {loading ? "Saving" : "Save changes"}
    </Button>
  );
}

export function SplitButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mx-auto flex w-fit">
      <Button type="button" size="sm">
        Publish
      </Button>
      <Button
        type="button"
        size="icon-sm"
        className="ml-px rounded-l-none"
        aria-label="Open publish options"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronDown />
      </Button>
      {open ? (
        <div className="absolute top-full right-0 z-10 mt-2 grid w-36 gap-1 rounded-lg border bg-popover p-1 text-xs shadow-lg">
          {map(["Publish now", "Schedule", "Save draft"], (item) => (
            <button
              key={item}
              type="button"
              className="rounded-md px-2 py-1.5 text-left hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DownloadButton() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={() => setDownloaded((value) => !value)}
      aria-pressed={downloaded}
    >
      {downloaded ? (
        <Check data-icon="inline-start" />
      ) : (
        <Download data-icon="inline-start" />
      )}
      {downloaded ? "Downloaded" : "Download"}
    </Button>
  );
}

export function HoldButton() {
  const [held, setHeld] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      variant={held ? "secondary" : "outline"}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
    >
      {held ? "Keep holding…" : "Hold to confirm"}
    </Button>
  );
}

export function SocialButton() {
  return <ReferenceButtonGroup title="Social actions" mode="social" />;
}

export function ButtonGroup() {
  return <ReferenceButtonGroup title="Button Group" />;
}

function ReferenceForm({
  title,
  mode = "input",
}: {
  title: string;
  mode?:
    | "input"
    | "otp"
    | "phone"
    | "number"
    | "color"
    | "range"
    | "date"
    | "multi"
    | "search"
    | "password"
    | "tags"
    | "filter"
    | "radio"
    | "checkbox"
    | "upload";
}) {
  const [value, setValue] = useState(mode === "number" ? "12" : "");
  const [active, setActive] = useState("All");
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const choices = ["All", "Design", "Engineering"];
  const tags = ["React", "Tailwind", "Motion"];

  if (mode === "otp") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Forms" title={title} />
        <div className="flex justify-center gap-1.5">
          {map([0, 1, 2, 3, 4, 5], (index) => (
            <Input
              key={index}
              aria-label={`OTP digit ${index + 1}`}
              maxLength={1}
              className="size-9 px-0 text-center"
              value={value[index] ?? ""}
              onChange={(event) => {
                const next = split(value, "");
                next[index] = last(takeRight(event.target.value, 1)) ?? "";
                setValue(join(next, ""));
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (mode === "range") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Forms"
          title={title}
          action={<Badge>$120</Badge>}
        />
        <Slider
          defaultValue={[120]}
          max={240}
          step={1}
          aria-label="Price range"
        />
        <div className="mt-3 flex justify-between text-[0.65rem] text-muted-foreground">
          <span>$0</span>
          <span>$240</span>
        </div>
      </div>
    );
  }

  if (mode === "radio" || mode === "checkbox") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Forms" title={title} />
        <div className="grid gap-2">
          {map(["Starter", "Growth", "Scale"], (item, index) => (
            <label key={item} className="flex items-center gap-2 text-xs">
              <input
                type={mode === "radio" ? "radio" : "checkbox"}
                name={title}
                checked={
                  mode === "radio" ? active === item : includes(selected, item)
                }
                onChange={() =>
                  mode === "radio"
                    ? setActive(item)
                    : setSelected((current) =>
                        includes(current, item)
                          ? filter(current, (entry) => entry !== item)
                          : [...current, item],
                      )
                }
              />
              <span>{item}</span>
              {index === 1 ? <Badge variant="secondary">Popular</Badge> : null}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "multi" || mode === "search") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Forms" title={title} />
        <div className="relative">
          <Search className="pointer-events-none absolute top-2 left-2.5 size-3.5 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={
              mode === "search" ? "Search teammates" : "Choose teams"
            }
            className="h-8 pl-8 text-xs"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {map(tags, (tag) => (
            <button
              key={tag}
              type="button"
              className={cn(
                "rounded-full border px-2 py-1 text-[0.65rem]",
                includes(selected, tag) && "border-primary bg-primary/10",
              )}
              onClick={() =>
                setSelected((current) =>
                  includes(current, tag)
                    ? filter(current, (entry) => entry !== tag)
                    : [...current, tag],
                )
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "filter") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Forms"
          title={title}
          action={<Badge variant="outline">{active}</Badge>}
        />
        <div className="flex flex-wrap gap-1.5">
          {map(choices, (choice) => (
            <Button
              key={choice}
              type="button"
              size="xs"
              variant={active === choice ? "secondary" : "outline"}
              onClick={() => setActive(choice)}
            >
              {choice}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "upload") {
    return (
      <div className={cn(frameClassName, "border-dashed")}>
        <ReferenceHeader eyebrow="Forms" title={title} />
        <button
          type="button"
          className="grid w-full place-items-center gap-1 rounded-lg border border-dashed p-4 text-xs hover:bg-muted"
        >
          <Download className="size-4 text-muted-foreground" />
          <span>Drop files or browse</span>
          <span className="text-[0.65rem] text-muted-foreground">
            PNG, JPG or PDF
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={frameClassName}>
      <ReferenceHeader eyebrow="Forms" title={title} />
      <div className="grid gap-2">
        <div className="relative">
          <Input
            type={
              mode === "password"
                ? "password"
                : mode === "date"
                  ? "date"
                  : mode === "color"
                    ? "color"
                    : "text"
            }
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={
              mode === "phone"
                ? "+998 90 000 00 00"
                : mode === "date"
                  ? "Choose a date"
                  : mode === "color"
                    ? "#7c3aed"
                    : mode === "password"
                      ? "Password"
                      : "Type something…"
            }
            className="h-8 text-xs"
          />
        </div>
        {mode === "number" ? (
          <p className="text-[0.65rem] text-muted-foreground">
            Min 0 · Max 100
          </p>
        ) : null}
        {mode === "color" ? (
          <div className="h-1.5 rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-violet-500" />
        ) : null}
        <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground">
          <label className="flex items-center gap-1.5">
            <Checkbox
              checked={checked}
              onCheckedChange={(next) => setChecked(Boolean(next))}
            />
            Remember choice
          </label>
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            aria-label="Enable field"
          />
        </div>
      </div>
    </div>
  );
}

export function InputField() {
  return <ReferenceForm title="Animated Input" />;
}

export function InputOtpField() {
  return <ReferenceForm title="Input OTP" mode="otp" />;
}

export function PhoneInput() {
  return <ReferenceForm title="Phone Input" mode="phone" />;
}

export function NumberField() {
  return <ReferenceForm title="Number Field" mode="number" />;
}

export function ColorPicker() {
  return <ReferenceForm title="Color Picker" mode="color" />;
}

export function RangeSlider() {
  return <ReferenceForm title="Range Slider" mode="range" />;
}

export function DateRangePicker() {
  return <ReferenceForm title="Date Range Picker" mode="date" />;
}

export function MultiSelect() {
  return <ReferenceForm title="Multi Selector" mode="multi" />;
}

export function SearchableDropdown() {
  return <ReferenceForm title="Searchable Dropdown" mode="search" />;
}

export function PasswordField() {
  return <ReferenceForm title="Password Field" mode="password" />;
}

export function TagInput() {
  return <ReferenceForm title="Tag Input" mode="multi" />;
}

export function FormStepper() {
  return <ReferenceForm title="Form Stepper" mode="filter" />;
}

export function FilterPanel() {
  return <ReferenceForm title="Filter Panel" mode="filter" />;
}

export function RadioCardGroup() {
  return <ReferenceForm title="Radio Card Group" mode="radio" />;
}

export function CheckboxGroup() {
  return <ReferenceForm title="Checkbox Group" mode="checkbox" />;
}

export function AnimatedFileUpload() {
  return <ReferenceForm title="Animated File Upload" mode="upload" />;
}

function ReferenceNavigation({
  title,
  mode = "tabs",
}: {
  title: string;
  mode?:
    | "tabs"
    | "pagination"
    | "menu"
    | "rail"
    | "stepper"
    | "command"
    | "breadcrumb";
}) {
  const [active, setActive] = useState(0);
  const items =
    mode === "breadcrumb"
      ? ["Projects", "Design", "Dashboard"]
      : mode === "stepper"
        ? ["Details", "Review", "Done"]
        : ["Overview", "Activity", "Settings"];

  if (mode === "pagination") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Navigation" title={title} />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => setActive(Math.max(0, active - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <div className="flex gap-1">
            {map([1, 2, 3, 4], (page) => (
              <button
                key={page}
                type="button"
                className={cn(
                  "size-7 rounded-md text-xs",
                  active + 1 === page && "bg-primary text-primary-foreground",
                )}
                onClick={() => setActive(page - 1)}
              >
                {page}
              </button>
            ))}
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => setActive(Math.min(3, active + 1))}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "menu" || mode === "command" || mode === "rail") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Navigation"
          title={title}
          action={<MoreHorizontal className="size-4 text-muted-foreground" />}
        />
        <div className={cn("grid gap-1", mode === "rail" && "grid-cols-3")}>
          {map(["Home", "Search", "Settings"], (item, index) => (
            <button
              key={item}
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs hover:bg-muted",
                active === index && "bg-muted font-medium",
              )}
              onClick={() => setActive(index)}
            >
              {index === 0 ? (
                <Search className="size-3.5" />
              ) : index === 1 ? (
                <ArrowRight className="size-3.5" />
              ) : (
                <MoreHorizontal className="size-3.5" />
              )}
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={frameClassName}>
      <ReferenceHeader eyebrow="Navigation" title={title} />
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
        {map(items, (item, index) => (
          <button
            key={item}
            type="button"
            className={cn(
              "flex-1 rounded-md px-2 py-1.5 text-[0.65rem] text-muted-foreground",
              active === index && "bg-background text-foreground shadow-sm",
            )}
            onClick={() => setActive(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Step {active + 1} of {items.length} is ready.
      </p>
    </div>
  );
}

export function PaginationBar() {
  return <ReferenceNavigation title="Pagination" mode="pagination" />;
}

export function TabsNavigation() {
  return <ReferenceNavigation title="Animated Tabs" />;
}

export function MegaMenu() {
  return <ReferenceNavigation title="Mega Menu" mode="menu" />;
}

export function NavigationRail() {
  return <ReferenceNavigation title="Navigation Rail" mode="rail" />;
}

export function CommandMenu() {
  return <ReferenceNavigation title="Command Menu" mode="command" />;
}

export function DropdownMenu() {
  return <ReferenceNavigation title="Dropdown Menu" mode="menu" />;
}

export function ContextMenu() {
  return <ReferenceNavigation title="Context Menu" mode="menu" />;
}

export function MenuBar() {
  return <ReferenceNavigation title="Menu Bar" mode="tabs" />;
}

export function StepperNavigation() {
  return <ReferenceNavigation title="Stepper" mode="stepper" />;
}

export function LinkPreview() {
  return <ReferenceNavigation title="Link Preview" mode="breadcrumb" />;
}

export function SidebarNavigation() {
  return <ReferenceNavigation title="Sidebar Navigation" mode="menu" />;
}

export function BreadcrumbNavigation() {
  return (
    <ReferenceNavigation title="Breadcrumb Navigation" mode="breadcrumb" />
  );
}

function ReferenceFeedback({
  title,
  mode = "alert",
}: {
  title: string;
  mode?:
    | "alert"
    | "progress"
    | "notification"
    | "empty"
    | "skeleton"
    | "dialog"
    | "status"
    | "toast";
}) {
  const [visible, setVisible] = useState(true);

  if (mode === "progress") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Feedback"
          title={title}
          action={<span className="text-xs font-medium">72%</span>}
        />
        <Progress value={72} />
        <p className="mt-2 text-[0.65rem] text-muted-foreground">
          Uploading your workspace assets
        </p>
      </div>
    );
  }

  if (mode === "notification") {
    return (
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs shadow-sm">
        <span className="relative flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <span className="relative">3</span>
        </span>
        {title}
      </div>
    );
  }

  if (mode === "empty") {
    return (
      <div className={cn(frameClassName, "text-center")}>
        <div className="mx-auto mb-2 grid size-8 place-items-center rounded-full bg-muted">
          <Search className="size-4 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">Nothing here yet</p>
        <p className="mt-1 text-[0.65rem] text-muted-foreground">
          Create a new item to get started.
        </p>
        <Button type="button" size="xs" className="mt-3">
          <Plus data-icon="inline-start" />
          Create
        </Button>
      </div>
    );
  }

  if (mode === "skeleton") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Feedback" title={title} />
        <div className="grid gap-2">
          <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
          <div className="h-2 w-full animate-pulse rounded bg-muted" />
          <div className="h-2 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (mode === "dialog") {
    return (
      <div className={cn(frameClassName, "relative")}>
        <ReferenceHeader eyebrow="Feedback" title={title} />
        <p className="text-xs text-muted-foreground">
          Are you sure you want to continue?
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <Button type="button" size="xs" variant="ghost">
            Cancel
          </Button>
          <Button type="button" size="xs" variant="destructive">
            Confirm
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "status") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">Stable</Badge>
        <Badge>New</Badge>
        <Badge variant="outline">Beta</Badge>
      </div>
    );
  }

  if (!visible) return null;

  return (
    <div
      className={cn(
        frameClassName,
        mode === "toast" && "border-primary/30 bg-primary/5",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 size-2 rounded-full bg-emerald-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your changes have been saved successfully.
          </p>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
          onClick={() => setVisible(false)}
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ToastStack() {
  return <ReferenceFeedback title="Toast Stack" mode="toast" />;
}
export function ProgressCard() {
  return <ReferenceFeedback title="Progress Card" mode="progress" />;
}
export function NotificationBadge() {
  return <ReferenceFeedback title="Notifications" mode="notification" />;
}
export function SuccessAlert() {
  return <ReferenceFeedback title="Success Alert" />;
}
export function WarningAlert() {
  return <ReferenceFeedback title="Warning Alert" />;
}
export function EmptyState() {
  return <ReferenceFeedback title="Empty State" mode="empty" />;
}
export function SkeletonCard() {
  return <ReferenceFeedback title="Skeleton Card" mode="skeleton" />;
}
export function ConfirmDialog() {
  return <ReferenceFeedback title="Confirm Dialog" mode="dialog" />;
}
export function StatusChip() {
  return <ReferenceFeedback title="Status Chip" mode="status" />;
}
export function AnimatedProgress() {
  return <ReferenceFeedback title="Animated Progress" mode="progress" />;
}

function ReferenceLayout({
  title,
  mode = "bento",
}: {
  title: string;
  mode?:
    | "bento"
    | "masonry"
    | "split"
    | "resize"
    | "accordion"
    | "collapsible"
    | "header"
    | "footer"
    | "media"
    | "expandable";
}) {
  const [open, setOpen] = useState(0);
  const blocks = ["Overview", "Activity", "Settings"];

  if (mode === "header" || mode === "footer") {
    return (
      <div className={cn(frameClassName, "overflow-hidden p-0")}>
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-xs font-semibold">{title}</span>
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-muted" />
            <span className="size-2 rounded-full bg-muted" />
            <span className="size-2 rounded-full bg-muted" />
          </div>
        </div>
        {mode === "header" ? (
          <div className="flex items-center justify-between px-3 py-5">
            <span className="h-2 w-20 rounded-full bg-muted" />
            <Button type="button" size="xs">
              Get started
            </Button>
          </div>
        ) : (
          <div className="grid gap-2 px-3 py-4">
            <div className="h-2 w-2/5 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
          </div>
        )}
      </div>
    );
  }

  if (mode === "accordion" || mode === "collapsible") {
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Layout" title={title} />
        <div className="grid gap-1">
          {map(blocks, (block, index) => (
            <div key={block} className="rounded-lg border">
              <button
                type="button"
                className="flex w-full items-center justify-between px-2.5 py-2 text-xs font-medium"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                {block}
                {open === index ? (
                  <ChevronDown className="size-3.5" />
                ) : (
                  <ChevronRight className="size-3.5" />
                )}
              </button>
              {open === index ? (
                <p className="border-t px-2.5 py-2 text-[0.65rem] text-muted-foreground">
                  A focused section of the {toLower(title)} layout.
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "split" || mode === "resize") {
    return (
      <div className={cn(frameClassName, "p-2")}>
        <div className="grid grid-cols-[1fr_auto_1.4fr] items-stretch overflow-hidden rounded-lg border">
          <div className="bg-muted/50 p-3">
            <p className="text-[0.65rem] font-medium">Navigation</p>
            <div className="mt-3 grid gap-2">
              <span className="h-2 w-14 rounded bg-muted" />
              <span className="h-2 w-20 rounded bg-muted" />
              <span className="h-2 w-12 rounded bg-muted" />
            </div>
          </div>
          <div className="flex w-3 cursor-col-resize items-center justify-center border-x bg-background">
            <GripVertical className="size-3 text-muted-foreground" />
          </div>
          <div className="p-3">
            <p className="text-[0.65rem] font-medium">{title}</p>
            <div className="mt-3 h-16 rounded-md bg-gradient-to-br from-primary/15 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={frameClassName}>
      <ReferenceHeader eyebrow="Layout" title={title} />
      <div
        className={cn(
          "grid gap-2",
          mode === "masonry" ? "grid-cols-3 items-end" : "grid-cols-2",
        )}
      >
        {map(["One", "Two", "Three", "Four"], (block, index) => (
          <div
            key={block}
            className={cn(
              "rounded-lg border bg-muted/30 p-3",
              mode === "bento" && index === 0 && "row-span-2",
              mode === "masonry" && index % 2 === 0 && "py-7",
            )}
          >
            <div className="mb-3 size-5 rounded-md bg-primary/15" />
            <span className="text-[0.65rem] font-medium">{block}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoGrid() {
  return <ReferenceLayout title="Bento Grid" />;
}
export function MasonryGrid() {
  return <ReferenceLayout title="Masonry Grid" mode="masonry" />;
}
export function SplitPane() {
  return <ReferenceLayout title="Split Pane" mode="split" />;
}
export function ResizablePanels() {
  return <ReferenceLayout title="Resizable Panels" mode="resize" />;
}
export function AccordionStack() {
  return <ReferenceLayout title="Accordion Stack" mode="accordion" />;
}
export function CollapsibleCard() {
  return <ReferenceLayout title="Collapsible Card" mode="collapsible" />;
}
export function HeaderLayout() {
  return <ReferenceLayout title="Responsive Header" mode="header" />;
}
export function FooterLayout() {
  return <ReferenceLayout title="Footer Layout" mode="footer" />;
}
export function AspectRatioMedia() {
  return <ReferenceLayout title="Aspect Ratio Media" mode="media" />;
}
export function ExpandableCard() {
  return <ReferenceLayout title="Expandable Card" mode="expandable" />;
}

function ReferenceData({
  title,
  mode = "table",
}: {
  title: string;
  mode?:
    | "table"
    | "calendar"
    | "gantt"
    | "kanban"
    | "sortable"
    | "tree"
    | "stats"
    | "activity"
    | "schedule"
    | "comparison"
    | "list"
    | "chart";
}) {
  const [active, setActive] = useState("Atlas");
  const rows = ["Atlas", "Beacon", "Cinder"];

  if (mode === "stats")
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Data"
          title={title}
          action={<Badge variant="secondary">+18%</Badge>}
        />
        <p className="text-2xl font-semibold">$24,680</p>
        <div className="mt-3 flex h-10 items-end gap-1">
          {map([22, 34, 28, 48, 40, 58, 64], (height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-primary/50"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  if (mode === "chart")
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Data"
          title={title}
          action={<Badge variant="outline">Live</Badge>}
        />
        <div className="relative h-24">
          <div className="absolute inset-x-0 bottom-3 border-t border-dashed" />
          <svg
            viewBox="0 0 240 80"
            className="h-full w-full overflow-visible"
            aria-label="Revenue chart"
            role="img"
          >
            <path
              d="M4 66 C35 44, 48 60, 72 40 S115 48, 140 24 S186 42, 236 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-primary"
            />
          </svg>
        </div>
      </div>
    );
  if (mode === "calendar" || mode === "schedule")
    return (
      <div className={frameClassName}>
        <ReferenceHeader
          eyebrow="Data"
          title={title}
          action={
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              aria-label="Next month"
            >
              <ChevronRight />
            </Button>
          }
        />
        <div className="grid grid-cols-7 gap-1 text-center text-[0.6rem] text-muted-foreground">
          {map(["M", "T", "W", "T", "F", "S", "S"], (day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], (day) => (
            <button
              key={day}
              type="button"
              className={cn(
                "rounded-md p-1.5 text-[0.65rem] hover:bg-muted",
                day === 8 && "bg-primary text-primary-foreground",
              )}
              onClick={() => setActive(toString(day))}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  if (mode === "kanban")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <div className="grid grid-cols-3 gap-1.5">
          {map(["Todo", "Doing", "Done"], (column, index) => (
            <div key={column} className="rounded-lg bg-muted/50 p-1.5">
              <p className="mb-1.5 text-[0.6rem] font-medium">{column}</p>
              <div className="grid gap-1.5">
                {map([0, 1], (card) => (
                  <button
                    key={card}
                    type="button"
                    className="rounded-md border bg-background p-2 text-left text-[0.6rem] hover:border-primary/30"
                    onClick={() => setActive(column)}
                  >
                    {index === 2
                      ? "Shipped"
                      : card === 0
                        ? "Design review"
                        : "API polish"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (mode === "gantt")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <div className="grid gap-2">
          {map(["Research", "Prototype", "Launch"], (row, index) => (
            <div
              key={row}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-2 text-[0.6rem]"
            >
              <span>{row}</span>
              <div className="h-2 rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-2 rounded-full bg-primary/70",
                    index === 0 ? "w-1/3" : index === 1 ? "w-3/5" : "w-4/5",
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (mode === "tree")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <ReferenceRows
          rows={["src", "components", "routes"]}
          active={active}
          onSelect={setActive}
        />
      </div>
    );
  if (mode === "sortable")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <ReferenceRows rows={rows} active={active} onSelect={setActive} />
      </div>
    );
  if (mode === "activity")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <div className="grid gap-3">
          {map(
            ["Design tokens synced", "Review requested", "Release notes ready"],
            (item, index) => (
              <div key={item} className="flex items-start gap-2 text-xs">
                <span
                  className={cn(
                    "mt-1 size-2 rounded-full",
                    index === 0 ? "bg-emerald-500" : "bg-primary/40",
                  )}
                />
                <div>
                  <p className="font-medium">{item}</p>
                  <p className="text-[0.65rem] text-muted-foreground">
                    {index + 2} minutes ago
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    );
  if (mode === "comparison")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border text-center text-[0.65rem]">
          <div className="bg-background p-2 font-medium">Feature</div>
          <div className="bg-background p-2 font-medium">Basic</div>
          <div className="bg-background p-2 font-medium">Pro</div>
          {map(["Seats", "Export", "Support"], (item) => (
            <div key={item} className="contents">
              <div className="bg-background p-2 text-left">{item}</div>
              <div className="bg-background p-2 text-muted-foreground">—</div>
              <div className="bg-background p-2 text-primary">
                <Check className="mx-auto size-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (mode === "list")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Data" title={title} />
        <ReferenceRows rows={rows} active={active} onSelect={setActive} />
      </div>
    );
  return (
    <div className={frameClassName}>
      <ReferenceHeader
        eyebrow="Data"
        title={title}
        action={
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            aria-label="More options"
          >
            <MoreHorizontal />
          </Button>
        }
      />
      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-3 border-b bg-muted/40 px-2.5 py-2 text-[0.6rem] font-medium text-muted-foreground">
          <span>Name</span>
          <span>Status</span>
          <span>Updated</span>
        </div>
        {map(rows, (row) => (
          <button
            key={row}
            type="button"
            className="grid w-full grid-cols-3 px-2.5 py-2 text-left text-[0.65rem] hover:bg-muted"
            onClick={() => setActive(row)}
          >
            <span>{row}</span>
            <span className="text-emerald-600">Ready</span>
            <span className="text-muted-foreground">Today</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DataGridPro() {
  return <ReferenceData title="Data Grid" />;
}
export function EventCalendar() {
  return <ReferenceData title="Event Calendar" mode="calendar" />;
}
export function GanttChart() {
  return <ReferenceData title="Gantt Chart" mode="gantt" />;
}
export function KanbanBoard() {
  return <ReferenceData title="Kanban Board" mode="kanban" />;
}
export function SortableList() {
  return <ReferenceData title="Sortable List" mode="sortable" />;
}
export function TreeView() {
  return <ReferenceData title="Tree View" mode="tree" />;
}
export function StatsCard() {
  return <ReferenceData title="Stats Card" mode="stats" />;
}
export function ActivityFeed() {
  return <ReferenceData title="Activity Feed" mode="activity" />;
}
export function ScheduleBoard() {
  return <ReferenceData title="Schedule Board" mode="schedule" />;
}
export function ComparisonTable() {
  return <ReferenceData title="Comparison Table" mode="comparison" />;
}
export function DataList() {
  return <ReferenceData title="Data List" mode="list" />;
}
export function ChartCard() {
  return <ReferenceData title="Chart Card" mode="chart" />;
}
export function StepperTable() {
  return <ReferenceData title="Stepper Table" />;
}
export function FilterTable() {
  return <ReferenceData title="Filter Table" />;
}
export function HorizontalTimeline() {
  return <ReferenceData title="Horizontal Timeline" mode="activity" />;
}

function ReferenceMedia({
  title,
  mode = "gallery",
}: {
  title: string;
  mode?:
    | "gallery"
    | "mask"
    | "video"
    | "product"
    | "stack"
    | "tabs"
    | "modal"
    | "avatars";
}) {
  const [active, setActive] = useState(0);
  if (mode === "video")
    return (
      <div className="relative overflow-hidden rounded-xl border bg-slate-950 p-3 text-white">
        <div className="flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/60 via-sky-500/30 to-transparent">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label="Play preview"
          >
            <Play />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span>{title}</span>
          <span className="text-white/60">02:14</span>
        </div>
      </div>
    );
  if (mode === "product")
    return (
      <div className={frameClassName}>
        <div className="relative h-28 rounded-lg bg-gradient-to-br from-primary/20 via-muted to-background">
          <Badge className="absolute top-2 left-2">New</Badge>
          <div className="absolute right-4 bottom-4 size-16 rotate-6 rounded-xl border bg-background shadow-lg" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium">{title}</p>
            <p className="text-[0.65rem] text-muted-foreground">From $48</p>
          </div>
          <Button type="button" size="xs">
            Add
          </Button>
        </div>
      </div>
    );
  if (mode === "avatars")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Media" title={title} />
        <div className="flex items-center justify-center -space-x-2">
          {map(["SK", "JD", "AM", "+4"], (label) => (
            <div
              key={label}
              className="grid size-10 place-items-center rounded-full border-2 border-background bg-primary/10 text-[0.65rem] font-medium"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className={frameClassName}>
      <ReferenceHeader
        eyebrow="Media"
        title={title}
        action={<Badge variant="outline">{active + 1}/4</Badge>}
      />
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-muted to-background",
          mode === "mask" &&
            "[mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]",
          mode === "stack" && "h-28",
        )}
      >
        <div className="flex h-28 items-center justify-center text-xs text-muted-foreground">
          {mode === "modal" ? "Preview details" : "Media preview"}
        </div>
        {mode === "stack" ? (
          <div className="absolute inset-x-8 bottom-[-34px] h-16 rotate-3 rounded-lg border bg-background shadow" />
        ) : null}
      </div>
      <div className="mt-3 flex justify-between gap-2">
        {map([0, 1, 2], (item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "h-1.5 flex-1 rounded-full bg-muted",
              active === item && "bg-primary",
            )}
            onClick={() => setActive(item)}
            aria-label={`Open media ${item + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselGallery() {
  return <ReferenceMedia title="Carousel Gallery" />;
}
export function ImageMask() {
  return <ReferenceMedia title="Image Mask" mode="mask" />;
}
export function VideoCard() {
  return <ReferenceMedia title="Video Card" mode="video" />;
}
export function ProductCard() {
  return <ReferenceMedia title="Product Card" mode="product" />;
}
export function PhotoStack() {
  return <ReferenceMedia title="Photo Stack" mode="stack" />;
}
export function ImageTabs() {
  return <ReferenceMedia title="Image Tabs" mode="tabs" />;
}
export function MediaModal() {
  return <ReferenceMedia title="Media Modal" mode="modal" />;
}
export function AvatarCircles() {
  return <ReferenceMedia title="Avatar Circles" mode="avatars" />;
}

function ReferenceContent({
  title,
  mode = "tweet",
}: {
  title: string;
  mode?:
    | "tweet"
    | "testimonial"
    | "feature"
    | "announcement"
    | "pricing"
    | "blog"
    | "tree"
    | "terminal";
}) {
  if (mode === "pricing")
    return (
      <div className={cn(frameClassName, "relative overflow-hidden")}>
        <Badge>Most popular</Badge>
        <p className="mt-3 text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          For teams shipping faster.
        </p>
        <p className="mt-4 text-2xl font-semibold">
          $24
          <span className="text-xs font-normal text-muted-foreground">/mo</span>
        </p>
        <Button type="button" size="sm" className="mt-4 w-full">
          Choose plan
        </Button>
      </div>
    );
  if (mode === "terminal")
    return (
      <div className="overflow-hidden rounded-xl border bg-slate-950 text-slate-100">
        <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-rose-400" />
          <span className="size-2 rounded-full bg-amber-300" />
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
        <pre className="p-3 text-[0.65rem] leading-5">
          <code>
            $ npm install shomaui{`\n`}✓ dependencies ready{`\n`}$ _
          </code>
        </pre>
      </div>
    );
  if (mode === "tree")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Content" title={title} />
        <div className="grid gap-1 text-xs">
          <span>▾ src</span>
          <span className="pl-4">▾ components</span>
          <span className="pl-8 text-muted-foreground">button.tsx</span>
          <span className="pl-8 text-muted-foreground">card.tsx</span>
        </div>
      </div>
    );
  if (mode === "feature")
    return (
      <div className={frameClassName}>
        <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </div>
        <p className="mt-3 text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          A focused pattern that turns a complex workflow into a calm, readable
          moment.
        </p>
      </div>
    );
  if (mode === "announcement")
    return (
      <div className="flex items-start gap-3 rounded-xl border bg-primary/5 p-4">
        <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <ArrowRight className="size-4" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            New in this release · Read the update
          </p>
        </div>
      </div>
    );
  if (mode === "blog")
    return (
      <div className={frameClassName}>
        <div className="h-20 rounded-lg bg-gradient-to-br from-primary/20 via-muted to-background" />
        <p className="mt-3 text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          A practical guide to building better product interfaces.
        </p>
      </div>
    );
  return (
    <div
      className={cn(frameClassName, mode === "testimonial" && "bg-muted/40")}
    >
      <div className="flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-[0.65rem] font-medium">
          SK
        </div>
        <div>
          <p className="text-xs font-medium">
            {mode === "testimonial" ? "Sarah Kim" : "@shomaui"}
          </p>
          <p className="text-[0.65rem] text-muted-foreground">2h ago</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5">
        {mode === "testimonial"
          ? "The primitives feel thoughtful, fast and easy to own."
          : "Building a calmer component system, one interaction at a time."}
      </p>
      <div className="mt-3 flex gap-1 text-muted-foreground">
        <span>♡ 24</span>
        <span>·</span>
        <span>↗ Share</span>
      </div>
    </div>
  );
}

export function TweetCard() {
  return <ReferenceContent title="Tweet Card" />;
}
export function TestimonialCard() {
  return <ReferenceContent title="Testimonial Card" mode="testimonial" />;
}
export function FeatureList() {
  return <ReferenceContent title="Feature List" mode="feature" />;
}
export function AnnouncementCard() {
  return <ReferenceContent title="Announcement Card" mode="announcement" />;
}
export function PricingCard() {
  return <ReferenceContent title="Pricing Card" mode="pricing" />;
}
export function BlogCard() {
  return <ReferenceContent title="Blog Card" mode="blog" />;
}
export function FileTree() {
  return <ReferenceContent title="File Tree" mode="tree" />;
}
export function TerminalCard() {
  return <ReferenceContent title="Terminal Card" mode="terminal" />;
}

function ReferenceProfile({
  title,
  mode = "profile",
}: {
  title: string;
  mode?: "profile" | "presence" | "team" | "account" | "contact" | "stats";
}) {
  const [following, setFollowing] = useState(false);
  if (mode === "presence")
    return (
      <div className="flex items-center gap-3 rounded-xl border bg-background p-3">
        <div className="relative grid size-10 place-items-center rounded-full bg-primary/10 text-xs font-medium">
          SK
          <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div>
          <p className="text-xs font-medium">Sarah Kim</p>
          <p className="text-[0.65rem] text-emerald-600">Online now</p>
        </div>
      </div>
    );
  if (mode === "team")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Profiles" title={title} />
        <div className="flex -space-x-2">
          {map(["SK", "JD", "AM", "NK"], (label) => (
            <div
              key={label}
              className="grid size-9 place-items-center rounded-full border-2 border-background bg-muted text-[0.6rem]"
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.65rem] text-muted-foreground">
          12 teammates across 3 squads
        </p>
      </div>
    );
  if (mode === "account")
    return (
      <div className="mx-auto flex w-full max-w-56 items-center gap-2 rounded-xl border bg-background p-2">
        <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-xs">
          SK
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">Shoxrux Shomurodov</p>
          <p className="truncate text-[0.65rem] text-muted-foreground">
            Pro workspace
          </p>
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </div>
    );
  if (mode === "contact")
    return (
      <div className={frameClassName}>
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
            AK
          </div>
          <div>
            <p className="text-sm font-medium">Alex Kim</p>
            <p className="text-xs text-muted-foreground">alex@example.com</p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mt-4 w-full"
        >
          Message
        </Button>
      </div>
    );
  if (mode === "stats")
    return (
      <div className={frameClassName}>
        <ReferenceHeader eyebrow="Profiles" title={title} />
        <p className="text-lg font-semibold">4.9 / 5</p>
        <div className="mt-2 flex gap-0.5 text-amber-400">
          {map([0, 1, 2, 3, 4], (item) => (
            <Star key={item} className="size-3 fill-current" />
          ))}
        </div>
      </div>
    );
  return (
    <div className={frameClassName}>
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-sm font-medium">
          SK
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">Product designer</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Designing useful systems for thoughtful teams.
      </p>
      <Button
        type="button"
        size="sm"
        variant={following ? "secondary" : "outline"}
        className="mt-3 w-full"
        onClick={() => setFollowing((value) => !value)}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </div>
  );
}

export function ProfileCard() {
  return <ReferenceProfile title="Profile Card" />;
}
export function UserPresence() {
  return <ReferenceProfile title="User Presence" mode="presence" />;
}
export function TeamStack() {
  return <ReferenceProfile title="Team Stack" mode="team" />;
}
export function AccountMenu() {
  return <ReferenceProfile title="Account Menu" mode="account" />;
}
export function ContactCard() {
  return <ReferenceProfile title="Contact Card" mode="contact" />;
}
export function ProfileStat() {
  return <ReferenceProfile title="Profile Stats" mode="stats" />;
}

function ReferenceCode({
  title,
  mode = "block",
}: {
  title: string;
  mode?: "block" | "tabs" | "comparison" | "terminal" | "diff";
}) {
  const [copied, setCopied] = useState(false);
  const snippets =
    mode === "diff"
      ? ["- const legacy = true", "+ const shomaui = true"]
      : [
          'import { Button } from "@/components/shomaui";',
          "<Button>Ship it</Button>",
        ];
  return (
    <div className="overflow-hidden rounded-xl border bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="text-[0.65rem] text-white/70">{title}</span>
        <button
          type="button"
          className="text-white/60 hover:text-white"
          onClick={() => setCopied((value) => !value)}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Clipboard className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-[0.6rem] leading-5">
        <code>
          {map(snippets, (line) => (
            <span
              key={line}
              className={cn(
                "block",
                startsWith(line, "+") && "text-emerald-300",
                startsWith(line, "-") && "text-rose-300",
              )}
            >
              {line}
            </span>
          ))}
        </code>
      </pre>
      {mode === "tabs" ? (
        <div className="border-t border-white/10 px-3 py-2 text-[0.6rem] text-white/50">
          TypeScript · JSX · CSS
        </div>
      ) : null}
    </div>
  );
}

export function CodeBlock() {
  return <ReferenceCode title="Code Block" />;
}
export function CodeTabs() {
  return <ReferenceCode title="Code Tabs" mode="tabs" />;
}
export function CodeComparison() {
  return <ReferenceCode title="Code Comparison" mode="comparison" />;
}
export function Terminal() {
  return <ReferenceCode title="Terminal" mode="terminal" />;
}
export function DiffViewer() {
  return <ReferenceCode title="Diff Viewer" mode="diff" />;
}

function ReferenceSurface({
  title,
  mode = "neon",
}: {
  title: string;
  mode?: "neon" | "magic" | "spotlight" | "gradient" | "liquid";
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 transition-all",
        mode === "neon" && "bg-slate-950 text-white",
        mode === "gradient" &&
          "bg-gradient-to-br from-primary/20 via-background to-sky-500/10",
        mode === "liquid" && "bg-white/10 backdrop-blur-xl",
        hovered && "-translate-y-0.5 shadow-xl shadow-primary/10",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-12 -right-8 size-28 rounded-full blur-3xl",
          mode === "neon" ? "bg-fuchsia-500/30" : "bg-primary/15",
        )}
      />
      <div className="relative">
        <ReferenceHeader
          eyebrow="Surfaces"
          title={title}
          action={
            <Badge variant="outline">{hovered ? "Active" : "Ready"}</Badge>
          }
        />
        <p className="max-w-56 text-xs leading-5 text-muted-foreground">
          Layered surface treatment with readable content and restrained depth.
        </p>
        <Button
          type="button"
          size="xs"
          variant={mode === "neon" ? "secondary" : "outline"}
          className="mt-4"
        >
          Explore surface
        </Button>
      </div>
    </div>
  );
}

export function NeonCard() {
  return <ReferenceSurface title="Neon Card" />;
}
export function MagicCard() {
  return <ReferenceSurface title="Magic Card" mode="magic" />;
}
export function SpotlightSurface() {
  return <ReferenceSurface title="Spotlight Surface" mode="spotlight" />;
}
export function GradientBorderCard() {
  return <ReferenceSurface title="Gradient Border Card" mode="gradient" />;
}
export function LiquidGlass() {
  return <ReferenceSurface title="Liquid Glass" mode="liquid" />;
}

export const referenceComponentExports = {
  "shimmer-button": ShimmerButton,
  "pulsating-button": PulsatingButton,
  "magnetic-button": MagneticButton,
  "clip-corners-button": ClipCornersButton,
  "dot-morph-button": DotMorphButton,
  "flip-button": FlipButton,
  "icon-button": IconButton,
  "loading-button": LoadingButton,
  "split-button": SplitButton,
  "download-button": DownloadButton,
  "hold-button": HoldButton,
  "social-button": SocialButton,
  input: InputField,
  "input-otp": InputOtpField,
  "phone-input": PhoneInput,
  "number-field": NumberField,
  "color-picker": ColorPicker,
  "range-slider": RangeSlider,
  "date-range-picker": DateRangePicker,
  "multi-select": MultiSelect,
  "searchable-dropdown": SearchableDropdown,
  "password-field": PasswordField,
  "tag-input": TagInput,
  "form-stepper": FormStepper,
  "filter-panel": FilterPanel,
  "radio-card-group": RadioCardGroup,
  "checkbox-group": CheckboxGroup,
  "animated-file-upload": AnimatedFileUpload,
  pagination: PaginationBar,
  tabs: TabsNavigation,
  "mega-menu": MegaMenu,
  "navigation-rail": NavigationRail,
  "command-menu": CommandMenu,
  "dropdown-menu": DropdownMenu,
  "context-menu-card": ContextMenu,
  "menu-bar": MenuBar,
  stepper: StepperNavigation,
  "link-preview": LinkPreview,
  "sidebar-nav": SidebarNavigation,
  "breadcrumb-nav": BreadcrumbNavigation,
  "toast-stack": ToastStack,
  "progress-card": ProgressCard,
  "notification-badge": NotificationBadge,
  "success-alert": SuccessAlert,
  "warning-alert": WarningAlert,
  "empty-state": EmptyState,
  "skeleton-card": SkeletonCard,
  "confirm-dialog": ConfirmDialog,
  "status-chip": StatusChip,
  "animated-progress": AnimatedProgress,
  "bento-grid": BentoGrid,
  "masonry-grid": MasonryGrid,
  "split-pane": SplitPane,
  "resizable-panels": ResizablePanels,
  "accordion-stack": AccordionStack,
  "collapsible-card": CollapsibleCard,
  header: HeaderLayout,
  footer: FooterLayout,
  "aspect-ratio-media": AspectRatioMedia,
  "expandable-card": ExpandableCard,
  "data-grid-pro": DataGridPro,
  "event-calendar": EventCalendar,
  "gantt-chart": GanttChart,
  "kanban-board": KanbanBoard,
  "sortable-list": SortableList,
  "tree-view": TreeView,
  "stats-card": StatsCard,
  "activity-feed": ActivityFeed,
  "schedule-board": ScheduleBoard,
  "comparison-table": ComparisonTable,
  "data-list": DataList,
  "chart-card": ChartCard,
  "stepper-table": StepperTable,
  "filter-table": FilterTable,
  "horizontal-timeline": HorizontalTimeline,
  "carousel-gallery": CarouselGallery,
  "image-mask": ImageMask,
  "video-card": VideoCard,
  "product-card": ProductCard,
  "photo-stack": PhotoStack,
  "image-tabs": ImageTabs,
  "media-modal": MediaModal,
  "avatar-circles": AvatarCircles,
  "tweet-card": TweetCard,
  "testimonial-card": TestimonialCard,
  "feature-list": FeatureList,
  "announcement-card": AnnouncementCard,
  "pricing-card": PricingCard,
  "blog-card": BlogCard,
  "file-tree": FileTree,
  "terminal-card": TerminalCard,
  "profile-card": ProfileCard,
  "user-presence": UserPresence,
  "team-stack": TeamStack,
  "account-menu": AccountMenu,
  "contact-card": ContactCard,
  "profile-stat": ProfileStat,
  "code-block-pro": CodeBlock,
  "code-tabs": CodeTabs,
  "code-comparison": CodeComparison,
  terminal: Terminal,
  "diff-viewer": DiffViewer,
  "neon-card": NeonCard,
  "magic-card": MagicCard,
  "spotlight-surface": SpotlightSurface,
  "gradient-border-card": GradientBorderCard,
  "liquid-glass": LiquidGlass,
} as const;

export type ReferenceComponentSlug = keyof typeof referenceComponentExports;
