import { createFileRoute } from "@tanstack/react-router"

import DocsPage from "#/modules/docs"

export const Route = createFileRoute("/docs")({ component: DocsPage })
