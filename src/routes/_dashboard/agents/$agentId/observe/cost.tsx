import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { useAuth } from '#/lib/authContext'
import { DollarSign, Cpu, TrendingUp, Zap } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/cost')({ component: AgentObserveCost })

function AgentObserveCost() {
  const { agentId } = Route.useParams()
  const { user } = useAuth()
  const orgId = user?.orgId as any
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const usageRecords = useQuery(api.usage.list, orgId ? { orgId } : "skip")

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  // Filter usage records for this agent
  const agentUsage = (usageRecords ?? []).filter(r => r.agentId === agentId)
  const totalCost = agentUsage.reduce((sum, r) => sum + r.cost, 0)
  const totalTokens = agentUsage.reduce((sum, r) => sum + r.tokensUsed, 0)

  // Group by model
  const byModel: Record<string, { cost: number; tokens: number; count: number }> = {}
  agentUsage.forEach(r => {
    const model = r.model ?? 'unknown'
    if (!byModel[model]) byModel[model] = { cost: 0, tokens: 0, count: 0 }
    byModel[model].cost += r.cost
    byModel[model].tokens += r.tokensUsed
    byModel[model].count++
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Cost Analysis</h1>
        <p className="text-sm text-slate-400 mt-1">Usage costs for {agent.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-emerald-400" /><span className="text-xs text-slate-400">Total Spend</span></div>
            <p className="text-2xl font-bold text-white">${totalCost.toFixed(4)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-cyan-400" /><span className="text-xs text-slate-400">Tokens Used</span></div>
            <p className="text-2xl font-bold text-white">{totalTokens.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-amber-400" /><span className="text-xs text-slate-400">API Calls</span></div>
            <p className="text-2xl font-bold text-white">{agentUsage.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2"><Cpu className="w-4 h-4 text-purple-400" /><span className="text-xs text-slate-400">Current Model</span></div>
            <p className="text-lg font-bold text-white font-mono">{agent.model ?? 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Cost by Model</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(byModel).length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No usage data recorded for this agent yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(byModel).sort((a, b) => b[1].cost - a[1].cost).map(([model, data]) => (
                <div key={model} className="flex items-center justify-between p-3 border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <code className="text-sm text-cyan-400 font-mono">{model}</code>
                    <span className="text-xs text-slate-500">{data.count} calls</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">{data.tokens.toLocaleString()} tokens</span>
                    <Badge variant="outline">${data.cost.toFixed(4)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
