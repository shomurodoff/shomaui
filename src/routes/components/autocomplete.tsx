import { createFileRoute } from "@tanstack/react-router"

import AutocompletePage from "#/modules/components/pages/autocomplete"

export const Route = createFileRoute("/components/autocomplete")({
  component: AutocompletePage,
})
