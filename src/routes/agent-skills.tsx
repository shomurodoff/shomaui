import { createFileRoute } from "@tanstack/react-router"

import AgentSkillsPage from "#/modules/agent-skills"

export const Route = createFileRoute("/agent-skills")({ component: AgentSkillsPage })
