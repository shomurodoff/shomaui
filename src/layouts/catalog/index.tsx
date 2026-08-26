import type { CSSProperties } from "react";

import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import CatalogSidebar from "./sidebar";
import CatalogToolbar from "./toolbar";
import type { CatalogLayoutProps } from "./types";

const CatalogLayout = ({ kind, children, search, view }: CatalogLayoutProps) => (
  <SidebarProvider
    defaultOpen
    className="min-h-[calc(100svh-4rem)] items-stretch"
    style={{ "--sidebar-width": "16rem" } as CSSProperties}
  >
    <CatalogSidebar kind={kind} />
    <SidebarInset className="min-h-[calc(100svh-4rem)] min-w-0">
      <CatalogToolbar search={search} view={view} />
      {children}
    </SidebarInset>
  </SidebarProvider>
);

export default CatalogLayout;
