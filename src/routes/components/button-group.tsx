import { createFileRoute } from "@tanstack/react-router"

import ButtonGroupPage from "#/modules/components/pages/button-group"

export const Route = createFileRoute("/components/button-group")({
  component: ButtonGroupPage,
})
