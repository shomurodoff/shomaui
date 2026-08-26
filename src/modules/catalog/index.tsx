import { useMemo, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Code2, ExternalLink, Search } from "lucide-react";
import { filter, includes, kebabCase, map, size, toLower, trim } from "lodash";

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
import { Separator } from "#/components/ui/separator";
import CodeSheet from "#/modules/components/code-sheet";
import CatalogLayout from "#/layouts/catalog";
import ComponentsLayout from "#/layouts/components";
import {
  getCatalogItem,
  getCatalogItems,
  getCatalogProduct,
  type CatalogItem,
  type CatalogKind,
} from "./data";
import { CatalogItemLink } from "./link";
import { useComponentNavigation } from "#/modules/components/navigation-state";
import { getComponentFamily } from "#/modules/components/data";
import { useCatalogNavigation } from "./navigation-state";

const getViewStorageKey = (kind: CatalogKind) => `shomaui-${kind}-view`;

const getStoredView = (kind: CatalogKind): "grid" | "list" => {
  if (typeof window === "undefined") return "grid";

  try {
    return window.localStorage.getItem(getViewStorageKey(kind)) === "list"
      ? "list"
      : "grid";
  } catch {
    return "grid";
  }
};

const CatalogCard = ({ item }: { item: CatalogItem }) => {
  const Preview = item.preview;

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
    <Card className="group gap-3 bg-background p-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="p-0">
        <CatalogItemLink
          item={item}
          className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          ariaLabel={`Open ${item.name}`}
          onClick={handlePreviewClick}
        >
          <Preview />
        </CatalogItemLink>
      </CardContent>
      <CardHeader className="gap-2 px-3 pb-2 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-base">{item.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2 text-xs leading-5">
              {item.description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 rounded-full text-[0.65rem]"
          >
            {item.category}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export function CatalogIndexPage({ kind }: { kind: CatalogKind }) {
  const product = getCatalogProduct(kind);
  const items = useMemo(() => getCatalogItems(kind), [kind]);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">(() => getStoredView(kind));
  const activeCategory = useCatalogNavigation(
    (state) => state.activeCategories[kind] ?? null,
  );
  const setActiveCategory = useCatalogNavigation(
    (state) => state.setActiveCategory,
  );

  const visibleItems = useMemo(() => {
    const normalizedQuery = toLower(trim(query));

    return filter(items, (item) => {
      const searchable = [
        item.name,
        item.category,
        item.description,
        ...item.tags,
      ].join(" ");
      const matchesCategory =
        !activeCategory || kebabCase(item.category) === activeCategory;
      const matchesQuery =
        !normalizedQuery || includes(toLower(searchable), normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, items, query]);

  const handleViewChange = (nextView: "grid" | "list") => {
    setView(nextView);
    try {
      window.localStorage.setItem(getViewStorageKey(kind), nextView);
    } catch {
      // Keep the in-memory preference when local storage is unavailable.
    }
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategory(kind, null);
  };

  return (
    <CatalogLayout
      kind={kind}
      search={{ value: query, onChange: setQuery }}
      view={{ value: view, onChange: handleViewChange }}
    >
      <main className="mx-auto w-full max-w-[1524px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-9">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            {product.label}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.label}
            </h1>
            <Badge variant="outline" className="rounded-full px-2.5">
              {items.length}
            </Badge>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {product.description} Browse copy-ready ShomaUI primitives for React
            and Tailwind CSS.
          </p>
        </div>

        {size(visibleItems) ? (
          <div
            className={
              view === "list"
                ? "grid grid-cols-1 gap-5"
                : "grid gap-7 md:grid-cols-2 xl:grid-cols-4"
            }
          >
            {map(visibleItems, (item) => (
              <CatalogCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <Empty className="min-h-72 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No {product.label.toLowerCase()} found</EmptyTitle>
              <EmptyDescription>
                Try another search or clear the selected filter.
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
    </CatalogLayout>
  );
}

const NotFoundCatalogItem = ({ kind }: { kind: CatalogKind }) => {
  const product = getCatalogProduct(kind);

  return (
    <section className="flex min-h-[calc(100svh-10rem)] items-center justify-center px-4 py-16">
      <Empty className="max-w-lg">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Code2 />
          </EmptyMedia>
          <EmptyTitle>Component not found</EmptyTitle>
          <EmptyDescription>
            This item is not part of the {product.label.toLowerCase()} catalog.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            render={<Link to={product.basePath} />}
            nativeButton={false}
            variant="outline"
          >
            <ArrowLeft data-icon="inline-start" />
            Back to {product.label}
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  );
};

export function CatalogDetailPage({
  kind,
  slug,
}: {
  kind: CatalogKind;
  slug: string;
}) {
  const product = getCatalogProduct(kind);
  const item = getCatalogItem(kind, slug);
  const [codeOpen, setCodeOpen] = useState(false);
  const setActiveComponentCategory = useComponentNavigation(
    (state) => state.setActiveCategory,
  );
  const setActiveCatalogCategory = useCatalogNavigation(
    (state) => state.setActiveCategory,
  );

  if (!item) {
    const notFoundContent = <NotFoundCatalogItem kind={kind} />;

    return kind === "components" ? (
      <ComponentsLayout>{notFoundContent}</ComponentsLayout>
    ) : (
      <CatalogLayout kind={kind}>{notFoundContent}</CatalogLayout>
    );
  }

  const Preview = item.preview;

  const detailContent = (
    <>
      <main className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Button
            render={<Link to={product.basePath} />}
            nativeButton={false}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft data-icon="inline-start" />
            All {product.label}
          </Button>
          <Button onClick={() => setCodeOpen(true)} size="sm">
            <Code2 data-icon="inline-start" />
            View code & install
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <div className="mb-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {product.singularLabel}
                </Badge>
                {kind === "components" ? (
                  <Link
                    to="/components"
                    onClick={() =>
                      setActiveComponentCategory(
                        getComponentFamily(item.slug, item.name).groupSlug,
                      )
                    }
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Badge variant="secondary" className="rounded-full">
                      {getComponentFamily(item.slug, item.name).groupName}
                    </Badge>
                  </Link>
                ) : (
                  <Link
                    to={product.basePath}
                    onClick={() =>
                      setActiveCatalogCategory(kind, kebabCase(item.category))
                    }
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Badge variant="secondary" className="rounded-full">
                      {item.category}
                    </Badge>
                  </Link>
                )}
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {item.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Card className="overflow-hidden bg-background p-2">
              <CardContent className="p-0">
                <Preview />
              </CardContent>
            </Card>
          </div>

          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">About this item</CardTitle>
                <CardDescription>
                  Copy it into your own project and make it yours.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {map(item.tags, (tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Dependencies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {map(item.dependencies, (dependency) => (
                      <code
                        key={dependency}
                        className="rounded bg-muted px-1.5 py-0.5 text-xs"
                      >
                        {dependency}
                      </code>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid gap-1 text-xs text-muted-foreground">
                  <span>Source: {item.author}</span>
                  <span>License: {item.license}</span>
                </div>
                {item.attribution ? (
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.attribution}
                  </p>
                ) : null}
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
                >
                  View reference source{" "}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <CodeSheet
        open={codeOpen}
        onOpenChange={setCodeOpen}
        title={item.name}
        registrySlug={item.registryName}
        code={item.code}
      />
    </>
  );

  return kind === "components" ? (
    <ComponentsLayout>{detailContent}</ComponentsLayout>
  ) : (
    <CatalogLayout kind={kind}>{detailContent}</CatalogLayout>
  );
}
