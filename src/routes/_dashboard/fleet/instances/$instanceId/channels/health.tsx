import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/channels/health',
)({
  component: InstanceChannelHealth,
})

const mockHealth = [
  { id: 'discord', name: 'Discord', status: 'healthy', latency: '32ms', errors: 0 },
  { id: 'slack', name: 'Slack', status: 'healthy', latency: '45ms', errors: 2 },
  { id: 'github', name: 'GitHub', status: 'degraded', latency: '—', errors: 14 },
  { id: 'webchat', name: 'WebChat', status: 'healthy', latency: '18ms', errors: 0 },
]

const statusVariant = (s: string) => {
  if (s === 'healthy') return 'success' as const
  if (s === 'degraded') return 'warning' as const
  return 'danger' as const
}

function InstanceChannelHealth() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Health</h1>
        <p className="text-sm text-slate-400 mt-1">Latency and error status for instance {instanceId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockHealth.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{ch.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Latency: {ch.latency} · Errors: {ch.errors}
                  </p>
                </div>
                <Badge variant={statusVariant(ch.status)}>{ch.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
