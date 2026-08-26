import { createFileRoute } from "@tanstack/react-router"

import ComboboxPage from "#/modules/components/pages/combobox"

export const Route = createFileRoute("/components/combobox")({
  component: ComboboxPage,
})
