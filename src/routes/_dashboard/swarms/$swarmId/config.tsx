import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/config')({
  component: SwarmConfig,
})

const mockConfigs = [
  { key: 'max_agents', value: '50', scope: 'swarm', status: 'synced' },
  { key: 'default_model', value: 'gpt-4o', scope: 'swarm', status: 'synced' },
  { key: 'log_level', value: 'info', scope: 'swarm', status: 'pending' },
  { key: 'timeout_seconds', value: '30', scope: 'swarm', status: 'synced' },
]

function SwarmConfig() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Config</h1>
        <p className="text-sm text-slate-400 mt-1">Push configuration across all instances in swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockConfigs.map((cfg) => (
              <div
                key={cfg.key}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-cyan-400">{cfg.key}</span>
                  <p className="text-xs text-slate-400 mt-0.5">= {cfg.value} · scope: {cfg.scope}</p>
                </div>
                <Badge variant={cfg.status === 'synced' ? 'success' : 'warning'}>{cfg.status}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Push Config
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
