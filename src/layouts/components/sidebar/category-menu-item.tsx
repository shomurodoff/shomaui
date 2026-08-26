import { Link } from "@tanstack/react-router";
import { get } from "lodash";

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "#/components/ui/sidebar";
import type { ComponentCategory } from "#/modules/components/data";

type CategoryMenuItemProps = {
  category: ComponentCategory;
  isActive: boolean;
};

const CategoryMenuItem = ({ category, isActive }: CategoryMenuItemProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link to={get(category, "href")} />}
        size="default"
        isActive={isActive}
        onClick={() => {
          if (isMobile) setOpenMobile(false);
        }}
        className="h-9 px-3 text-[0.95rem]"
      >
        <span className="truncate">{get(category, "label")}</span>
      </SidebarMenuButton>
      <SidebarMenuBadge>{get(category, "count")}</SidebarMenuBadge>
    </SidebarMenuItem>
  );
};

export default CategoryMenuItem;
