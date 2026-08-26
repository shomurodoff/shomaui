import { createFileRoute } from "@tanstack/react-router";

import { CatalogDetailPage } from "#/modules/catalog";

export const Route = createFileRoute("/animations/$slug")({
  component: AnimationDetailRoute,
});

function AnimationDetailRoute() {
  const { slug } = Route.useParams();
  return <CatalogDetailPage kind="animations" slug={slug} />;
}
