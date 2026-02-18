import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Gauge } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/model/limits',
)({
  component: AgentModelLimits,
})

const mockLimits = [
  { label: 'Max tokens per request', value: 8192, unit: 'tokens', used: 4096, cap: 8192 },
  { label: 'Daily token budget', value: 1000000, unit: 'tokens', used: 342800, cap: 1000000 },
  { label: 'Monthly spend cap', value: 50, unit: 'USD', used: 18.42, cap: 50 },
  { label: 'Requests per minute', value: 60, unit: 'req/min', used: 12, cap: 60 },
]

function AgentModelLimits() {
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
        <h1 className="text-2xl font-bold text-white">Token & Spend Caps</h1>
        <p className="text-sm text-slate-400 mt-1">
          Usage limits and spend controls for agent {agentId}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockLimits.map((limit) => {
          const pct = Math.round((limit.used / limit.cap) * 100)
          const variant = pct >= 90 ? 'danger' as const : pct >= 70 ? 'warning' as const : 'success' as const

          return (
            <Card key={limit.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-cyan-400" />
                    <CardTitle className="text-sm">{limit.label}</CardTitle>
                  </div>
                  <Badge variant={variant}>{pct}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{limit.used.toLocaleString()} {limit.unit}</span>
                    <span>cap: {limit.cap.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
