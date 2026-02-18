import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, GitBranch } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/observe/traces',
)({
  component: AgentObserveTraces,
})

const mockTraces = [
  { id: 'tr_001', operation: 'chat.completion', duration: '1.24s', tokens: 842, status: 'success', time: '2 min ago' },
  { id: 'tr_002', operation: 'tool.exec', duration: '0.38s', tokens: 0, status: 'success', time: '5 min ago' },
  { id: 'tr_003', operation: 'chat.completion', duration: '2.10s', tokens: 1203, status: 'error', time: '12 min ago' },
  { id: 'tr_004', operation: 'memory.lookup', duration: '0.09s', tokens: 0, status: 'success', time: '15 min ago' },
  { id: 'tr_005', operation: 'chat.completion', duration: '0.97s', tokens: 615, status: 'success', time: '22 min ago' },
]

function AgentObserveTraces() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/observe"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Observe
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Traces</h1>
        <p className="text-sm text-slate-400 mt-1">
          Agent-specific traces for {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <CardTitle>Recent Traces</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTraces.map((trace) => (
              <div
                key={trace.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={trace.status === 'success' ? 'success' : 'danger'}>
                    {trace.status}
                  </Badge>
                  <span className="text-sm font-mono text-white">{trace.operation}</span>
                  <span className="text-xs text-slate-400">{trace.id}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  {trace.tokens > 0 && <span>{trace.tokens} tokens</span>}
                  <span>{trace.duration}</span>
                  <span>{trace.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
