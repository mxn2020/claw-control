import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Radio,
  MessageSquare,
  GitBranch,
  Globe,
  CheckCircle,
  XCircle,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/channels',
)({
  component: InstanceChannels,
})

const mockChannels = [
  { id: 'discord', name: 'Discord', icon: MessageSquare, status: 'connected', messages: 12_840, latency: '32ms' },
  { id: 'slack', name: 'Slack', icon: MessageSquare, status: 'connected', messages: 8_320, latency: '45ms' },
  { id: 'github', name: 'GitHub', icon: GitBranch, status: 'disconnected', messages: 3_190, latency: '—' },
  { id: 'webchat', name: 'WebChat', icon: Globe, status: 'connected', messages: 21_500, latency: '18ms' },
]

const mockRoutingRules = [
  { id: 'r1', pattern: '#support-*', target: 'support-agent', priority: 1 },
  { id: 'r2', pattern: '#engineering-*', target: 'eng-agent', priority: 2 },
  { id: 'r3', pattern: 'DM/*', target: 'general-agent', priority: 3 },
  { id: 'r4', pattern: '/api/webhook/*', target: 'webhook-handler', priority: 4 },
]

function InstanceChannels() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Radio className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Channels</h1>
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connectors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <channel.icon className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{channel.name}</span>
                      <Badge variant={channel.status === 'connected' ? 'success' : 'danger'}>
                        {channel.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">
                      {channel.messages.toLocaleString()} messages · Latency {channel.latency}
                    </p>
                  </div>
                </div>
                {channel.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Routing Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockRoutingRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-cyan-400">{rule.pattern}</span>
                  <p className="text-xs text-slate-400 mt-0.5">→ {rule.target}</p>
                </div>
                <Badge variant="info">Priority {rule.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
