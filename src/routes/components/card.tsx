import { createFileRoute } from "@tanstack/react-router"

import CardPage from "#/modules/components/pages/card"

export const Route = createFileRoute("/components/card")({
  component: CardPage,
})
