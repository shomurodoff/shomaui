import { createFileRoute } from "@tanstack/react-router"

import BlocksPage from "#/modules/blocks"

export const Route = createFileRoute("/blocks")({ component: BlocksPage })
