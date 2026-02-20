import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Network, Plus, Bot, Server } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/')({
  component: SwarmsOverview,
})

const tierLegend = [
  { symbol: 'μ', label: 'Micro', range: '2–10 agents' },
  { symbol: 'm', label: 'Meso', range: '11–100 agents' },
  { symbol: 'M', label: 'Macro', range: '101–1,000 agents' },
  { symbol: 'Ω', label: 'Mega', range: '1,001–10,000 agents' },
]

function SwarmsOverview() {
  const swarms = useQuery(api.swarms.list, {})
  const swarmList = swarms ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Swarms</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage multi-agent swarm topologies
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">
          <Plus className="w-4 h-4" />
          New Swarm
        </button>
      </div>

      {/* Swarm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {swarmList.map((swarm) => (
          <Link
            key={swarm._id}
            to="/swarms/$swarmId"
            params={{ swarmId: swarm._id }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <CardTitle className="text-base">{swarm.name}</CardTitle>
                  </div>
                  <Badge variant={swarm.status === 'active' ? 'success' : swarm.status === 'provisioning' ? 'warning' : 'default'}>
                    {swarm.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <Badge variant="info">{swarm.tier}-tier</Badge>
                  <div className="flex items-center gap-1">
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    {swarm.instanceIds?.length ?? 0} instances
                  </div>
                  <div className="flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-slate-400" />
                    {swarm.agentIds?.length ?? 0} agents
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {swarmList.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-500">
            No swarms configured yet.
          </div>
        )}
      </div>

      {/* Tier Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Swarm Tier Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tierLegend.map((tier) => (
              <div
                key={tier.symbol}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900"
              >
                <span className="text-2xl font-bold text-cyan-400">
                  {tier.symbol}
                </span>
                <div>
                  <div className="text-sm font-medium text-white">
                    {tier.label}
                  </div>
                  <div className="text-xs text-slate-400">{tier.range}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
