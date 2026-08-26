import { createFileRoute } from "@tanstack/react-router"

import RoadmapPage from "#/modules/roadmap"

export const Route = createFileRoute("/roadmap")({ component: RoadmapPage })
