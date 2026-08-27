import { useMemo, useState, type ComponentType } from "react";
import { Blocks, Search } from "lucide-react";
import { filter, find, includes, map, toLower, trim } from "lodash";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import CodeSheet from "#/modules/components/code-sheet";
import {
  TripledDashboardBlock,
  TripledHeroBlock,
  TripledNewsletterBlock,
  TripledProjectsBlock,
  TripledWizardForm,
} from "#/components/shomaui/components/tripled-components";

type BlockSpec = {
  name: string;
  category: string;
  description: string;
  component: ComponentType;
  registrySlug: string;
  code: string;
};

const blockSpecs: BlockSpec[] = [
  {
    name: "Hero Block",
    category: "Marketing",
    description:
      "Motion-ready hero section for product launches and landing pages.",
    component: TripledHeroBlock,
    registrySlug: "tripled-components",
    code: `import { TripledHeroBlock } from "@/components/shomaui/components/tripled-components";\n\n<TripledHeroBlock />`,
  },
  {
    name: "Dashboard Block",
    category: "Product",
    description: "Responsive metrics and growth overview for an app shell.",
    component: TripledDashboardBlock,
    registrySlug: "tripled-components",
    code: `import { TripledDashboardBlock } from "@/components/shomaui/components/tripled-components";\n\n<TripledDashboardBlock />`,
  },
  {
    name: "Wizard Form",
    category: "Forms",
    description:
      "Three-step onboarding flow with local state and progress feedback.",
    component: TripledWizardForm,
    registrySlug: "tripled-components",
    code: `import { TripledWizardForm } from "@/components/shomaui/components/tripled-components";\n\n<TripledWizardForm />`,
  },
  {
    name: "Projects Block",
    category: "Product",
    description: "Project overview cards with progress and contextual actions.",
    component: TripledProjectsBlock,
    registrySlug: "tripled-components",
    code: `import { TripledProjectsBlock } from "@/components/shomaui/components/tripled-components";\n\n<TripledProjectsBlock />`,
  },
  {
    name: "Newsletter Block",
    category: "Content",
    description: "Focused newsletter signup with success confirmation state.",
    component: TripledNewsletterBlock,
    registrySlug: "tripled-components",
    code: `import { TripledNewsletterBlock } from "@/components/shomaui/components/tripled-components";\n\n<TripledNewsletterBlock />`,
  },
];

const BlocksPage = () => {
  const [query, setQuery] = useState("");
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const visibleBlocks = useMemo(() => {
    const normalizedQuery = toLower(trim(query));
    return filter(blockSpecs, (block) => {
      if (!normalizedQuery) return true;
      return includes(
        toLower(`${block.name} ${block.category} ${block.description}`),
        normalizedQuery,
      );
    });
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-[1524px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-6 border-b pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Blocks className="size-4" />
            Blocks
            <Badge variant="outline" className="rounded-full">
              {blockSpecs.length}
            </Badge>
          </div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Sections with a head start.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Compose real product surfaces from responsive ShomaUI blocks
            inspired by UI TripleD’s dashboards, forms and marketing patterns.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks..."
            aria-label="Search blocks"
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8">
        {map(visibleBlocks, (block) => {
          const Block = block.component;

          return (
            <Card
              key={block.name}
              className="overflow-hidden border-border/70 bg-background p-2"
            >
              <CardHeader className="flex flex-col gap-2 px-3 pb-4 pt-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{block.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="rounded-full text-[0.65rem]"
                    >
                      {block.category}
                    </Badge>
                  </div>
                  <CardDescription className="mt-1 max-w-xl">
                    {block.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveBlock(block.name)}
                >
                  View code
                </Button>
              </CardHeader>
              <CardContent className="overflow-hidden rounded-xl border bg-muted/10 p-4 sm:p-6">
                <Block />
              </CardContent>
            </Card>
          );
        })}
        {!visibleBlocks.length ? (
          <div className="grid min-h-48 place-items-center rounded-xl border border-dashed text-sm text-muted-foreground">
            No blocks match “{query}”.
          </div>
        ) : null}
      </div>
      {(() => {
        const selectedBlock = find(
          blockSpecs,
          (block) => block.name === activeBlock,
        );

        return selectedBlock ? (
          <CodeSheet
            open
            onOpenChange={(open) => {
              if (!open) setActiveBlock(null);
            }}
            title={selectedBlock.name}
            registrySlug={selectedBlock.registrySlug}
            code={selectedBlock.code}
          />
        ) : null;
      })()}
    </main>
  );
};

export default BlocksPage;
