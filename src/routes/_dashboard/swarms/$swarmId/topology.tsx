import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Network, Bot, ArrowRight } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/topology')({
  component: SwarmTopology,
})

function SwarmTopology() {
  const { swarmId } = Route.useParams()
  const swarm = useQuery(api.swarms.get, { id: swarmId as any })
  const allAgents = useQuery(api.agents.list, {})

  const memberAgents = (allAgents ?? []).filter((agent) =>
    swarm?.agentIds?.includes(agent._id)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Network className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Swarm Topology</h1>
          <p className="text-sm text-slate-400 mt-1">
            {swarm?.name ?? 'Swarm'} — node graph and connections
          </p>
        </div>
      </div>

      {/* Visual Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topology Canvas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border border-dashed border-slate-700 rounded-lg bg-slate-900">
            <div className="text-center">
              <Network className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                Visual topology editor requires @xyflow/react
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {memberAgents.length} agents in this swarm
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Swarm Agents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Model</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {memberAgents.length > 0 ? memberAgents.map((agent) => (
                  <tr key={agent._id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{agent.name}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{agent.model}</td>
                    <td className="px-4 py-3">
                      <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>{agent.status}</Badge>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500">No agents in this swarm</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
