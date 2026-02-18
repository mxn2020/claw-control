import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Coins } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/observe/cost',
)({
  component: AgentObserveCost,
})

const mockCostBreakdown = [
  { period: 'Today', promptTokens: 42000, completionTokens: 18000, cost: 1.24 },
  { period: 'This week', promptTokens: 280000, completionTokens: 110000, cost: 8.10 },
  { period: 'This month', promptTokens: 1200000, completionTokens: 480000, cost: 34.20 },
]

const mockByOperation = [
  { operation: 'chat.completion', calls: 312, cost: 28.40 },
  { operation: 'embeddings', calls: 1840, cost: 3.12 },
  { operation: 'tool.exec', calls: 88, cost: 0.00 },
  { operation: 'memory.lookup', calls: 621, cost: 2.68 },
]

function AgentObserveCost() {
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
        <h1 className="text-2xl font-bold text-white">Cost Breakdown</h1>
        <p className="text-sm text-slate-400 mt-1">
          Agent-specific cost analysis for {agentId}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockCostBreakdown.map((row) => (
          <Card key={row.period}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{row.period}</span>
                <Coins className="w-4 h-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${row.cost.toFixed(2)}</div>
              <div className="text-xs text-slate-400 mt-1">
                {((row.promptTokens + row.completionTokens) / 1000).toFixed(0)}K tokens
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost by Operation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockByOperation.map((op) => (
              <div
                key={op.operation}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-white">{op.operation}</span>
                  <Badge variant="default">{op.calls} calls</Badge>
                </div>
                <span className="text-sm font-medium text-cyan-400">${op.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
