import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { MessageSquare, GitBranch, Globe, CheckCircle, XCircle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/channels/connectors',
)({
  component: InstanceChannelConnectors,
})

const mockConnectors = [
  { id: 'discord', platform: 'Discord', icon: MessageSquare, status: 'connected', messages: 12_840 },
  { id: 'slack', platform: 'Slack', icon: MessageSquare, status: 'connected', messages: 8_320 },
  { id: 'github', platform: 'GitHub', icon: GitBranch, status: 'disconnected', messages: 3_190 },
  { id: 'webchat', platform: 'WebChat', icon: Globe, status: 'connected', messages: 21_500 },
]

function InstanceChannelConnectors() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Connectors</h1>
        <p className="text-sm text-slate-400 mt-1">Platform connectors for instance {instanceId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connectors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockConnectors.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <c.icon className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{c.platform}</span>
                      <Badge variant={c.status === 'connected' ? 'success' : 'danger'}>{c.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400">{c.messages.toLocaleString()} messages</p>
                  </div>
                </div>
                {c.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
