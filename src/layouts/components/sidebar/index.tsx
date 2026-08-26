import { useMemo, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Filter, LayoutGrid } from "lucide-react";
import { filter, get, includes, map, toLower, trim } from "lodash";

import { Button } from "#/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarTrigger,
} from "#/components/ui/sidebar";
import { componentCategories } from "#/modules/components/data";

import CategoryMenuItem from "./category-menu-item";

const ComponentsSidebar = () => {
  const location = useLocation();
  const [categoryQuery, setCategoryQuery] = useState("");
  const visibleCategories = useMemo(() => {
    const query = toLower(trim(categoryQuery));

    if (!query) return componentCategories;

    return filter(componentCategories, (category) =>
      includes(toLower(get(category, "label")), query),
    );
  }, [categoryQuery]);

  return (
    <Sidebar
      className="top-16 h-[calc(100svh-4rem)] bg-none"
      collapsible="offcanvas"
    >
      <SidebarHeader className="h-16 justify-center border-b px-4 group-data-[collapsible=icon]:px-2">
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
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Grid view"
            className="shrink-0 group-data-[collapsible=icon]:hidden"
          >
            <LayoutGrid />
          </Button>
          <SidebarTrigger className="shrink-0" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {map(visibleCategories, (category) => (
                <CategoryMenuItem
                  key={get(category, "slug")}
                  category={category}
                  isActive={location.pathname === get(category, "href")}
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
