import { useMemo, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  filter,
  get,
  includes,
  map,
  size as collectionSize,
  toLower,
  trim,
} from "lodash";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty";

import ComponentsLayout from "#/layouts/components";
import type { ComponentViewMode } from "#/layouts/components/types";
import { cn } from "#/lib/utils";
import { componentCards } from "#/modules/components/data";
import { useComponentNavigation } from "#/modules/components/navigation-state";

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

const ComponentCard = ({ card }: { card: (typeof componentCards)[number] }) => {
  const Preview = card.preview;

  const handlePreviewClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest(
        "button, input, select, textarea, [role='tab'], [role='menuitem']",
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <Card className="group min-w-0 gap-3 bg-background p-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="p-0">
        <Link
          to={get(card, "href")}
          className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Open ${card.name}`}
          onClick={handlePreviewClick}
        >
          <Preview />
        </Link>
      </CardContent>
      <CardHeader className="gap-2 px-3 pb-2 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{card.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2 text-xs leading-5">
              {card.description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 rounded-full text-[0.65rem]"
          >
            {card.category}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

function ComponentsPage() {
  const [componentQuery, setComponentQuery] = useState("");
  const [componentView, setComponentView] = useState<ComponentViewMode>(
    getStoredComponentView,
  );
  const activeCategory = useComponentNavigation(
    (state) => state.activeCategory,
  );
  const setActiveCategory = useComponentNavigation(
    (state) => state.setActiveCategory,
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
      const searchable = [
        card.name,
        card.category,
        card.description,
        ...card.tags,
      ].join(" ");
      const matchesCategory =
        !activeCategory || card.categorySlug === activeCategory;
      const matchesQuery = !query || includes(toLower(searchable), query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, componentQuery]);

  const resetFilters = () => {
    setComponentQuery("");
    setActiveCategory(null);
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
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Browse legacy and ShomaUI component patterns for React and Tailwind
            CSS.
          </p>
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
            {map(visibleCards, (card) => (
              <ComponentCard key={card.slug} card={card} />
            ))}
          </div>
        ) : (
          <Empty className="min-h-72 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No components found</EmptyTitle>
              <EmptyDescription>
                Try another search or clear the selected filters.
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
