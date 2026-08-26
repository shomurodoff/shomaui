import { createFileRoute } from "@tanstack/react-router"

import AspectRatioPage from "#/modules/components/pages/aspect-ratio"

export const Route = createFileRoute("/components/aspect-ratio")({
  component: AspectRatioPage,
})
