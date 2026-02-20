import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/traces')({ component: AgentObserveTraces })

function AgentObserveTraces() {
  const logs = useQuery(api.auditLogs.list, { limit: 20 })
  const entries = logs ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Agent Traces</h1><p className="text-sm text-slate-400 mt-1">Trace waterfall for agent operations</p></div>
      <Card><CardHeader><CardTitle>Recent Traces ({entries.length})</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {entries.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No traces.</p>}
          {entries.map(e => (
            <div key={e._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
              <div><span className="text-sm font-mono text-cyan-400">{e._id.slice(-8)}</span><Badge variant="outline" className="ml-2">{e.action}</Badge><p className="text-xs text-slate-400 mt-0.5">{e.resourceType} · {e.details ?? '—'}</p></div>
              <span className="text-xs text-slate-500">{new Date(e.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
