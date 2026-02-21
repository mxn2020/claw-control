import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { GitCompareArrows, Bot } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/compare')({
  component: AgentCompare,
})

function AgentCompare() {
  const agents = useQuery(api.agents.list, {})

  if (!agents) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading agents…</span>
      </div>
    )
  }

  // Compare first two agents
  const pair = agents.slice(0, 2)

  if (pair.length < 2) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <GitCompareArrows className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Compare Agents</h1>
            <p className="text-sm text-slate-400 mt-1">
              Need at least 2 agents to compare
            </p>
          </div>
        </div>
      </div>
    )
  }

  const comparisonRows = [
    { label: 'Model', getValue: (a: typeof pair[0]) => a.model ?? '—' },
    { label: 'Status', getValue: (a: typeof pair[0]) => a.status },
    { label: 'Sessions', getValue: (a: typeof pair[0]) => String(a.sessionCount ?? 0) },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <GitCompareArrows className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Compare Agents</h1>
          <p className="text-sm text-slate-400 mt-1">
            Side-by-side comparison of agent performance and configuration
          </p>
        </div>
      </div>

      {/* Agent Headers */}
      <div className="grid grid-cols-[200px_1fr_1fr] gap-4">
        <div />
        {pair.map((agent) => (
          <Card key={agent._id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-cyan-400" />
                <div>
                  <CardTitle className="text-base">{agent.name}</CardTitle>
                  <span className="text-xs text-slate-400">
                    {agent.model ?? 'No model set'}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700/50">
            {comparisonRows.map((row) => {
              const valA = row.getValue(pair[0])
              const valB = row.getValue(pair[1])
              const isDiff = valA !== valB

              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[200px_1fr_1fr] gap-4 px-6 py-3"
                >
                  <span className="text-sm font-medium text-slate-400">
                    {row.label}
                  </span>
                  <span
                    className={`text-sm ${isDiff ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}
                  >
                    {row.label === 'Status' ? (
                      <Badge
                        variant={
                          valA === 'active' ? 'success' : 'warning'
                        }
                      >
                        {valA}
                      </Badge>
                    ) : (
                      valA
                    )}
                  </span>
                  <span
                    className={`text-sm ${isDiff ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}
                  >
                    {row.label === 'Status' ? (
                      <Badge
                        variant={
                          valB === 'active' ? 'success' : 'warning'
                        }
                      >
                        {valB}
                      </Badge>
                    ) : (
                      valB
                    )}
                  </span>
                </div>
              )
            })}

            {/* Personality */}
            <div className="grid grid-cols-[200px_1fr_1fr] gap-4 px-6 py-3">
              <span className="text-sm font-medium text-slate-400">
                Personality
              </span>
              {pair.map((agent) => (
                <p key={agent._id} className="text-sm text-slate-300">
                  {agent.personality?.soulMd
                    ? agent.personality.soulMd.slice(0, 120) + '…'
                    : 'Not configured'}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
