import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/policies')({ component: AgentToolsPolicies })
function AgentToolsPolicies() {
  const skills = useQuery(api.platform.list, {})
  const list = skills ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Tool Policies</h1><p className="text-sm text-slate-400 mt-1">Execution policies for {list.length} tools</p></div>
      <Card><CardHeader><CardTitle>Policy Matrix</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No tool policies defined.</p>}
          {list.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-mono text-white">{s.name}</span><p className="text-xs text-slate-400">Risk: {s.riskLevel ?? 'unknown'}</p></div>
              <div className="flex gap-2"><Badge variant={s.isEnabled ? 'success' : 'danger'}>{s.isEnabled ? 'allowed' : 'blocked'}</Badge></div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
