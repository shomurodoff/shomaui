import { Link } from "@tanstack/react-router";
import { get, map } from "lodash";

import { Badge } from "#/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "#/components/ui/item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "#/components/ui/navigation-menu";
import {
  primaryItems,
  productItems,
  resourceItems,
  type SiteNavigationItem,
} from "../navigation";

const MenuItemLink = ({ item }: { item: SiteNavigationItem }) => {
  const Icon = get(item, "icon");

  return (
    <NavigationMenuLink
      render={<Link to={get(item, "href")} />}
      className="p-0"
    >
      <Item size="sm" className="w-full border-0 px-3 py-2.5 hover:bg-muted">
        <ItemMedia
          variant="icon"
          className="size-10 rounded-lg border bg-background"
        >
          <Icon aria-hidden="true" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-base">
            {get(item, "label")}
            {get(item, "badge") ? (
              <Badge variant={get(item, "badgeVariant") ?? "default"}>
                {get(item, "badge")}
              </Badge>
            ) : null}
          </ItemTitle>
          <ItemDescription>{get(item, "description")}</ItemDescription>
        </ItemContent>
      </Item>
    </NavigationMenuLink>
  );
};

const DesktopNavigation = () => {
  return (
    <NavigationMenu className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
      <NavigationMenuList className="gap-x-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 p-3">
              {map(productItems, (item) => (
                <MenuItemLink item={item} key={get(item, "href")} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 p-3">
              {map(resourceItems, (item) => (
                <MenuItemLink item={item} key={get(item, "href")} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {map(primaryItems, (item) => (
          <NavigationMenuItem key={get(item, "href")}>
            <NavigationMenuLink render={<Link to={get(item, "href")} />}>
              {get(item, "label")}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
