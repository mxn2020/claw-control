import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Network,
  Bot,
  ArrowRight,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/swarms/$swarmId/topology',
)({
  component: SwarmTopology,
})

const nodes = [
  { id: 'mgr_1', name: 'Swarm Manager', role: 'manager', model: 'gpt-4o', status: 'active' },
  { id: 'wkr_1', name: 'Support Agent', role: 'worker', model: 'gpt-4o', status: 'active' },
  { id: 'wkr_2', name: 'Research Agent', role: 'worker', model: 'claude-3.5-sonnet', status: 'active' },
  { id: 'wkr_3', name: 'Code Review Bot', role: 'worker', model: 'gpt-4o', status: 'idle' },
  { id: 'wkr_4', name: 'Analytics Agent', role: 'worker', model: 'gpt-4o-mini', status: 'active' },
]

const connections = [
  { from: 'Swarm Manager', to: 'Support Agent', type: 'delegation' },
  { from: 'Swarm Manager', to: 'Research Agent', type: 'delegation' },
  { from: 'Swarm Manager', to: 'Code Review Bot', type: 'delegation' },
  { from: 'Swarm Manager', to: 'Analytics Agent', type: 'delegation' },
  { from: 'Support Agent', to: 'Research Agent', type: 'peer' },
  { from: 'Research Agent', to: 'Analytics Agent', type: 'peer' },
]

function SwarmTopology() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Swarm Topology</h1>
            <p className="text-sm text-slate-400 mt-1">
              Swarm {swarmId} — node graph and connections
            </p>
          </div>
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
                React Flow canvas — drag-and-drop manager/worker node graph
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Visualisation requires @xyflow/react (not yet installed)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nodes Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Nodes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Model</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{node.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={node.role === 'manager' ? 'info' : 'outline'}>{node.role}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{node.model}</td>
                    <td className="px-4 py-3">
                      <Badge variant={node.status === 'active' ? 'success' : 'warning'}>{node.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Connections Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Connections</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">From</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider" />
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">To</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{conn.from}</td>
                    <td className="px-4 py-3">
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </td>
                    <td className="px-4 py-3 text-white">{conn.to}</td>
                    <td className="px-4 py-3">
                      <Badge variant={conn.type === 'delegation' ? 'info' : 'outline'}>{conn.type}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
