import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { GitCompareArrows, Bot, Play } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState, useMemo } from 'react'

export const Route = createFileRoute('/_dashboard/agents/compare')({
  component: AgentCompare,
})

function AgentCompare() {
  const { user } = useAuth()
  const orgId = user?.orgId as any
  const agents = useQuery(api.agents.list, orgId ? { orgId } : "skip")

  const [selectedA, setSelectedA] = useState<string>('')
  const [selectedB, setSelectedB] = useState<string>('')

  const agentList = agents ?? []

  const agentA = useMemo(() => agentList.find((a: any) => a._id === selectedA), [agentList, selectedA])
  const agentB = useMemo(() => agentList.find((a: any) => a._id === selectedB), [agentList, selectedB])

  const pair = [agentA, agentB].filter(Boolean)

  if (!agents && orgId) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading agents…</span>
      </div>
    )
  }

  // Auto-select first two if none selected
  if (agentList.length >= 2 && !selectedA && !selectedB) {
    setSelectedA(agentList[0]._id)
    setSelectedB(agentList[1]._id)
  }

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
    { label: 'Model', getValue: (a: any) => a?.model ?? '—' },
    { label: 'Status', getValue: (a: any) => a?.status ?? '—' },
    { label: 'Sessions', getValue: (a: any) => String(a?.sessionCount ?? 0) },
    { label: 'Total Tokens', getValue: (a: any) => String(a?.totalTokens ?? 0) },
    { label: 'Cost', getValue: (a: any) => `$${(a?.totalCost ?? 0).toFixed(4)}` },
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
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-4">
        <div />
        {[
          { label: 'Agent A', selected: selectedA, setSelected: setSelectedA, agent: agentA },
          { label: 'Agent B', selected: selectedB, setSelected: setSelectedB, agent: agentB }
        ].map((slot, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="mb-3">
                <select
                  className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded p-2 focus:ring-1 focus:ring-cyan-500 outline-none"
                  value={slot.selected}
                  onChange={(e) => slot.setSelected(e.target.value)}
                >
                  <option value="">Select Agent...</option>
                  {agentList.map((a: any) => (
                    <option key={a._id} value={a._id} disabled={a._id === selectedA || a._id === selectedB}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              {slot.agent ? (
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <div>
                    <CardTitle className="text-base">{slot.agent.name}</CardTitle>
                    <span className="text-xs text-slate-400">
                      {slot.agent.model ?? 'No model set'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 py-2">No agent selected</div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      {agentA && agentB && (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-700/50">
                {comparisonRows.map((row) => {
                  const valA = row.getValue(agentA)
                  const valB = row.getValue(agentB)
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
                  {[agentA, agentB].map((agent) => (
                    <p key={agent._id} className="text-sm text-slate-300 line-clamp-3">
                      {agent.personality?.soulMd
                        ? agent.personality.soulMd
                        : 'Not configured'}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* A/B Testing Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                Run A/B Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-400">
                  Send the same prompt to both agents to evaluate their responses side-by-side.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter a prompt to test..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                  <Button variant="default">
                    Run Test
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded border border-slate-800 bg-slate-900/50 min-h-[100px] flex items-center justify-center text-sm text-slate-500">
                    Agent A Output will appear here
                  </div>
                  <div className="p-4 rounded border border-slate-800 bg-slate-900/50 min-h-[100px] flex items-center justify-center text-sm text-slate-500">
                    Agent B Output will appear here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
