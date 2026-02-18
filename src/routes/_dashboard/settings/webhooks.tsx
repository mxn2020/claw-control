import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Webhook, Plus } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/webhooks')({
  component: WebhooksPage,
})

const mockWebhooks = [
  {
    id: 1,
    url: 'https://hooks.acme.co/claw/events',
    events: ['agent.deploy', 'agent.error', 'session.end'],
    secret: 'whsec_…k8Xm',
    status: 'active',
  },
  {
    id: 2,
    url: 'https://pagerduty.acme.co/ingest',
    events: ['security.alert', 'agent.error'],
    secret: 'whsec_…p3Qz',
    status: 'active',
  },
  {
    id: 3,
    url: 'https://old.acme.co/webhook',
    events: ['session.start'],
    secret: 'whsec_…d1Rn',
    status: 'inactive',
  },
]

function WebhooksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Webhooks</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure webhook endpoints for event notifications
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Webhook
        </Button>
      </div>

      {/* Webhooks */}
      <div className="space-y-4">
        {mockWebhooks.map((wh) => (
          <Card key={wh.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Webhook className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-sm font-mono">{wh.url}</CardTitle>
                </div>
                <Badge
                  variant={wh.status === 'active' ? 'success' : 'default'}
                >
                  {wh.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-400">Events</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {wh.events.map((event) => (
                      <Badge key={event} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <div>
                    <span className="text-xs text-slate-400">Secret</span>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">
                      {wh.secret}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
