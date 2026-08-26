import { createFileRoute } from "@tanstack/react-router";

import { CatalogDetailPage } from "#/modules/catalog";

export const Route = createFileRoute("/effects/$slug")({
  component: EffectDetailRoute,
});

function EffectDetailRoute() {
  const { slug } = Route.useParams();
  return <CatalogDetailPage kind="effects" slug={slug} />;
}
