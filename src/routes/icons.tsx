import { createFileRoute } from "@tanstack/react-router"

import IconsPage from "#/modules/icons"

export const Route = createFileRoute("/icons")({ component: IconsPage })
