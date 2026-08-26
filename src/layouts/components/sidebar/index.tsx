import { useMemo, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { filter, get, includes, last, map, split, toLower, trim } from "lodash";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarTrigger,
} from "#/components/ui/sidebar";
import {
  componentCategories,
  getComponentCard,
  type ComponentCategory,
} from "#/modules/components/data";
import { useComponentNavigation } from "#/modules/components/navigation-state";

import CategoryMenuItem from "./category-menu-item";

const ComponentsSidebar = () => {
  const location = useLocation();
  const [categoryQuery, setCategoryQuery] = useState("");
  const selectedCategory = useComponentNavigation(
    (state) => state.activeCategory,
  );
  const setSelectedCategory = useComponentNavigation(
    (state) => state.setActiveCategory,
  );
  const visibleCategories = useMemo(() => {
    const query = toLower(trim(categoryQuery));

    if (!query) return componentCategories;

    return filter(componentCategories, (category) =>
      includes(toLower(get(category, "label")), query),
    );
  }, [categoryQuery]);

  const isComponentsIndex =
    location.pathname === "/components" || location.pathname === "/components/";
  const detailSlug = last(split(location.pathname, "/"));
  const detailCategory = get(getComponentCard(detailSlug ?? ""), "groupSlug");
  const activeCategory = isComponentsIndex ? selectedCategory : detailCategory;

  const handleCategorySelect = (category: ComponentCategory) => {
    setSelectedCategory(category.slug === "all" ? null : category.slug);
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
          <SidebarGroupLabel className="sr-only">Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {map(visibleCategories, (category) => (
                <CategoryMenuItem
                  key={get(category, "slug")}
                  category={category}
                  isActive={
                    get(category, "slug") === "all"
                      ? isComponentsIndex && !activeCategory
                      : get(category, "slug") === activeCategory
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

export default ComponentsSidebar;
