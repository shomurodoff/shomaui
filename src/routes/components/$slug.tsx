import { createFileRoute } from "@tanstack/react-router";

import { CatalogDetailPage } from "#/modules/catalog";

export const Route = createFileRoute("/components/$slug")({
  component: ComponentDetailRoute,
});

function ComponentDetailRoute() {
  const { slug } = Route.useParams();
  return <CatalogDetailPage kind="components" slug={slug} />;
}
