import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Network, Bot, Server } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/')({
  component: SwarmDetail,
})

function SwarmDetail() {
  const { swarmId } = Route.useParams()
  const swarm = useQuery(api.swarms.get, { id: swarmId as any })
  const allInstances = useQuery(api.instances.list, {})
  const allAgents = useQuery(api.agents.list, {})

  // Filter instances and agents that belong to this swarm
  const memberInstances = (allInstances ?? []).filter((inst) =>
    swarm?.instanceIds?.includes(inst._id)
  )
  const memberAgents = (allAgents ?? []).filter((agent) =>
    swarm?.agentIds?.includes(agent._id)
  )

  if (!swarm) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-slate-400">Loading swarm…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">{swarm.name}</h1>
            <p className="text-sm text-slate-400 mt-1">Swarm {swarmId.slice(-6)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{swarm.tier}-tier</Badge>
          <Badge variant={swarm.status === 'active' ? 'success' : swarm.status === 'error' ? 'danger' : 'warning'}>
            {swarm.status}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {['Overview', 'Topology', 'Deploy'].map((tab, i) => (
          <Link
            key={tab}
            to={
              i === 0 ? `/swarms/${swarmId}` :
                i === 1 ? `/swarms/${swarmId}/topology` :
                  `/swarms/${swarmId}/deploy`
            }
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${i === 0
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Instances */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Member Instances ({memberInstances.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {memberInstances.length > 0 ? (
              <div className="space-y-3">
                {memberInstances.map((inst) => (
                  <div key={inst._id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <span className="text-sm text-white">{inst.name}</span>
                    <Badge variant={inst.status === 'online' ? 'success' : 'danger'}>{inst.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No instances assigned to this swarm</p>
            )}
          </CardContent>
        </Card>

        {/* Member Agents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Member Agents ({memberAgents.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {memberAgents.length > 0 ? (
              <div className="space-y-3">
                {memberAgents.map((agent) => (
                  <div key={agent._id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <div>
                      <span className="text-sm text-white">{agent.name}</span>
                      <span className="text-xs text-slate-400 ml-2">{agent.model}</span>
                    </div>
                    <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>{agent.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No agents assigned to this swarm</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
