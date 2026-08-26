import { createFileRoute } from "@tanstack/react-router"

import SupportPage from "#/modules/support"

export const Route = createFileRoute("/support")({ component: SupportPage })
