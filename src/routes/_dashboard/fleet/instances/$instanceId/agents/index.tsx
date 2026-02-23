import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/agents/',
)({
  component: InstanceAgents,
})

const statusVariant = (s: string) => {
  if (s === 'active') return 'success' as const
  if (s === 'idle') return 'warning' as const
  return 'danger' as const
}

function InstanceAgents() {
  const { instanceId } = Route.useParams()
  const agents = useQuery(api.agents.list, { instanceId: instanceId as Id<"instances"> })
  const agentList = agents ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-sm text-slate-400 mt-1">
            {agentList.length} agent{agentList.length !== 1 ? 's' : ''} on this instance
          </p>
        </div>
        <Link
          to="/agents/new"
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          New Agent
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {agentList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No agents deployed yet.</p>
            )}
            {agentList.map((agent: any) => (
              <Link
                key={agent._id}
                to="/agents/$agentId"
                params={{ agentId: agent._id }}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4 hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-white">{agent.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{agent.model ?? 'No model'}</p>
                </div>
                <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
