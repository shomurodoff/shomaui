import { createFileRoute } from "@tanstack/react-router";

import { CatalogDetailPage } from "#/modules/catalog";

export const Route = createFileRoute("/backgrounds/$slug")({
  component: BackgroundDetailRoute,
});

function BackgroundDetailRoute() {
  const { slug } = Route.useParams();
  return <CatalogDetailPage kind="backgrounds" slug={slug} />;
}
