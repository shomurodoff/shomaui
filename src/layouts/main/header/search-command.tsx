import { useNavigate } from "@tanstack/react-router";
import { get, map } from "lodash";

import { Badge } from "#/components/ui/badge";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "#/components/ui/command";
import { commandGroups, type SitePath } from "../navigation";

type SearchCommandProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const navigate = useNavigate();

  const navigateTo = (href: SitePath) => {
    onOpenChange(false);
    void navigate({ to: href });
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search SHOMAUI"
      description="Find a SHOMAUI page."
      className="max-w-xl"
    >
      <Command>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No pages found.</CommandEmpty>
          {map(commandGroups, (group, groupIndex) => (
            <div key={get(group, "label")}>
              {groupIndex > 0 ? <CommandSeparator /> : null}
              <CommandGroup heading={get(group, "label")}>
                {map(get(group, "items", []), (item) => {
                  const Icon = get(item, "icon");

                  return (
                    <CommandItem
                      key={get(item, "href")}
                      value={`${get(item, "label")} ${get(item, "description")}`}
                      onSelect={() => navigateTo(get(item, "href"))}
                    >
                      <Icon aria-hidden="true" />
                      <span>{get(item, "label")}</span>
                      {get(item, "badge") ? (
                        <Badge
                          className="ml-auto"
                          variant={get(item, "badgeVariant") ?? "default"}
                        >
                          {get(item, "badge")}
                        </Badge>
                      ) : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchCommand;
