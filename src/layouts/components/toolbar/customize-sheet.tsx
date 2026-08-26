import { useState } from "react";
import { ListFilter } from "lucide-react";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";

const CustomizeSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button size="sm" className="shrink-0">
            <ListFilter data-icon="inline-start" />
            Customize
          </Button>
        }
      />
      <SheetContent side="right" className="w-[min(100%,24rem)] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Preview component library preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4 pb-6">
          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-sm">Preview settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <Badge variant="outline">Light</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Radius</span>
                <Badge variant="outline">Default</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Icon set</span>
                <Badge variant="outline">Lucide</Badge>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomizeSheet;
