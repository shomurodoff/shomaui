import { createFileRoute } from "@tanstack/react-router"

import CalendarPage from "#/modules/components/pages/calendar"

export const Route = createFileRoute("/components/calendar")({
  component: CalendarPage,
})
