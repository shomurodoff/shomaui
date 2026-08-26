import { createFileRoute } from "@tanstack/react-router"

import BadgePage from "#/modules/components/pages/badge"

export const Route = createFileRoute("/components/badge")({
  component: BadgePage,
})
