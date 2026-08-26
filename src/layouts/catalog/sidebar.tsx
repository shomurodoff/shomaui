import { useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { filter, get, includes, map, toLower, trim } from "lodash";

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
  catalogProducts,
  getCatalogItems,
  getCatalogProduct,
  type CatalogItem,
  type CatalogKind,
} from "#/modules/catalog/data";
import { CatalogItemAnchor } from "#/modules/catalog/link";

const CatalogMenuItem = ({
  item,
  isActive,
}: {
  item: CatalogItem;
  isActive: boolean;
}) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<CatalogItemAnchor item={item} />}
        isActive={isActive}
        onClick={() => {
          if (isMobile) setOpenMobile(false);
        }}
        className="h-9 px-3 text-[0.9rem]"
      >
        <span className="truncate">{item.name}</span>
      </SidebarMenuButton>
      <SidebarMenuBadge>{item.category}</SidebarMenuBadge>
    </SidebarMenuItem>
  );
};

const CatalogSidebar = ({ kind }: { kind: CatalogKind }) => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const product = getCatalogProduct(kind);
  const items = getCatalogItems(kind);
  const ProductIcon = get(product, "icon");
  const visibleItems = useMemo(() => {
    const normalizedQuery = toLower(trim(query));

    if (!normalizedQuery) return items;

    return filter(items, (item) => {
      const searchable = [item.name, item.category, ...item.tags].join(" ");
      return includes(toLower(searchable), normalizedQuery);
    });
  }, [items, query]);

  const isIndexActive =
    location.pathname === product.basePath ||
    location.pathname === `${product.basePath}/`;

  return (
    <Sidebar
      className="top-16 h-[calc(100svh-4rem)] bg-none"
      collapsible="offcanvas"
    >
      <SidebarHeader className="gap-3 border-b px-4 py-3 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <ProductIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
              {get(product, "label")}
            </span>
          </div>
          <SidebarTrigger className="shrink-0" />
        </div>
        <div className="relative group-data-[collapsible=icon]:hidden">
          <Filter className="pointer-events-none absolute top-2 left-1.5 size-4 text-muted-foreground" />
          <SidebarInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Filter ${product.label.toLowerCase()}...`}
            aria-label={`Filter ${product.label}`}
            className="border-0 bg-transparent pl-7 shadow-none focus-visible:ring-0"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wider">
            {product.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link to={product.basePath} />}
                  isActive={isIndexActive}
                  onClick={() => {
                    if (location.pathname !== product.basePath) setQuery("");
                  }}
                  className="h-9 px-3 text-[0.9rem]"
                >
                  <span className="truncate">All {product.label}</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>{items.length}</SidebarMenuBadge>
              </SidebarMenuItem>
              {map(visibleItems, (item) => (
                <CatalogMenuItem
                  key={item.slug}
                  item={item}
                  isActive={location.pathname === `/${kind}/${item.slug}`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto border-t px-3 py-4 group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {map(catalogProducts, (catalog) => (
                <SidebarMenuItem key={catalog.kind}>
                  <SidebarMenuButton
                    render={<Link to={catalog.basePath} />}
                    isActive={catalog.kind === kind}
                    className="h-8 px-3 text-xs"
                  >
                    {catalog.label}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{getCatalogItems(catalog.kind).length}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CatalogSidebar;
