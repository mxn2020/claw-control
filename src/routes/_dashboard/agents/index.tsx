import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Bot, Plus, Cpu, Coins, MessageSquare } from 'lucide-react'
import { useAgents } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/agents/')({
  component: AgentsPage,
})

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active: 'success',
  idle: 'warning',
  paused: 'default',
  error: 'danger',
  quarantined: 'danger',
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

function AgentsPage() {
  const agents = useAgents() || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-sm text-slate-400 mt-1">{agents.length} agent{agents.length !== 1 ? 's' : ''} across your fleet</p>
        </div>
        <div className="flex gap-2">
          <Link to="/agents/catalog">
            <Button variant="outline" size="sm">Browse Catalog</Button>
          </Link>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> New Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Link
            key={agent._id}
            to="/agents/$agentId"
            params={{ agentId: agent._id }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                    <CardTitle className="text-base truncate">{agent.name}</CardTitle>
                  </div>
                  <Badge variant={statusColors[agent.status] ?? 'default'}>{agent.status}</Badge>
                </div>
                {agent.model && (
                  <p className="text-xs text-slate-500 font-mono mt-1">{agent.model}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <div className="flex items-center justify-center text-slate-400 mb-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-semibold text-white">{fmt(agent.sessionCount)}</p>
                    <p className="text-xs text-slate-500">sessions</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <div className="flex items-center justify-center text-slate-400 mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-semibold text-white">{agent.totalTokens ? fmt(agent.totalTokens) : '—'}</p>
                    <p className="text-xs text-slate-500">tokens</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <div className="flex items-center justify-center text-slate-400 mb-1">
                      <Coins className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-semibold text-white">{agent.totalCost ? `$${agent.totalCost.toFixed(2)}` : '—'}</p>
                    <p className="text-xs text-slate-500">cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {agents.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-500">
            No agents yet.{' '}
            <Link to="/agents/catalog" className="text-cyan-400 hover:text-cyan-300">
              Deploy from the catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
