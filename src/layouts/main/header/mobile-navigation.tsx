import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { get, map } from "lodash";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "#/components/ui/item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import {
  primaryItems,
  productItems,
  resourceItems,
  type SiteNavigationItem,
} from "../navigation";

const MobileItemLink = ({ item }: { item: SiteNavigationItem }) => {
  const Icon = get(item, "icon");

  return (
    <SheetClose render={<Link to={get(item, "href")} />}>
      <Item size="sm" className="border-0 px-2.5 py-2 hover:bg-muted">
        <ItemMedia variant="icon">
          <Icon aria-hidden="true" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {get(item, "label")}
            {get(item, "badge") ? (
              <Badge variant={get(item, "badgeVariant") ?? "default"}>
                {get(item, "badge")}
              </Badge>
            ) : null}
          </ItemTitle>
        </ItemContent>
      </Item>
    </SheetClose>
  );
};

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation" />
        }
      >
        <Menu data-icon="inline-start" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,24rem)] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>SHOMAUI</SheetTitle>
          <SheetDescription>Explore the SHOMAUI library.</SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto px-4 pb-6">
          <Accordion multiple defaultValue={["products", "resources"]}>
            <AccordionItem value="products">
              <AccordionTrigger>Products</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {map(productItems, (item) => (
                    <MobileItemLink item={item} key={get(item, "href")} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resources">
              <AccordionTrigger>Resources</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {map(resourceItems, (item) => (
                    <MobileItemLink item={item} key={get(item, "href")} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-1 pt-3">
            {map(primaryItems, (item) => (
              <MobileItemLink item={item} key={get(item, "href")} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
