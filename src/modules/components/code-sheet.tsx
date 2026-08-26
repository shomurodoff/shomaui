import { Fragment, useRef, useState } from "react";

import { Check, Copy, Terminal } from "lucide-react";
import { get, has, map, split } from "lodash";

import { Button } from "#/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "#/components/ui/card.tsx";
import { ScrollArea } from "#/components/ui/scroll-area.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "#/components/ui/sheet.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "#/components/ui/tabs.tsx";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
type CopyTarget = "install" | "code";

type CodeSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  registrySlug: string;
  code: string;
};

const packageManagers: Array<{ value: PackageManager; label: string }> = [
  { value: "pnpm", label: "pnpm" },
  { value: "npm", label: "npm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
];

const packageManagerCommands: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

const registryBaseUrl = "https://shomaui.dev/r";

const CodeSheet = ({
  open,
  onOpenChange,
  title,
  registrySlug,
  code,
}: CodeSheetProps) => {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commandPrefix = get(
    packageManagerCommands,
    packageManager,
    packageManagerCommands.npm,
  );
  const installCommand = `${commandPrefix} ${registryBaseUrl}/${registrySlug}.json`;
  const codeLines = split(code, "\n");

  const copyToClipboard = async (value: string, target: CopyTarget) => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopiedTarget(target);

      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopiedTarget(null), 1600);
    } catch {
      setCopiedTarget(null);
    }
  };

  const handlePackageManagerChange = (value: string | null) => {
    if (value && has(packageManagerCommands, value)) {
      setPackageManager(value as PackageManager);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100%,50rem)] gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <SheetHeader className="border-b px-6 py-5 sm:px-7">
          <SheetTitle>Installation</SheetTitle>
          <SheetDescription className="sr-only">
            Install {title} and view its source code.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-7 px-6 py-6 sm:px-7">
            <Card size="sm" className="gap-0 overflow-hidden py-0">
              <CardHeader className="flex flex-row items-center justify-between gap-3 border-b px-4 py-3">
                <Tabs
                  value={packageManager}
                  onValueChange={handlePackageManagerChange}
                  className="min-w-0 gap-0"
                >
                  <TabsList variant="line" className="gap-2 p-0">
                    {map(packageManagers, (manager) => (
                      <TabsTrigger
                        key={manager.value}
                        value={manager.value}
                        className="h-8 rounded-md px-2.5 text-xs"
                      >
                        {manager.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {map(packageManagers, (manager) => (
                    <TabsContent
                      key={manager.value}
                      value={manager.value}
                      className="sr-only"
                    >
                      {manager.label} installation command
                    </TabsContent>
                  ))}
                </Tabs>
                <Terminal
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 px-4 py-4">
                <code className="min-w-0 overflow-x-auto text-xs leading-6 text-foreground sm:text-sm">
                  {installCommand}
                </code>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Copy installation command"
                  onClick={() => copyToClipboard(installCommand, "install")}
                >
                  {copiedTarget === "install" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card size="sm" className="gap-0 overflow-hidden py-0">
              <CardHeader className="flex flex-row items-center justify-between gap-3 border-b px-4 py-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <span>Code</span>
                  <span className="font-normal text-muted-foreground">
                    {title}
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Copy source code"
                  onClick={() => copyToClipboard(code, "code")}
                >
                  {copiedTarget === "code" ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="overflow-x-auto bg-muted/10 p-0">
                <pre className="min-w-max py-4 text-xs leading-6 sm:text-sm">
                  <code>
                    {map(codeLines, (line, index) => (
                      <Fragment key={`${index}-${line}`}>
                        <span className="mr-5 inline-block w-5 select-none text-right text-muted-foreground/60">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{line || " "}</span>
                        {"\n"}
                      </Fragment>
                    ))}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CodeSheet;
