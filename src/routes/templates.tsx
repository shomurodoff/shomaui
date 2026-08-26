import { createFileRoute } from "@tanstack/react-router"

import TemplatesPage from "#/modules/templates"

export const Route = createFileRoute("/templates")({ component: TemplatesPage })
