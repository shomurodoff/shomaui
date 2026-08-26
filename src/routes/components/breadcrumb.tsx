import { createFileRoute } from "@tanstack/react-router"

import BreadcrumbPage from "#/modules/components/pages/breadcrumb"

export const Route = createFileRoute("/components/breadcrumb")({
  component: BreadcrumbPage,
})
