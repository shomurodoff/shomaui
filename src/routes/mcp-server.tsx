import { createFileRoute } from "@tanstack/react-router"

import McpServerPage from "#/modules/mcp-server"

export const Route = createFileRoute("/mcp-server")({ component: McpServerPage })
