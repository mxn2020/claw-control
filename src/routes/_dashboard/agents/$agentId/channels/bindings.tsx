import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Link2 } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/channels/bindings',
)({
  component: AgentChannelBindings,
})

const mockBindings = [
  { id: 'b1', channel: 'Slack', account: '#support-general', direction: 'inbound', status: 'active' },
  { id: 'b2', channel: 'Email', account: 'support@acme.com', direction: 'inbound/outbound', status: 'active' },
  { id: 'b3', channel: 'API', account: 'REST endpoint /v1/chat', direction: 'inbound', status: 'active' },
  { id: 'b4', channel: 'WhatsApp', account: '+1-800-ACME', direction: 'inbound/outbound', status: 'inactive' },
]

function AgentChannelBindings() {
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
        <h1 className="text-2xl font-bold text-white">Channel Bindings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Channel and account mappings for agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-cyan-400" />
            <CardTitle>Bindings</CardTitle>
          </div>
          <CardDescription>
            Channels through which this agent can receive and send messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBindings.map((binding) => (
              <div
                key={binding.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{binding.channel}</span>
                      <Badge variant="default">{binding.direction}</Badge>
                    </div>
                    <span className="text-xs text-slate-400">{binding.account}</span>
                  </div>
                </div>
                <Badge variant={binding.status === 'active' ? 'success' : 'warning'}>
                  {binding.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Add Binding
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
