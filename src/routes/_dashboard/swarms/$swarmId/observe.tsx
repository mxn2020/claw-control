import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/observe')({
  component: SwarmObserve,
})

const mockEvents = [
  { id: 'e1', time: '12:04:01', type: 'tool_call', agent: 'support-agent', detail: 'web-search("refund policy")' },
  { id: 'e2', time: '12:04:05', type: 'message', agent: 'eng-agent', detail: 'Responded to #engineering-api' },
  { id: 'e3', time: '12:04:09', type: 'error', agent: 'code-bot', detail: 'Execution timeout after 30s' },
  { id: 'e4', time: '12:04:12', type: 'tool_call', agent: 'support-agent', detail: 'email-sender(to=customer@example.com)' },
]

const typeVariant = (t: string) => {
  if (t === 'error') return 'danger' as const
  if (t === 'tool_call') return 'info' as const
  return 'default' as const
}

function SwarmObserve() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Observability</h1>
        <p className="text-sm text-slate-400 mt-1">Aggregated event feed and metrics for swarm {swarmId}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Agents', value: '12', color: 'text-emerald-400' },
          { label: 'Events / min', value: '348', color: 'text-cyan-400' },
          { label: 'Errors / min', value: '2', color: 'text-red-400' },
        ].map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{metric.label}</p>
              <p className={`text-2xl font-bold mt-1 ${metric.color}`}>{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Event Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <span className="font-mono text-xs text-slate-500 mt-0.5 shrink-0">{ev.time}</span>
                <Badge variant={typeVariant(ev.type)}>{ev.type}</Badge>
                <div>
                  <span className="text-xs text-slate-400">{ev.agent}</span>
                  <p className="text-xs text-slate-300 mt-0.5 font-mono">{ev.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
