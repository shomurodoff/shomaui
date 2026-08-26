import { createFileRoute } from "@tanstack/react-router"

import PricingPage from "#/modules/pricing"

export const Route = createFileRoute("/pricing")({ component: PricingPage })
