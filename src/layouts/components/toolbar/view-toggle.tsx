import { LayoutGrid, List } from "lucide-react";
import { get } from "lodash";

import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";

import type { ComponentViewMode, ComponentViewState } from "../types";

const isComponentViewMode = (value: unknown): value is ComponentViewMode =>
  value === "grid" || value === "list";

const ComponentViewToggle = ({ value, onChange }: ComponentViewState) => {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(nextValue) => {
        const nextView = get(nextValue, 0);

        if (isComponentViewMode(nextView)) onChange(nextView);
      }}
      variant="outline"
      size="default"
      spacing={0}
      aria-label="Component view"
    >
      <ToggleGroupItem value="list" aria-label="List view" title="List view">
        <List />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view" title="Grid view">
        <LayoutGrid />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ComponentViewToggle;
