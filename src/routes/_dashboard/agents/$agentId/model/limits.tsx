import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { Gauge, DollarSign, Zap, Clock } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/limits')({ component: AgentModelLimits })

function AgentModelLimits() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  const totalTokens = agent.totalTokens ?? 0
  const totalCost = agent.totalCost ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Model Limits</h1>
        <p className="text-sm text-slate-400 mt-1">Token, cost, and rate limit thresholds for {agent.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Tokens Used</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalTokens.toLocaleString()}</div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min((totalTokens / 1_000_000) * 100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Soft limit: 1,000,000 tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <CardTitle className="text-sm">Cost Consumed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalCost.toFixed(4)}</div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min((totalCost / 50) * 100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Soft limit: $50.00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-sm">Rate Limit</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="info">60 req/min</Badge>
              <span className="text-xs text-slate-400">Default model rate cap</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Rate limits are enforced per-agent on the VPS instance and cannot be changed from ClawControl.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <CardTitle className="text-sm">Session Stats</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{agent.sessionCount ?? 0}</div>
            <p className="text-xs text-slate-500 mt-2">Total sessions created</p>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant={agent.status === 'active' ? 'success' : 'default'}>{agent.status}</Badge>
              <span className="text-xs text-slate-400">{agent.model ?? 'No model set'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
