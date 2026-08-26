import { createFileRoute } from "@tanstack/react-router"

import ChartPage from "#/modules/components/pages/chart"

export const Route = createFileRoute("/components/chart")({
  component: ChartPage,
})
