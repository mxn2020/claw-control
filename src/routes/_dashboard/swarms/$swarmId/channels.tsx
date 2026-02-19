import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/channels')({
  component: SwarmChannels,
})

const mockRouting = [
  { id: 'r1', pattern: '#support-*', target: 'support-agent', status: 'active' },
  { id: 'r2', pattern: '#engineering-*', target: 'eng-agent', status: 'active' },
  { id: 'r3', pattern: 'DM/*', target: 'general-agent', status: 'inactive' },
]

function SwarmChannels() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Channels</h1>
        <p className="text-sm text-slate-400 mt-1">Channel routing configuration for swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Routing Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRouting.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-cyan-400">{rule.pattern}</span>
                  <p className="text-xs text-slate-400 mt-0.5">→ {rule.target}</p>
                </div>
                <Badge variant={rule.status === 'active' ? 'success' : 'default'}>{rule.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
