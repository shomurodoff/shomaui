import { MoreHorizontal } from "lucide-react";
import { get, map } from "lodash";

import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";

export type ActionMenuItem = {
  label: string;
  shortcut?: string;
  destructive?: boolean;
  separator?: boolean;
};

const defaultItems: ActionMenuItem[] = [
  { label: "Duplicate", shortcut: "⌘D" },
  { label: "Archive", shortcut: "⌘E" },
  { label: "Delete", shortcut: "⌫", destructive: true },
];

type ActionMenuProps = {
  label?: string;
  items?: ActionMenuItem[];
};

export function ActionMenu({
  label = "Actions",
  items = defaultItems,
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" />}
        aria-label={label}
      >
        <MoreHorizontal data-icon="inline-start" />
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {map(items, (item) => (
            <span key={get(item, "label")}>
              {get(item, "separator") ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem variant={get(item, "destructive") ? "destructive" : "default"}>
                {get(item, "label")}
                {get(item, "shortcut") ? (
                  <DropdownMenuShortcut>{get(item, "shortcut")}</DropdownMenuShortcut>
                ) : null}
              </DropdownMenuItem>
            </span>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;
