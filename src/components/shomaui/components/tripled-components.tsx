import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Bell,
  BellRing,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Code2,
  CreditCard,
  FolderOpen,
  GitFork,
  GripVertical,
  Heart,
  MessageCircle,
  MoreHorizontal,
  PanelBottom,
  Plus,
  Rocket,
  Send,
  Sparkles,
  Star,
  AtSign,
  Upload,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import {
  clamp,
  clone,
  concat,
  filter,
  get,
  includes,
  map,
  pullAt,
  toLower,
  toNumber,
} from "lodash";

import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { cn } from "#/lib/utils";

const contributors = [
  { initials: "SK", tone: "bg-amber-500/15 text-amber-700" },
  { initials: "AM", tone: "bg-sky-500/15 text-sky-700" },
  { initials: "JD", tone: "bg-violet-500/15 text-violet-700" },
];

export function NativeUserCard() {
  return (
    <Card className="overflow-hidden border-border/70 bg-background shadow-sm">
      <div className="h-16 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
      <CardContent className="relative -mt-8 px-4 pb-4">
        <div className="flex items-end justify-between gap-3">
          <Avatar size="lg" className="ring-4 ring-background">
            <AvatarFallback className="bg-primary text-primary-foreground">
              SK
            </AvatarFallback>
          </Avatar>
          <Badge variant="outline" className="rounded-full bg-background/80">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Available
          </Badge>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <p className="font-medium">Shoxrux Shomurodov</p>
            <BadgeCheck className="size-4 fill-sky-500 text-background" />
          </div>
          <p className="text-xs text-muted-foreground">
            Product designer · Tashkent
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span>24 projects</span>
          <span>4.9 rating</span>
          <Button size="sm" className="h-7 rounded-full px-3">
            View profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function LikesCounter() {
  const [liked, setLiked] = useState(false);
  const count = liked ? 25 : 24;

  return (
    <Button
      variant={liked ? "default" : "outline"}
      size="sm"
      className="rounded-full"
      onClick={() => setLiked((current) => !current)}
      aria-pressed={liked}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      {count}
    </Button>
  );
}

export function SocialLoginButton() {
  const [provider, setProvider] = useState<string | null>(null);

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => setProvider("GitHub")}
      >
        <GitFork data-icon="inline-start" />
        Continue with GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => setProvider("X")}
      >
        <AtSign data-icon="inline-start" />
        Continue with X
      </Button>
      {provider ? (
        <p className="text-center text-xs text-muted-foreground">
          Connecting to {provider}...
        </p>
      ) : null}
    </div>
  );
}

export function NotificationBell() {
  const [unread, setUnread] = useState(3);

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full"
      onClick={() => setUnread(0)}
      aria-label={
        unread ? `${unread} unread notifications` : "No unread notifications"
      }
    >
      {unread ? <BellRing /> : <Bell />}
      {unread ? (
        <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-destructive text-[0.6rem] font-semibold text-destructive-foreground">
          {unread}
        </span>
      ) : null}
    </Button>
  );
}

export function VerifiedBadge() {
  return (
    <Badge className="rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300">
      <BadgeCheck className="fill-sky-500 text-background" />
      Verified creator
    </Badge>
  );
}

export function MorphingButton() {
  const [complete, setComplete] = useState(false);

  return (
    <Button
      className="min-w-32 rounded-full transition-all"
      variant={complete ? "secondary" : "default"}
      onClick={() => setComplete((current) => !current)}
      aria-pressed={complete}
    >
      <motion.span
        key={complete ? "done" : "idle"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5"
      >
        {complete ? <CheckCircle2 /> : <Rocket />}
        {complete ? "Published" : "Publish"}
      </motion.span>
    </Button>
  );
}

export function LiquidButton() {
  return (
    <Button className="relative overflow-hidden rounded-full border-0 bg-slate-950 px-5 text-white shadow-lg shadow-primary/20 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-white/90">
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-amber-300 opacity-80 blur-xl transition-transform duration-500 group-hover/button:scale-150" />
      <span className="relative inline-flex items-center gap-2">
        <WandSparkles className="size-4" />
        Create magic
      </span>
    </Button>
  );
}

export function AvatarExpand() {
  return (
    <div className="group flex items-center rounded-full border bg-background p-1 pr-3 shadow-sm transition hover:pr-4">
      <div className="flex -space-x-2 transition-all duration-300 group-hover:space-x-1">
        {map(contributors, (contributor) => (
          <Avatar
            key={contributor.initials}
            size="sm"
            className={cn(
              "ring-2 ring-background transition-transform group-hover:scale-110",
              contributor.tone,
            )}
          >
            <AvatarFallback className={contributor.tone}>
              {contributor.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="ml-3 text-xs font-medium text-muted-foreground group-hover:text-foreground">
        12 collaborators
      </span>
    </div>
  );
}

const imageChoices = [
  { label: "Aurora", className: "from-fuchsia-500 via-violet-500 to-sky-400" },
  { label: "Dawn", className: "from-amber-300 via-orange-500 to-rose-500" },
  { label: "Forest", className: "from-emerald-400 via-teal-600 to-slate-900" },
];

export function ImageCheckbox() {
  const [selected, setSelected] = useState("Aurora");

  return (
    <div className="grid grid-cols-3 gap-2">
      {map(imageChoices, (choice) => {
        const isSelected = selected === choice.label;

        return (
          <button
            key={choice.label}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelected(choice.label)}
            className={cn(
              "relative h-20 overflow-hidden rounded-lg bg-gradient-to-br text-left text-xs font-medium text-white transition hover:-translate-y-0.5",
              choice.className,
              isSelected &&
                "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
          >
            <span className="absolute inset-x-2 bottom-2">{choice.label}</span>
            {isSelected ? (
              <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-background text-foreground">
                <Check className="size-3" />
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function BottomModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-36">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <PanelBottom data-icon="inline-start" />
        Open bottom modal
      </Button>
      {open ? (
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-xl border bg-background p-4 shadow-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">Save this workspace?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your local changes will be ready for the next session.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <X />
            </Button>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Save workspace
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const nestedItems = [
  { id: "components", label: "Components", children: ["Buttons", "Cards"] },
  { id: "patterns", label: "Patterns", children: ["Navigation", "Forms"] },
];

export function NestedList() {
  const [expanded, setExpanded] = useState<string[]>(["components"]);

  const toggle = (id: string) => {
    setExpanded((current) =>
      includes(current, id)
        ? filter(current, (item) => item !== id)
        : concat(current, id),
    );
  };

  return (
    <div className="rounded-xl border bg-background p-2 text-sm">
      {map(nestedItems, (item) => {
        const isOpen = includes(expanded, item.id);

        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-muted"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <ChevronRight
                className={cn(
                  "size-4 transition-transform",
                  isOpen && "rotate-90",
                )}
              />
              <FolderOpen className="size-4 text-muted-foreground" />
              <span>{item.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {item.children.length}
              </span>
            </button>
            {isOpen ? (
              <div className="ml-8 border-l pl-3">
                {map(item.children, (child) => (
                  <button
                    key={child}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary/50" />
                    {child}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ActionDropdown() {
  const [action, setAction] = useState("none");

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          <MoreHorizontal data-icon="inline-start" />
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Project actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAction("Duplicated")}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setAction("Archived")}>
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setAction("Deleted")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {action !== "none" ? (
        <span className="text-xs text-muted-foreground">{action}</span>
      ) : null}
    </div>
  );
}

export function PreviewDetailsCard() {
  const [saved, setSaved] = useState(false);

  return (
    <Card className="overflow-hidden border-border/70">
      <div className="relative h-28 bg-gradient-to-br from-slate-950 via-violet-950 to-sky-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.28),transparent_35%)]" />
        <Badge className="absolute left-3 top-3 rounded-full bg-white/15 text-white backdrop-blur-sm">
          Featured
        </Badge>
      </div>
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium">Nebula workspace</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Realtime collaboration kit
            </p>
          </div>
          <Button
            variant={saved ? "default" : "outline"}
            size="icon-sm"
            onClick={() => setSaved((current) => !current)}
            aria-label="Save preview"
          >
            <Star className={cn("size-4", saved && "fill-current")} />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CircleDollarSign className="size-3.5" /> $24/mo
          </span>
          <span>Updated today</span>
        </div>
      </CardContent>
    </Card>
  );
}

const defaultTasks = [
  { id: "tokens", label: "Sync design tokens", done: true },
  { id: "review", label: "Review interaction states", done: false },
  { id: "release", label: "Prepare release notes", done: false },
];

export function DraggableList() {
  const [tasks, setTasks] = useState(defaultTasks);

  const moveTask = (index: number, direction: -1 | 1) => {
    const nextIndex = clamp(index + direction, 0, tasks.length - 1);
    if (nextIndex === index) return;
    const next = clone(tasks);
    const moved = pullAt(next, index);
    next.splice(nextIndex, 0, ...moved);
    setTasks(next);
  };

  return (
    <div className="grid gap-2 rounded-xl border bg-background p-2">
      {map(tasks, (task, index) => (
        <div
          key={task.id}
          className="flex items-center gap-2 rounded-lg border bg-muted/20 px-2 py-2"
        >
          <GripVertical className="size-4 text-muted-foreground" />
          <span
            className={cn(
              "flex-1 text-xs",
              task.done && "text-muted-foreground line-through",
            )}
          >
            {task.label}
          </span>
          <div className="flex gap-0.5">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => moveTask(index, -1)}
              disabled={index === 0}
              aria-label={`Move ${task.label} up`}
            >
              <ArrowUp />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => moveTask(index, 1)}
              disabled={index === tasks.length - 1}
              aria-label={`Move ${task.label} down`}
            >
              <ArrowDown />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FollowCursorLabel() {
  const [point, setPoint] = useState({ x: 50, y: 50 });

  return (
    <div
      className="relative h-36 overflow-hidden rounded-xl border bg-slate-950 text-white"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPoint({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
      }}
      onPointerLeave={() => setPoint({ x: 50, y: 50 })}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,.22),transparent_45%)]" />
      <motion.div
        className="pointer-events-none absolute rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-md"
        animate={{ left: point.x, top: point.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        Explore
      </motion.div>
      <span className="absolute bottom-3 left-3 text-xs text-white/50">
        Move your pointer
      </span>
    </div>
  );
}

export function FolderAnimation() {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      className="group mx-auto grid justify-items-center gap-2 text-center"
      aria-pressed={open}
    >
      <motion.div
        animate={{ rotateX: open ? -12 : 0, y: open ? -3 : 0 }}
        className="relative h-20 w-28 rounded-b-xl rounded-tr-xl bg-amber-400 shadow-lg shadow-amber-500/20 [transform-style:preserve-3d]"
      >
        <div className="absolute -top-3 left-0 h-4 w-12 rounded-t-lg bg-amber-300" />
        <div className="absolute inset-x-3 bottom-3 h-8 rounded-lg bg-amber-200/70 transition-transform group-hover:-translate-y-1" />
      </motion.div>
      <span className="text-xs font-medium">
        {open ? "Open folder" : "Project assets"}
      </span>
      <span className="text-[0.65rem] text-muted-foreground">
        Click to animate
      </span>
    </button>
  );
}

export function HolographicBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl border bg-slate-950 px-5 py-8 text-white">
      <div className="absolute -inset-20 -z-10 bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a,#7c3aed,#06b6d4,#0f172a)] opacity-70 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.2),transparent_25%),radial-gradient(circle_at_80%_90%,rgba(236,72,153,.22),transparent_25%)]" />
      <div className="relative z-10">
        {children ?? (
          <p className="text-sm text-white/70">
            A refractive surface for modern product sections.
          </p>
        )}
      </div>
    </div>
  );
}

export function CounterUp() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = 12840;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = clamp((now - start) / 900, 0, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="text-center">
      <p className="text-3xl font-semibold tracking-tight tabular-nums">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Monthly page views</p>
    </div>
  );
}

const flipWords = ["simple", "expressive", "shippable"];

export function FlipText() {
  const [index, setIndex] = useState(0);

  return (
    <button
      type="button"
      className="mx-auto flex items-center gap-2 text-lg font-semibold"
      onClick={() => setIndex((current) => (current + 1) % flipWords.length)}
    >
      Build something
      <span className="inline-flex min-w-24 justify-center overflow-hidden rounded-md bg-primary px-2 py-1 text-primary-foreground">
        <motion.span
          key={flipWords[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {flipWords[index]}
        </motion.span>
      </span>
    </button>
  );
}

const chatSeed = [
  {
    role: "assistant",
    text: "Hi! I can help you shape a polished component API.",
  },
  { role: "user", text: "Show me a concise dashboard pattern." },
];

export function AIChatInterface() {
  const [messages, setMessages] = useState(chatSeed);
  const [draft, setDraft] = useState("");

  const send = () => {
    const value = draft.trim();
    if (!value) return;
    setMessages((current) => concat(current, { role: "user", text: value }));
    setDraft("");
  };

  return (
    <Card className="overflow-hidden border-border/70">
      <CardHeader className="flex-row items-center justify-between border-b py-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-primary" /> Shoma assistant
        </CardTitle>
        <Badge variant="outline" className="rounded-full text-[0.65rem]">
          Online
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-3 p-3">
        <div className="grid max-h-28 gap-2 overflow-y-auto">
          {map(messages, (message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "max-w-[90%] rounded-lg px-2.5 py-2 text-xs",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send();
            }}
            placeholder="Ask anything..."
            aria-label="Chat message"
          />
          <Button size="icon" onClick={send} aria-label="Send message">
            <Send />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CurrencyConverterCard() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState(12_700);
  const converted = toNumber(amount || 0) * rate;

  return (
    <Card className="border-border/70">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <CreditCard className="size-4 text-primary" /> Quick conversion
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            aria-label="Amount"
          />
          <Badge variant="secondary" className="h-8 px-3">
            USD
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Exchange rate</span>
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() =>
              setRate((current) => (current === 12_700 ? 12_850 : 12_700))
            }
          >
            1 USD = {rate.toLocaleString()} UZS
          </button>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">You receive</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">
            {converted.toLocaleString()} UZS
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function FloatingChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-h-40 items-end justify-end">
      {open ? (
        <Card className="absolute bottom-12 right-0 w-56 border-border/70 shadow-xl">
          <CardContent className="p-3">
            <p className="text-sm font-medium">Need a hand?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our team usually replies in a few minutes.
            </p>
            <Button
              size="sm"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Start conversation
            </Button>
          </CardContent>
        </Card>
      ) : null}
      <Button
        size="icon-lg"
        className="rounded-full shadow-lg"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X /> : <MessageCircle />}
      </Button>
    </div>
  );
}

export function TripledHeroBlock() {
  return (
    <HolographicBackground>
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="max-w-xl">
          <Badge className="rounded-full bg-white/10 text-white">
            New · ShomaUI blocks
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Interfaces with a little more signal.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/65 sm:text-base">
            Composable sections inspired by the best motion-first UI patterns,
            shaped for real product work.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">
              <Rocket data-icon="inline-start" /> Start building
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Explore components <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
        <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:block">
          <Sparkles className="size-8 text-cyan-300" />
          <p className="mt-6 text-xs text-white/60">Motion-ready</p>
          <p className="text-xl font-semibold">42 patterns</p>
        </div>
      </div>
    </HolographicBackground>
  );
}

const dashboardStats = [
  { label: "Revenue", value: "$24.8k", change: "+18.4%" },
  { label: "Active users", value: "8,420", change: "+9.2%" },
  { label: "Conversion", value: "4.82%", change: "+1.8%" },
];

export function TripledDashboardBlock() {
  return (
    <Card className="border-border/70 bg-background">
      <CardHeader className="flex-row items-center justify-between border-b">
        <div>
          <CardTitle className="text-lg">Overview</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Your workspace performance
          </p>
        </div>
        <Button variant="outline" size="sm">
          Last 30 days <ChevronDown data-icon="inline-end" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {map(dashboardStats, (stat) => (
            <div key={stat.label} className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold">{stat.value}</p>
              <Badge
                variant="outline"
                className="mt-2 rounded-full text-[0.65rem] text-emerald-600"
              >
                {stat.change}
              </Badge>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Growth</p>
            <span className="text-xs text-muted-foreground">Jan — Jun</span>
          </div>
          <div className="mt-6 flex h-24 items-end gap-2">
            {map([28, 40, 34, 56, 49, 76, 64, 92, 72, 100], (height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-md bg-primary/20 transition hover:bg-primary"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TripledWizardForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const steps = ["Basics", "Preferences", "Finish"];

  return (
    <Card className="border-border/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Create workspace</CardTitle>
          <span className="text-xs text-muted-foreground">
            {step + 1} / {steps.length}
          </span>
        </div>
        <div className="mt-3 flex gap-1">
          {map(steps, (label, index) => (
            <div key={label} className="h-1 flex-1 rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full bg-primary transition-all",
                  index <= step ? "w-full" : "w-0",
                )}
              />
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="min-h-24">
          {step === 0 ? (
            <div>
              <p className="text-sm font-medium">What should we call it?</p>
              <Input
                className="mt-3"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Acme workspace"
              />
            </div>
          ) : null}
          {step === 1 ? (
            <div>
              <p className="text-sm font-medium">Pick a starting point</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button variant="outline" className="justify-start">
                  <Sparkles data-icon="inline-start" /> Design system
                </Button>
                <Button variant="outline" className="justify-start">
                  <Code2 data-icon="inline-start" /> Product dashboard
                </Button>
              </div>
            </div>
          ) : null}
          {step === 2 ? (
            <div className="grid justify-items-center gap-2 py-3 text-center">
              <CheckCircle2 className="size-8 text-emerald-500" />
              <p className="font-medium">
                {name || "Your workspace"} is ready.
              </p>
              <p className="text-xs text-muted-foreground">
                Invite your team when you are ready.
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-between gap-2">
          <Button
            variant="ghost"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button
            onClick={() =>
              setStep((current) => Math.min(current + 1, steps.length - 1))
            }
            disabled={step === steps.length - 1}
          >
            {step === steps.length - 2
              ? "Review"
              : step === steps.length - 1
                ? "Done"
                : "Continue"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const projects = [
  {
    name: "Orbit landing",
    type: "Website",
    progress: 82,
    tone: "from-violet-500 to-sky-400",
  },
  {
    name: "Atlas mobile",
    type: "Application",
    progress: 56,
    tone: "from-amber-400 to-rose-500",
  },
  {
    name: "Northstar docs",
    type: "Documentation",
    progress: 36,
    tone: "from-emerald-400 to-teal-700",
  },
];

export function TripledProjectsBlock() {
  return (
    <section className="grid gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Projects</p>
          <p className="mt-1 text-xs text-muted-foreground">
            A focused view of active work.
          </p>
        </div>
        <Button size="sm">
          <Plus data-icon="inline-start" /> New project
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {map(projects, (project) => (
          <Card key={project.name} className="border-border/70">
            <CardContent className="p-3">
              <div
                className={cn(
                  "h-20 rounded-lg bg-gradient-to-br",
                  project.tone,
                )}
              />
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.type}
                  </p>
                </div>
                <ActionDropdown />
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[0.65rem] text-muted-foreground">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function TripledNewsletterBlock() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-muted/30 p-6 text-center sm:p-10">
      <div className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <Badge variant="outline" className="rounded-full">
          ShomaUI dispatch
        </Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Patterns worth shipping.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          One useful component, block or interaction in your inbox every other
          week.
        </p>
        {subscribed ? (
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
            <CheckCircle2 className="size-4" /> You are on the list.
          </div>
        ) : (
          <div className="mx-auto mt-5 flex max-w-sm gap-2">
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <Button onClick={() => setSubscribed(Boolean(email.trim()))}>
              Join
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function VolumeComponent() {
  const [volume, setVolume] = useState(64);

  return (
    <div className="flex items-center gap-3 rounded-full border bg-background px-3 py-2">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setVolume((current) => (current ? 0 : 64))}
        aria-label="Toggle volume"
      >
        <Bell className={cn("size-4", !volume && "text-muted-foreground")} />
      </Button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(event) => setVolume(toNumber(event.target.value))}
        className="h-1.5 w-28 accent-primary"
        aria-label="Volume"
      />
      <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
        {volume}%
      </span>
    </div>
  );
}

export function UploadDropzone() {
  const [fileName, setFileName] = useState("");

  return (
    <label className="grid cursor-pointer justify-items-center gap-2 rounded-xl border border-dashed p-5 text-center transition hover:border-primary hover:bg-primary/5">
      <input
        type="file"
        className="sr-only"
        onChange={(event) => setFileName(get(event.target.files, "0.name", ""))}
      />
      <Upload className="size-5 text-muted-foreground" />
      <span className="text-sm font-medium">
        {fileName || "Drop a file or browse"}
      </span>
      <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
    </label>
  );
}

export function ContactComposer() {
  const [sent, setSent] = useState(false);

  return sent ? (
    <div className="grid justify-items-center gap-2 rounded-xl border bg-emerald-500/5 p-6 text-center">
      <CheckCircle2 className="size-7 text-emerald-600" />
      <p className="font-medium">Message sent</p>
      <p className="text-xs text-muted-foreground">
        We will get back to you shortly.
      </p>
    </div>
  ) : (
    <div className="grid gap-3 rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs font-medium">Send a note</p>
          <p className="text-[0.65rem] text-muted-foreground">
            Usually replies within a day
          </p>
        </div>
      </div>
      <Textarea
        placeholder="Tell us what you are building..."
        aria-label="Message"
      />
      <Button onClick={() => setSent(true)}>
        <Send data-icon="inline-start" /> Send message
      </Button>
    </div>
  );
}

export function NotchCard() {
  return (
    <div className="relative mx-auto max-w-56 rounded-2xl border bg-background px-4 pb-4 pt-7 text-center shadow-sm">
      <div className="absolute left-1/2 top-0 h-5 w-20 -translate-x-1/2 rounded-b-xl border-x border-b bg-muted/70" />
      <div className="mx-auto grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
        <UserRound className="size-5" />
      </div>
      <p className="mt-3 text-sm font-medium">Profile notch</p>
      <p className="mt-1 text-xs text-muted-foreground">
        A decorative anchor for floating content.
      </p>
    </div>
  );
}

export function QuickCommand() {
  const [query, setQuery] = useState("");
  const commands = ["Open dashboard", "Create project", "Invite teammate"];
  const visible = useMemo(
    () =>
      filter(commands, (command) => includes(toLower(command), toLower(query))),
    [query],
  );

  return (
    <div className="rounded-xl border bg-background p-2 shadow-sm">
      <div className="flex items-center gap-2 border-b px-2 pb-2">
        <SearchIcon />
        <Input
          className="h-7 border-0 px-0 shadow-none focus-visible:ring-0"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search command..."
          aria-label="Search commands"
        />
      </div>
      <div className="grid pt-1">
        {map(visible, (command) => (
          <button
            key={command}
            type="button"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-xs hover:bg-muted"
          >
            <ArrowRight className="size-3.5 text-muted-foreground" />
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 text-muted-foreground"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m16 16 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
