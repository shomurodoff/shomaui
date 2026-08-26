import { createFileRoute } from "@tanstack/react-router"

import CommandPage from "#/modules/components/pages/command"

export const Route = createFileRoute("/components/command")({
  component: CommandPage,
})
