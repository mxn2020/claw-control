import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Bot, Activity, AlertCircle, Clock, Plus, Coins } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/')({
  component: AgentCatalog,
})

const mockAgents = [
  {
    id: 'agent_1',
    name: 'Support Agent',
    instance: 'Production Gateway',
    status: 'active' as const,
    model: 'gpt-4o',
    sessions: 142,
    totalTokens: 1_284_300,
    totalCost: 38.52,
  },
  {
    id: 'agent_2',
    name: 'Research Agent',
    instance: 'Production Gateway',
    status: 'active' as const,
    model: 'claude-3.5-sonnet',
    sessions: 87,
    totalTokens: 2_105_800,
    totalCost: 63.17,
  },
  {
    id: 'agent_3',
    name: 'Code Review Bot',
    instance: 'Staging Server',
    status: 'idle' as const,
    model: 'gpt-4o',
    sessions: 56,
    totalTokens: 892_400,
    totalCost: 26.77,
  },
  {
    id: 'agent_4',
    name: 'QA Tester',
    instance: 'Staging Server',
    status: 'error' as const,
    model: 'gpt-4o-mini',
    sessions: 34,
    totalTokens: 310_200,
    totalCost: 4.65,
  },
  {
    id: 'agent_5',
    name: 'Docs Writer',
    instance: 'Production Gateway',
    status: 'active' as const,
    model: 'claude-3.5-sonnet',
    sessions: 29,
    totalTokens: 645_100,
    totalCost: 19.35,
  },
  {
    id: 'agent_6',
    name: 'Dev Sandbox Agent',
    instance: 'Dev Instance',
    status: 'idle' as const,
    model: 'gpt-4o-mini',
    sessions: 12,
    totalTokens: 98_700,
    totalCost: 1.48,
  },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success' as const
    case 'idle':
      return 'warning' as const
    case 'error':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function AgentCatalog() {
  const active = mockAgents.filter((a) => a.status === 'active').length
  const idle = mockAgents.filter((a) => a.status === 'idle').length
  const error = mockAgents.filter((a) => a.status === 'error').length

  const stats = [
    { label: 'Total Agents', value: mockAgents.length, icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { label: 'Active', value: active, icon: <Activity className="w-5 h-5 text-emerald-400" /> },
    { label: 'Idle', value: idle, icon: <Clock className="w-5 h-5 text-amber-400" /> },
    { label: 'Error', value: error, icon: <AlertCircle className="w-5 h-5 text-red-400" /> },
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
          {mockAgents.map((agent) => (
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
                    <span>{agent.instance}</span>
                    <span>·</span>
                    <span>{agent.model}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-white">{agent.sessions}</div>
                      <div className="text-xs text-slate-400">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {agent.totalTokens >= 1_000_000
                          ? `${(agent.totalTokens / 1_000_000).toFixed(1)}M`
                          : `${(agent.totalTokens / 1_000).toFixed(0)}K`}
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
