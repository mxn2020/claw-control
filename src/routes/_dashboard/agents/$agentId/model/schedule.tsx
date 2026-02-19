import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Clock } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/model/schedule',
)({
  component: AgentModelSchedule,
})

const mockSchedule = [
  { timeRange: '00:00 – 08:00', model: 'gpt-4o-mini', reason: 'off-hours cost saving' },
  { timeRange: '08:00 – 18:00', model: 'gpt-4o', reason: 'business hours full capability' },
  { timeRange: '18:00 – 24:00', model: 'gpt-4o-mini', reason: 'evening cost saving' },
]

function AgentModelSchedule() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/model"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Model
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Model Schedule</h1>
        <p className="text-sm text-slate-400 mt-1">
          Time-of-day model switching for agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <CardTitle>Time Windows</CardTitle>
          </div>
          <CardDescription>
            Configure which model is used during different time windows. Timezone: UTC.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSchedule.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="default">{entry.timeRange}</Badge>
                  <span className="text-sm font-mono text-white">{entry.model}</span>
                </div>
                <span className="text-xs text-slate-400">{entry.reason}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Add Window
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
