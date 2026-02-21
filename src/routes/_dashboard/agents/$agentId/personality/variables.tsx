import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/personality/variables')({ component: AgentPersonalityVariables })
function AgentPersonalityVariables() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Variables</h1><p className="text-sm text-slate-400 mt-1">Template variables for personality files</p></div>
      <Card><CardHeader><CardTitle>Variables</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Personality template variables are managed on the VPS instance. Connect a running instance to view and edit variable substitutions used in SOUL.md, AGENTS.md, and USER.md.</p></CardContent></Card>
    </div>
  )
}
