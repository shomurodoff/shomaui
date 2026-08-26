import { createFileRoute } from "@tanstack/react-router"

import ContextMenuPage from "#/modules/components/pages/context-menu"

export const Route = createFileRoute("/components/context-menu")({
  component: ContextMenuPage,
})
