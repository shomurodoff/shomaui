import { createFileRoute } from "@tanstack/react-router"

import CascaderPage from "#/modules/components/pages/cascader"

export const Route = createFileRoute("/components/cascader")({
  component: CascaderPage,
})
