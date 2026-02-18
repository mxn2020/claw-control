import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Radio,
  Plug,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/channels/',
)({
  component: AgentChannels,
})

const mockBindings = [
  {
    id: 'bind_1',
    channelName: '#support',
    platform: 'Discord',
    account: 'Acme Bot',
    status: 'connected' as const,
  },
  {
    id: 'bind_2',
    channelName: '#help-desk',
    platform: 'Slack',
    account: 'Support Workspace',
    status: 'connected' as const,
  },
  {
    id: 'bind_3',
    channelName: 'Live Chat Widget',
    platform: 'Web Chat',
    account: 'acme.com',
    status: 'connected' as const,
  },
  {
    id: 'bind_4',
    channelName: 'support@acme.com',
    platform: 'Email',
    account: 'SMTP Gateway',
    status: 'disconnected' as const,
  },
  {
    id: 'bind_5',
    channelName: '+1-555-0100',
    platform: 'SMS',
    account: 'Twilio',
    status: 'pending' as const,
  },
]

const statusVariant = {
  connected: 'success' as const,
  disconnected: 'danger' as const,
  pending: 'warning' as const,
}

function AgentChannels() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Channels</h1>
          </div>
          <p className="text-sm text-slate-400">
            Channel bindings for agent {agentId}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          <Plug className="w-4 h-4" />
          Bind Channel
        </button>
      </div>

      {/* Bindings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Channel Bindings</CardTitle>
            <Badge variant="info">{mockBindings.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBindings.map((binding) => (
              <div
                key={binding.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {binding.channelName}
                    </span>
                    <Badge variant="default">{binding.platform}</Badge>
                  </div>
                  <div className="text-xs text-slate-400">
                    Account: {binding.account}
                  </div>
                </div>
                <Badge variant={statusVariant[binding.status]}>
                  {binding.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
