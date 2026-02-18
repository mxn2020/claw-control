import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Bot,
  Cpu,
  HardDrive,
  MemoryStick,
  RotateCcw,
  ShieldAlert,
  Trash2,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/')({
  component: InstanceDetail,
})

const mockInstance = {
  name: 'Production Gateway',
  status: 'online' as const,
  provider: 'DigitalOcean',
  region: 'nyc3',
  version: 'v0.9.2',
  uptime: '14d 6h 32m',
  cpu: 42,
  memory: 68,
  disk: 31,
}

const mockAgents = [
  { id: 'agent_1', name: 'support-bot', status: 'active', model: 'gpt-4o' },
  { id: 'agent_2', name: 'sales-assistant', status: 'active', model: 'gpt-4o-mini' },
  { id: 'agent_3', name: 'internal-ops', status: 'idle', model: 'claude-3.5-sonnet' },
]

const mockActivity = [
  { id: 1, message: 'Agent support-bot started new session', time: '2 min ago' },
  { id: 2, message: 'Health check passed', time: '5 min ago' },
  { id: 3, message: 'Agent sales-assistant completed session #482', time: '12 min ago' },
  { id: 4, message: 'Config updated: max_tokens → 4096', time: '1 hour ago' },
  { id: 5, message: 'Agent internal-ops went idle', time: '2 hours ago' },
]

const tabs = ['Overview', 'Config', 'Agents', 'Sessions', 'Terminal', 'Files']

function InstanceDetail() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/fleet/instances"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instances
      </Link>

      {/* Instance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{mockInstance.name}</h1>
          <Badge variant={mockInstance.status === 'online' ? 'success' : 'danger'}>
            {mockInstance.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-amber-600/50 bg-amber-500/10 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            Quarantine
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-red-600/50 bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Instance Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
        <span>ID: {instanceId}</span>
        <span>·</span>
        <span>{mockInstance.provider} / {mockInstance.region}</span>
        <span>·</span>
        <span>Version: {mockInstance.version}</span>
        <span>·</span>
        <span>Uptime: {mockInstance.uptime}</span>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-slate-700">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={
              i === 0
                ? 'px-4 py-2.5 text-sm font-medium text-cyan-400 border-b-2 border-cyan-400'
                : 'px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-500 transition-colors'
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      <div className="space-y-6">
        {/* Resource Usage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">CPU Usage</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{mockInstance.cpu}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${mockInstance.cpu}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Memory</span>
                <MemoryStick className="w-4 h-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{mockInstance.memory}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${mockInstance.memory}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Disk</span>
                <HardDrive className="w-4 h-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{mockInstance.disk}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${mockInstance.disk}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agents</CardTitle>
                <Badge variant="info">{mockAgents.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-white">{agent.name}</div>
                        <div className="text-xs text-slate-400">{agent.model}</div>
                      </div>
                    </div>
                    <Badge
                      variant={agent.status === 'active' ? 'success' : 'default'}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivity.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between gap-4 border-b border-slate-700/30 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm text-slate-300">{event.message}</p>
                    <span className="whitespace-nowrap text-xs text-slate-500">
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
