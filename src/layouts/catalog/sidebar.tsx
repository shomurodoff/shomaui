import { useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import {
  filter,
  get,
  includes,
  kebabCase,
  last,
  map,
  split,
  toLower,
  trim,
} from "lodash";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "#/components/ui/sidebar";
import {
  getCatalogCategories,
  getCatalogItem,
  getCatalogProduct,
  type CatalogCategory,
  type CatalogKind,
} from "#/modules/catalog/data";
import { useCatalogNavigation } from "#/modules/catalog/navigation-state";

const CatalogCategoryMenuItem = ({
  category,
  isActive,
  onSelect,
}: {
  category: CatalogCategory;
  isActive: boolean;
  onSelect: (category: CatalogCategory) => void;
}) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link to={category.href} />}
        isActive={isActive}
        onClick={() => {
          onSelect(category);
          if (isMobile) setOpenMobile(false);
        }}
        className="h-9 px-3 text-[0.95rem]"
      >
        <span className="truncate">{category.label}</span>
      </SidebarMenuButton>
      <SidebarMenuBadge>{category.count}</SidebarMenuBadge>
    </SidebarMenuItem>
  );
};

const CatalogSidebar = ({ kind }: { kind: CatalogKind }) => {
  const location = useLocation();
  const [categoryQuery, setCategoryQuery] = useState("");
  const categories = useMemo(() => getCatalogCategories(kind), [kind]);
  const product = getCatalogProduct(kind);
  const selectedCategory = useCatalogNavigation((state) =>
    get(state.activeCategories, kind, null),
  );
  const setSelectedCategory = useCatalogNavigation(
    (state) => state.setActiveCategory,
  );
  const visibleCategories = useMemo(() => {
    const query = toLower(trim(categoryQuery));

    if (!query) return categories;

    return filter(categories, (category) =>
      includes(toLower(category.label), query),
    );
  }, [categories, categoryQuery]);

  const isCatalogIndex =
    location.pathname === product.basePath ||
    location.pathname === `${product.basePath}/`;
  const detailSlug = last(split(location.pathname, "/"));
  const detailItem = getCatalogItem(kind, detailSlug ?? "");
  const detailCategory = detailItem ? kebabCase(detailItem.category) : null;
  const activeCategory = isCatalogIndex ? selectedCategory : detailCategory;

  const handleCategorySelect = (category: CatalogCategory) => {
    setSelectedCategory(kind, category.slug === "all" ? null : category.slug);
  };

  return (
    <Sidebar
      className="top-16 h-[calc(100svh-4rem)] bg-none"
      collapsible="offcanvas"
    >
      <SidebarHeader className="gap-3 border-b px-4 py-3 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <Filter className="pointer-events-none absolute top-2 left-1.5 size-4 text-muted-foreground" />
            <SidebarInput
              value={categoryQuery}
              onChange={(event) => setCategoryQuery(event.target.value)}
              placeholder="Filter categories..."
              aria-label="Filter categories"
              className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
            />
          </div>
          <SidebarTrigger
            className="shrink-0"
            aria-label="Compact view"
            title="Compact view"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="sr-only">
            {product.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {map(visibleCategories, (category) => (
                <CatalogCategoryMenuItem
                  key={category.slug}
                  category={category}
                  isActive={
                    category.slug === "all"
                      ? isCatalogIndex && !activeCategory
                      : category.slug === activeCategory
                  }
                  onSelect={handleCategorySelect}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CatalogSidebar;
