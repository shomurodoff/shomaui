import { useRef, useState } from "react";

import { Blocks, Check, ChevronRight, Copy } from "lucide-react";
import { get, map, size as collectionSize } from "lodash";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "#/components/ui/card.tsx";
import { cn } from "#/lib/utils.ts";
import ComponentsLayout from "#/layouts/components";
import CodeSheet from "#/modules/components/code-sheet.tsx";
import { tooltipExamples, type TooltipExample } from "./examples.tsx";

const TooltipPage = () => {
  const [selectedExample, setSelectedExample] = useState<TooltipExample | null>(
    null,
  );
  const [copiedExampleId, setCopiedExampleId] = useState<string | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyExample = async (example: TooltipExample) => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(get(example, "code", ""));
      setCopiedExampleId(get(example, "id"));

      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopiedExampleId(null), 1600);
    } catch {
      setCopiedExampleId(null);
    }
  };

  return (
    <ComponentsLayout>
      <main className="mx-auto w-full max-w-[1524px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-10 flex flex-col gap-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Tooltip</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                Shadcn Tooltip
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                Browse accessible tooltip patterns for actions, icons, and
                contextual help. The animated variant accepts any React node as
                a trigger and as tooltip content.
              </p>
            </div>
            <Badge className="shrink-0 gap-2 px-3 py-1.5 text-sm">
              <Blocks data-icon="inline-start" />
              {collectionSize(tooltipExamples)} examples
            </Badge>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {map(tooltipExamples, (example) => {
            const Preview = get(example, "preview");
            const exampleId = get(example, "id", "");
            const isCopied = copiedExampleId === exampleId;

            if (!Preview) return null;

            return (
              <Card
                key={exampleId}
                className="overflow-visible bg-background py-0"
              >
                <CardContent className="p-1.5 sm:p-2">
                  <div
                    className={cn(
                      "flex min-h-[15rem] items-center justify-center overflow-visible rounded-lg border bg-background px-6 py-12 sm:min-h-[17rem]",
                      get(example, "previewClassName"),
                    )}
                  >
                    <Preview />
                  </div>
                </CardContent>
                <CardFooter className="justify-between gap-4 bg-background px-3 py-3 sm:px-4">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-base">
                      {get(example, "title")}
                    </CardTitle>
                    <CardDescription className="mt-1 truncate">
                      {get(example, "description")}
                    </CardDescription>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Copy ${get(example, "title")} code`}
                      onClick={() => copyExample(example)}
                    >
                      {isCopied ? (
                        <Check aria-hidden="true" />
                      ) : (
                        <Copy aria-hidden="true" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedExample(example)}
                    >
                      View code
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {selectedExample && (
          <CodeSheet
            open={Boolean(selectedExample)}
            onOpenChange={(open) => {
              if (!open) setSelectedExample(null);
            }}
            title={get(selectedExample, "title", "Tooltip")}
            registrySlug={get(selectedExample, "slug", "tooltip")}
            code={get(selectedExample, "code", "")}
          />
        )}
      </main>
    </ComponentsLayout>
  );
};

export default TooltipPage;
