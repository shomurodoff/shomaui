import { Link } from "@tanstack/react-router";
import type { ComponentType, SVGProps } from "react";
import { ArrowLeft } from "lucide-react";
import { get } from "lodash";

import { Button } from "#/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty";

type PagePlaceholderProps = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const PagePlaceholder = (props: PagePlaceholderProps) => {
  const title = get(props, "title");
  const description = get(props, "description");
  const Icon = get(props, "icon");

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl items-center justify-center">
        <Empty className="max-w-lg">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              render={<Link to="/" />}
              nativeButton={false}
              variant="outline"
            >
              <ArrowLeft data-icon="inline-start" />
              Back to home
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </main>
  );
};

export default PagePlaceholder;
