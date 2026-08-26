import { Search } from "lucide-react";

import { Input } from "#/components/ui/input";
import { SidebarTrigger, useSidebar } from "#/components/ui/sidebar";
import type { CatalogSearchState, CatalogViewState } from "./types";

import ComponentViewToggle from "#/layouts/components/toolbar/view-toggle";

const CatalogToolbar = ({
  search,
  view,
}: {
  search?: CatalogSearchState;
  view?: CatalogViewState;
}) => {
  const { open } = useSidebar();

  return (
    <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-[1524px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden shrink-0 md:flex md:w-8">
            <SidebarTrigger
              aria-label="Open sidebar"
              className={open ? "pointer-events-none invisible" : undefined}
            />
          </div>
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              value={search?.value}
              onChange={(event) => search?.onChange(event.target.value)}
              placeholder="Search catalog..."
              aria-label="Search catalog"
              className="h-9 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
        {view ? <ComponentViewToggle {...view} /> : null}
      </div>
    </div>
  );
};

export default CatalogToolbar;
