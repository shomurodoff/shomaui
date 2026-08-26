import { useState } from "react";
import { get, map } from "lodash";

import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";

type SegmentedControlProps = {
  items?: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const defaultItems = ["Overview", "Activity", "Settings"];

export function SegmentedControl({
  items = defaultItems,
  defaultValue,
  onValueChange,
}: SegmentedControlProps) {
  const [value, setValue] = useState(defaultValue ?? get(items, 0, ""));

  const handleValueChange = (nextValue: string | null) => {
    if (!nextValue) return;
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList className="rounded-full border bg-muted/70 p-1">
        {map(items, (item) => (
          <TabsTrigger key={item} value={item} className="rounded-full px-4">
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default SegmentedControl;
