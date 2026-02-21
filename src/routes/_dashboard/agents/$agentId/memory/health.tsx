import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/health')({ component: AgentMemoryHealth })
function AgentMemoryHealth() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Memory Health</h1><p className="text-sm text-slate-400 mt-1">Monitor memory store health and performance</p></div>
      <Card><CardHeader><CardTitle>Health Status</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Memory health monitoring requires VPS agent connectivity. Connect a running instance to view memory usage, fragmentation, and performance metrics.</p></CardContent></Card>
    </div>
  )
}
