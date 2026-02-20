import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Search, Terminal } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/')({
  component: AgentObserveIndex,
})

function AgentObserveIndex() {
  const { agentId } = Route.useParams()
  const logs = useQuery(api.auditLogs.list, { limit: 20 })
  const entries = logs ?? []

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Observability</h1>
        <p className="mt-1 text-sm text-slate-400">Agent {agentId} — traces, logs, and cost analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <CardTitle>Recent Traces</CardTitle>
              </div>
              <Badge variant="info">{entries.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {entries.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-6">No traces yet.</p>
              )}
              {entries.map((entry) => (
                <div key={entry._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white">{entry._id.slice(-8)}</span>
                      <Badge variant="outline">{entry.action}</Badge>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{entry.resourceType} · {entry.details ?? '—'}</div>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(entry.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <CardTitle>Log Stream</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-3 font-mono text-xs space-y-1 max-h-[400px] overflow-y-auto">
              {entries.length === 0 && (
                <span className="text-slate-500">No log entries.</span>
              )}
              {entries.map((log) => (
                <div key={log._id} className="flex gap-2">
                  <span className="text-slate-500 shrink-0">{new Date(log.createdAt).toLocaleTimeString()}</span>
                  <span className="shrink-0 w-16 text-cyan-400">{log.action}</span>
                  <span className="text-slate-300">{log.details ?? log.resourceType}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
