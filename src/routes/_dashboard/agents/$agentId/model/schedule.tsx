import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/schedule')({ component: AgentModelSchedule })
function AgentModelSchedule() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Model Schedule</h1><p className="text-sm text-slate-400 mt-1">Time-based model switching and scheduling</p></div>
      <Card><CardHeader><CardTitle>Schedule Configuration</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Model scheduling allows time-based switching between models (e.g., use a cheaper model during off-peak hours). Connect a running VPS instance to configure schedules.</p></CardContent></Card>
    </div>
  )
}
