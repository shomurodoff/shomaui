import { createFileRoute } from "@tanstack/react-router"

import AlertPage from "#/modules/components/pages/alert"

export const Route = createFileRoute("/components/alert")({
  component: AlertPage,
})
