import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/logs')({ component: AgentObserveLogs })

function AgentObserveLogs() {
  const logs = useQuery(api.auditLogs.list, { limit: 30 })
  const entries = logs ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Agent Logs</h1><p className="text-sm text-slate-400 mt-1">Structured log viewer</p></div>
      <Card><CardHeader><CardTitle>Log Stream ({entries.length})</CardTitle></CardHeader><CardContent>
        <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-3 font-mono text-xs space-y-1 max-h-[500px] overflow-y-auto">
          {entries.length === 0 && <span className="text-slate-500">No log entries.</span>}
          {entries.map(log => (
            <div key={log._id} className="flex gap-2">
              <span className="text-slate-500 shrink-0">{new Date(log.createdAt).toLocaleTimeString()}</span>
              <span className="shrink-0 w-20 text-cyan-400">{log.action}</span>
              <span className="text-slate-300">{log.details ?? log.resourceType}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
