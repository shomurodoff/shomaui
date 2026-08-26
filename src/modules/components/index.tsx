import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  filter,
  get,
  includes,
  map,
  size as collectionSize,
  some,
  toLower,
  trim,
} from "lodash";

import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "#/components/ui/card.tsx";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty.tsx";
import { Input } from "#/components/ui/input.tsx";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group.tsx";

import ComponentsLayout from "#/layouts/components";
import { cn } from "#/lib/utils.ts";
import {
  componentCards,
  componentTopics,
  type ComponentTopic,
} from "#/modules/components/data.ts";
import type { ComponentViewMode } from "#/layouts/components/types";

const componentViewStorageKey = "shomaui-components-view";

const getStoredComponentView = (): ComponentViewMode => {
  if (typeof window === "undefined") return "grid";

  try {
    return window.localStorage.getItem(componentViewStorageKey) === "list"
      ? "list"
      : "grid";
  } catch {
    return "grid";
  }
};

const isComponentTopic = (value: string): value is ComponentTopic =>
  includes(componentTopics, value);

function ComponentsPage() {
  const [componentQuery, setComponentQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<ComponentTopic | null>(null);
  const [componentView, setComponentView] = useState<ComponentViewMode>(
    getStoredComponentView,
  );
  const totalComponentCount = collectionSize(componentCards);

  const handleComponentViewChange = (nextView: ComponentViewMode) => {
    setComponentView(nextView);

    try {
      window.localStorage.setItem(componentViewStorageKey, nextView);
    } catch {
      // Keep the in-memory view when browser storage is unavailable.
    }
  };

  const visibleCards = useMemo(() => {
    const query = toLower(trim(componentQuery));

    return filter(componentCards, (card) => {
      const tags = get(card, "tags", []);
      const name = get(card, "name", "");
      const matchesTopic = !activeTopic || includes(tags, activeTopic);
      const matchesQuery =
        !query ||
        includes(toLower(name), query) ||
        some(tags, (tag) => includes(toLower(tag), query));

      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, componentQuery]);

  const resetFilters = () => {
    setComponentQuery("");
    setActiveTopic(null);
  };

  const handleTopicChange = (nextTopics: string[]) => {
    const nextTopic = get(nextTopics, 0, "");

    setActiveTopic(isComponentTopic(nextTopic) ? nextTopic : null);
  };

  return (
    <ComponentsLayout
      componentSearch={{
        value: componentQuery,
        onChange: setComponentQuery,
      }}
      componentView={{
        value: componentView,
        onChange: handleComponentViewChange,
      }}
    >
      <main className="mx-auto w-full max-w-[1524px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-9">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Components
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Free Shadcn UI Components
            </h1>
            <Badge variant="outline" className="rounded-full px-2.5">
              {totalComponentCount}
            </Badge>
          </div>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Browse {totalComponentCount} currently available component previews
            for React and Tailwind CSS.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <ToggleGroup
            value={activeTopic ? [activeTopic] : []}
            onValueChange={handleTopicChange}
            variant="outline"
            size="lg"
            spacing={2}
            aria-label="Filter components by topic"
            className="flex flex-wrap"
          >
            {map(componentTopics, (topic) => (
              <ToggleGroupItem
                key={topic}
                value={topic}
                className="h-10 rounded-full bg-background px-4 data-[state=on]:bg-muted"
              >
                {topic}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="relative w-full xl:max-w-80">
            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <Input
              value={componentQuery}
              onChange={(event) => setComponentQuery(event.target.value)}
              placeholder="Search..."
              aria-label="Search catalog"
              className="h-10 rounded-full pl-9"
            />
          </div>
        </div>

        {collectionSize(visibleCards) ? (
          <div
            className={cn(
              "grid gap-7",
              componentView === "list"
                ? "grid-cols-1"
                : "md:grid-cols-2 xl:grid-cols-4",
            )}
          >
            {map(visibleCards, (card) => {
              const Preview = get(card, "preview");
              const cardSlug = get(card, "slug", "");

              return (
                <Card
                  key={cardSlug}
                  className="min-w-0 gap-2 bg-background py-2"
                >
                  <CardContent className="p-2">
                    <Preview />
                  </CardContent>
                  <CardHeader className="flex items-center justify-between gap-3 px-3 py-2">
                    <CardTitle className="truncate text-base">
                      {get(card, "name")}
                    </CardTitle>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {get(card, "count")} components
                    </span>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        ) : (
          <Empty className="min-h-72 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No components found</EmptyTitle>
              <EmptyDescription>
                Try a different search or clear the selected filters.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </main>
    </ComponentsLayout>
  );
}

export default ComponentsPage;
