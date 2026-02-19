import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/channels/routing',
)({
  component: InstanceChannelRouting,
})

const mockRules = [
  { id: 'r1', pattern: '#support-*', target: 'support-agent', priority: 1, schedule: 'always' },
  { id: 'r2', pattern: '#engineering-*', target: 'eng-agent', priority: 2, schedule: 'business-hours' },
  { id: 'r3', pattern: 'DM/*', target: 'general-agent', priority: 3, schedule: 'always' },
  { id: 'r4', pattern: '/api/webhook/*', target: 'webhook-handler', priority: 4, schedule: 'always' },
]

function InstanceChannelRouting() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Routing</h1>
        <p className="text-sm text-slate-400 mt-1">Routing rules and schedules for instance {instanceId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Routing Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-cyan-400">{rule.pattern}</span>
                  <p className="text-xs text-slate-400 mt-0.5">→ {rule.target}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info">Priority {rule.priority}</Badge>
                  <Badge variant="default">{rule.schedule}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Route Tester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter a channel pattern to test routing…"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Test Route
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
