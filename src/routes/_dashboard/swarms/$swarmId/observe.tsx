import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/observe')({
  component: SwarmObserve,
})

const typeVariant = (action: string) => {
  if (action.includes('error') || action.includes('quarantine')) return 'danger' as const
  if (action.includes('tool') || action.includes('create')) return 'info' as const
  return 'default' as const
}

function SwarmObserve() {
  const { swarmId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  const logs = useQuery(api.auditLogs.list, { limit: 20 })
  const events = logs ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Observability</h1>
        <p className="text-sm text-slate-400 mt-1">Aggregated event feed and metrics for swarm {swarmId}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-slate-400">Active Agents</p>
            <p className="text-2xl font-bold mt-1 text-emerald-400">{stats?.activeAgents ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-slate-400">Active Sessions</p>
            <p className="text-2xl font-bold mt-1 text-cyan-400">{stats?.activeSessions ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-slate-400">Total Events</p>
            <p className="text-2xl font-bold mt-1 text-amber-400">{events.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Event Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No events yet.</p>
            )}
            {events.map((ev) => (
              <div key={ev._id} className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                <span className="font-mono text-xs text-slate-500 mt-0.5 shrink-0">
                  {new Date(ev.createdAt).toLocaleTimeString()}
                </span>
                <Badge variant={typeVariant(ev.action)}>{ev.action}</Badge>
                <div>
                  <span className="text-xs text-slate-400">{ev.resourceType}</span>
                  <p className="text-xs text-slate-300 mt-0.5 font-mono">{ev.details ?? '—'}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
