import { createFileRoute } from "@tanstack/react-router";

import { CatalogIndexPage } from "#/modules/catalog";

export const Route = createFileRoute("/backgrounds/")({
  component: () => <CatalogIndexPage kind="backgrounds" />,
});
