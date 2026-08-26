import { createFileRoute } from "@tanstack/react-router"

import CarouselPage from "#/modules/components/pages/carousel"

export const Route = createFileRoute("/components/carousel")({
  component: CarouselPage,
})
