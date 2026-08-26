import { createFileRoute } from "@tanstack/react-router"

import AlertDialogPage from "#/modules/components/pages/alert-dialog"

export const Route = createFileRoute("/components/alert-dialog")({
  component: AlertDialogPage,
})
