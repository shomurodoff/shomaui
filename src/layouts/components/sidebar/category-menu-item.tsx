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
  onSelect?: (category: ComponentCategory) => void;
};

const CategoryMenuItem = ({
  category,
  isActive,
  onSelect,
}: CategoryMenuItemProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link to={get(category, "href")} />}
        size="default"
        isActive={isActive}
        onClick={() => {
          onSelect?.(category);
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
