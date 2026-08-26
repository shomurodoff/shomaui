import { createFileRoute } from "@tanstack/react-router"

import CheckboxPage from "#/modules/components/pages/checkbox"

export const Route = createFileRoute("/components/checkbox")({
  component: CheckboxPage,
})
