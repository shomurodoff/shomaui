import { createFileRoute } from "@tanstack/react-router"

import CollapsiblePage from "#/modules/components/pages/collapsible"

export const Route = createFileRoute("/components/collapsible")({
  component: CollapsiblePage,
})
