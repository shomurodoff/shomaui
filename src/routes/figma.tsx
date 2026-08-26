import { createFileRoute } from "@tanstack/react-router"

import FigmaPage from "#/modules/figma"

export const Route = createFileRoute("/figma")({ component: FigmaPage })
