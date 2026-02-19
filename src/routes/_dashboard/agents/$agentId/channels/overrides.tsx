import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, GitBranch } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/channels/overrides',
)({
  component: AgentChannelOverrides,
})

const mockOverrides = [
  {
    id: 'o1',
    peer: 'user_42',
    channel: 'Slack',
    override: 'route to #vip-support',
    active: true,
  },
  {
    id: 'o2',
    peer: 'org_enterprise',
    channel: 'Email',
    override: 'CC: account-manager@acme.com',
    active: true,
  },
  {
    id: 'o3',
    peer: 'user_17',
    channel: 'API',
    override: 'max latency: 500ms',
    active: false,
  },
]

function AgentChannelOverrides() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/channels"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Channels
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Channel Overrides</h1>
        <p className="text-sm text-slate-400 mt-1">
          Peer-level routing overrides for agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <CardTitle>Routing Overrides</CardTitle>
          </div>
          <CardDescription>
            Per-peer routing rules that take precedence over default channel bindings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockOverrides.map((override) => (
              <div
                key={override.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{override.peer}</span>
                      <Badge variant="info">{override.channel}</Badge>
                    </div>
                    <span className="text-xs text-slate-400 mt-0.5 block">{override.override}</span>
                  </div>
                </div>
                <Badge variant={override.active ? 'success' : 'warning'}>
                  {override.active ? 'active' : 'inactive'}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Add Override
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
