import { createFileRoute } from "@tanstack/react-router"

import AccordionPage from "#/modules/components/pages/accordion"

export const Route = createFileRoute("/components/accordion")({
  component: AccordionPage,
})
