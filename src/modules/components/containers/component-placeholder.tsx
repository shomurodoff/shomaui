import { Link } from "@tanstack/react-router";
import { ArrowLeft, Component } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty.tsx";
import ComponentsLayout from "#/layouts/components";

type ComponentPlaceholderProps = {
  title: string;
};

function ComponentPlaceholder({ title }: ComponentPlaceholderProps) {
  return (
    <ComponentsLayout>
      <section className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <Empty className="max-w-lg">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Component aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>
              {title} examples and documentation will be available here soon.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              render={<Link to="/components" />}
              nativeButton={false}
              variant="outline"
            >
              <ArrowLeft data-icon="inline-start" />
              Back to all components
            </Button>
          </EmptyContent>
        </Empty>
      </section>
    </ComponentsLayout>
  );
}

export default ComponentPlaceholder;
