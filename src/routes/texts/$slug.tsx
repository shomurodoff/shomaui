import { createFileRoute } from "@tanstack/react-router";

import { CatalogDetailPage } from "#/modules/catalog";

export const Route = createFileRoute("/texts/$slug")({
  component: TextDetailRoute,
});

function TextDetailRoute() {
  const { slug } = Route.useParams();
  return <CatalogDetailPage kind="texts" slug={slug} />;
}
