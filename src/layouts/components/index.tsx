import type { CSSProperties } from "react";

import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";

import ComponentsSidebar from "./sidebar";
import ComponentsToolbar from "./toolbar";
import type { ComponentsLayoutProps } from "./types";

const ComponentsLayout = ({
  children,
  componentSearch,
  componentView,
}: ComponentsLayoutProps) => {
  return (
    <SidebarProvider
      defaultOpen
      className="min-h-[calc(100svh-4rem)] items-stretch"
      style={{ "--sidebar-width": "16rem" } as CSSProperties}
    >
      <ComponentsSidebar />
      <SidebarInset className="min-h-[calc(100svh-4rem)] min-w-0">
        <ComponentsToolbar
          componentSearch={componentSearch}
          componentView={componentView}
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ComponentsLayout;
