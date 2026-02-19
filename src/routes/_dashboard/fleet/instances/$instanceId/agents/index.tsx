import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/agents/',
)({
  component: InstanceAgents,
})

const mockAgents = [
  { id: 'agent_1', name: 'Support Agent', model: 'gpt-4o', status: 'active' },
  { id: 'agent_2', name: 'Research Agent', model: 'claude-3.5-sonnet', status: 'active' },
  { id: 'agent_3', name: 'Code Review Bot', model: 'gpt-4o', status: 'idle' },
  { id: 'agent_4', name: 'Data Analyst', model: 'gpt-4o-mini', status: 'offline' },
]

const statusVariant = (s: string) => {
  if (s === 'active') return 'success' as const
  if (s === 'idle') return 'warning' as const
  return 'danger' as const
}

function InstanceAgents() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-sm text-slate-400 mt-1">All agents on instance {instanceId}</p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          New Agent
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{agent.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{agent.model}</p>
                </div>
                <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
