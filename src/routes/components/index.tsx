import { createFileRoute } from "@tanstack/react-router";

import ComponentsPage from "#/modules/components";

export const Route = createFileRoute("/components/")({
  component: ComponentsPage,
});
