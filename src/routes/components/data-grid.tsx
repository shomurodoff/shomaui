import { createFileRoute } from "@tanstack/react-router"

import DataGridPage from "#/modules/components/pages/data-grid"

export const Route = createFileRoute("/components/data-grid")({
  component: DataGridPage,
})
