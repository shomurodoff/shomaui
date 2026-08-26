import { Search } from "lucide-react";

import { Input } from "#/components/ui/input";
import { SidebarTrigger, useSidebar } from "#/components/ui/sidebar";

import type { ComponentSearchState, ComponentViewState } from "../types";
import CustomizeSheet from "./customize-sheet";
import ComponentViewToggle from "./view-toggle";

type ComponentsToolbarProps = {
  componentSearch?: ComponentSearchState;
  componentView?: ComponentViewState;
};

const ComponentsToolbar = ({
  componentSearch,
  componentView,
}: ComponentsToolbarProps) => {
  const { open } = useSidebar();

  return (
    <div className="sticky top-16 z-30  border-b bg-background">
      <div className="mx-auto flex min-h-16 w-full max-w-[1524px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden shrink-0 md:flex md:w-8">
            <SidebarTrigger
              aria-label="Open sidebar"
              className={open ? "invisible pointer-events-none" : undefined}
            />
          </div>
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              value={componentSearch?.value}
              onChange={(event) =>
                componentSearch?.onChange(event.target.value)
              }
              placeholder="Search components..."
              aria-label="Search components"
              className="h-9 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {componentView ? <ComponentViewToggle {...componentView} /> : null}
          <CustomizeSheet />
        </div>
      </div>
    </div>
  );
};

export default ComponentsToolbar;
