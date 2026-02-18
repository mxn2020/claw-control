import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Bot, Activity, AlertCircle, Clock, Plus, Coins } from 'lucide-react'
import { useAgents } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/agents/')({
  component: AgentCatalog,
})

const statusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success' as const
    case 'idle':
      return 'warning' as const
    case 'error':
    case 'paused':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function AgentCatalog() {
  const agents = useAgents()

  const active = agents.filter((a) => a.status === 'active').length
  const idle = agents.filter((a) => a.status === 'idle').length
  const paused = agents.filter((a) => a.status === 'paused').length

  const stats = [
    { label: 'Total Agents', value: agents.length, icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { label: 'Active', value: active, icon: <Activity className="w-5 h-5 text-emerald-400" /> },
    { label: 'Idle', value: idle, icon: <Clock className="w-5 h-5 text-amber-400" /> },
    { label: 'Paused', value: paused, icon: <AlertCircle className="w-5 h-5 text-red-400" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Catalog</h1>
          <p className="text-sm text-slate-400 mt-1">
            All agents across your fleet
          </p>
        </div>
        <Link
          to="/agents/new"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Agent
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{stat.label}</span>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              to="/agents/$agentId"
              params={{ agentId: agent.id }}
              className="block"
            >
              <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <Badge variant={statusVariant(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{agent.instanceId}</span>
                    <span>·</span>
                    <span>{agent.model}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-white">{agent.sessionCount}</div>
                      <div className="text-xs text-slate-400">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {agent.totalTokens >= 1_000_000
                          ? `${(agent.totalTokens / 1_000_000).toFixed(1)}M`
                          : agent.totalTokens >= 1_000
                            ? `${(agent.totalTokens / 1_000).toFixed(1)}K`
                            : agent.totalTokens}
                      </div>
                      <div className="text-xs text-slate-400">Tokens</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-semibold text-white flex items-center gap-0.5">
                        <Coins className="w-3.5 h-3.5 text-slate-400" />
                        ${agent.totalCost.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400">Cost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
