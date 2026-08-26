import type { ReactNode } from "react";

import {
  AlertCircle,
  Check,
  ChevronRight,
  Info,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion.tsx";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert.tsx";
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#/components/ui/alert-dialog.tsx";
import { AspectRatio } from "#/components/ui/aspect-ratio.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "#/components/ui/avatar.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Button as ShomauiButton } from "#/components/shomaui/button.tsx";
import { Card, CardContent } from "#/components/ui/card.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Skeleton } from "#/components/ui/skeleton.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/components/ui/tooltip.tsx";

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-lg border bg-muted/20 p-5">
      <div className="w-full max-w-64">{children}</div>
    </div>
  );
}

function AccordionPreview() {
  return (
    <PreviewFrame>
      <Accordion defaultValue={["members"]}>
        <AccordionItem value="members">
          <AccordionTrigger className="py-2 text-xs">
            Team members
          </AccordionTrigger>
          <AccordionContent className="text-xs">
            Invite people to collaborate on this project.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="access">
          <AccordionTrigger className="py-2 text-xs">
            Access settings
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </PreviewFrame>
  );
}

function AlertPreview() {
  return (
    <PreviewFrame>
      <Alert className="bg-background">
        <Info />
        <AlertTitle className="text-xs">Heads up</AlertTitle>
        <AlertDescription className="text-[0.68rem]">
          Your settings have been saved successfully.
        </AlertDescription>
      </Alert>
    </PreviewFrame>
  );
}

function AlertDialogPreview() {
  return (
    <PreviewFrame>
      <AlertDialogRoot>
        <AlertDialogTrigger
          render={<Button variant="outline" size="sm" className="w-full" />}
        >
          <AlertCircle data-icon="inline-start" />
          Delete workspace
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </PreviewFrame>
  );
}

function AspectRatioPreview() {
  return (
    <PreviewFrame>
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="size-full rounded-lg" />
      </AspectRatio>
    </PreviewFrame>
  );
}

function AutocompletePreview() {
  return (
    <PreviewFrame>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute top-2 left-2.5 size-3.5 text-muted-foreground" />
          <Input className="h-8 pl-8 text-xs" value="Ale" readOnly />
        </div>
        <Card size="sm">
          <CardContent className="grid gap-1 p-1">
            <Button variant="ghost" size="sm" className="justify-start text-xs">
              Alex Chen
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-xs">
              Alex Johnson
            </Button>
          </CardContent>
        </Card>
      </div>
    </PreviewFrame>
  );
}

function AvatarPreview() {
  return (
    <PreviewFrame>
      <Card size="sm">
        <CardContent className="flex items-center gap-3 p-3">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>JW</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <span className="text-xs text-muted-foreground">
            Joined by 500+ developers
          </span>
        </CardContent>
      </Card>
    </PreviewFrame>
  );
}

function BadgePreview() {
  return (
    <PreviewFrame>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Badge</Badge>
        <Badge variant="outline">Badge</Badge>
        <Badge variant="destructive">
          <ShieldCheck data-icon="inline-start" />
          Admin
        </Badge>
        <Badge variant="outline">
          <Check data-icon="inline-start" />
          Active
        </Badge>
      </div>
    </PreviewFrame>
  );
}

function BreadcrumbPreview() {
  return (
    <PreviewFrame>
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap text-xs">
          <BreadcrumbItem>
            <span className="transition-colors hover:text-foreground">
              Projects
            </span>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </PreviewFrame>
  );
}

function ButtonPreview() {
  return (
    <PreviewFrame>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ShomauiButton size="sm">Continue</ShomauiButton>
        <ShomauiButton size="sm" variant="outline">
          <Check data-icon="inline-start" />
          Save
        </ShomauiButton>
        <ShomauiButton size="sm" variant="ghost" aria-label="Add item">
          <Plus data-icon="inline-start" />
          Add
        </ShomauiButton>
      </div>
    </PreviewFrame>
  );
}

const TooltipPreview = () => (
  <PreviewFrame>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" size="sm" className="w-full" />}
        >
          <Info data-icon="inline-start" />
          Hover for help
        </TooltipTrigger>
        <TooltipContent>Helpful context for this action</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </PreviewFrame>
);

export {
  AccordionPreview,
  AlertDialogPreview,
  AlertPreview,
  AspectRatioPreview,
  AutocompletePreview,
  AvatarPreview,
  BadgePreview,
  BreadcrumbPreview,
  ButtonPreview,
  TooltipPreview,
};
