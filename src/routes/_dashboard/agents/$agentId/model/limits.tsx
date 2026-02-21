import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/limits')({ component: AgentModelLimits })
function AgentModelLimits() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Model Limits</h1><p className="text-sm text-slate-400 mt-1">Token and rate limits for this agent</p></div>
      <Card><CardHeader><CardTitle>Limits Configuration</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Token limits, rate limiting, and cost caps are managed per-agent on the VPS instance. Connect a running instance to configure model limits.</p></CardContent></Card>
    </div>
  )
}
