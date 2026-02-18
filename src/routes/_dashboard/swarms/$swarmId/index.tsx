import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Network, Bot, Server } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/')({
  component: SwarmDetail,
})

const tabs = [
  { label: 'Overview', active: true },
  { label: 'Instances', active: false },
  { label: 'Agents', active: false },
  { label: 'Topology', active: false },
  { label: 'Deploy', active: false },
  { label: 'Config', active: false },
  { label: 'Observe', active: false },
]

const memberInstances = [
  { id: 'inst_1', name: 'Production Gateway', status: 'online' },
  { id: 'inst_2', name: 'Staging Server', status: 'online' },
  { id: 'inst_3', name: 'Dev Instance', status: 'offline' },
]

const memberAgents = [
  { id: 'agent_1', name: 'Support Agent', model: 'gpt-4o', status: 'active' },
  {
    id: 'agent_2',
    name: 'Research Agent',
    model: 'claude-3.5-sonnet',
    status: 'active',
  },
  {
    id: 'agent_3',
    name: 'Code Review Bot',
    model: 'gpt-4o',
    status: 'idle',
  },
]

function SwarmDetail() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">
              Support μ-Swarm
            </h1>
            <p className="text-sm text-slate-400 mt-1">Swarm {swarmId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">μ-tier</Badge>
          <Badge variant="success">active</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Instances */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Member Instances</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberInstances.map((inst) => (
                <div
                  key={inst.id}
                  className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
                >
                  <span className="text-sm text-white">{inst.name}</span>
                  <Badge
                    variant={
                      inst.status === 'online' ? 'success' : 'danger'
                    }
                  >
                    {inst.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Member Agents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Member Agents</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
                >
                  <div>
                    <span className="text-sm text-white">{agent.name}</span>
                    <span className="text-xs text-slate-400 ml-2">
                      {agent.model}
                    </span>
                  </div>
                  <Badge
                    variant={
                      agent.status === 'active' ? 'success' : 'warning'
                    }
                  >
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topology Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topology View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 border border-dashed border-slate-700 rounded-lg">
            <p className="text-sm text-slate-500">
              Swarm topology visualization coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
