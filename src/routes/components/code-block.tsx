import { createFileRoute } from "@tanstack/react-router"

import CodeBlockPage from "#/modules/components/pages/code-block"

export const Route = createFileRoute("/components/code-block")({
  component: CodeBlockPage,
})
