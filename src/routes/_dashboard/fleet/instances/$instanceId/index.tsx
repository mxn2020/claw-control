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
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/')({
  component: InstanceDetail,
})

function InstanceDetail() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const agents = useQuery(api.agents.list, { instanceId: instanceId as Id<"instances"> })
  const recentLogs = useQuery(api.auditLogs.list, { limit: 5 })

  const updateStatus = useMutation(api.instances.updateStatus)
  const removeInstance = useMutation(api.instances.remove)

  if (instance === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-slate-400">Loading instance…</div>
      </div>
    )
  }

  if (instance === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-slate-400">Instance not found.</p>
        <Link to="/fleet/instances" className="text-cyan-400 hover:text-cyan-300 text-sm">
          ← Back to Instances
        </Link>
      </div>
    )
  }

  const agentList = agents ?? []
  const activity = (recentLogs ?? []).slice(0, 5)

  const handleQuarantine = async () => {
    await updateStatus({ id: instance._id, status: 'quarantined' })
  }

  const handleRestart = async () => {
    await updateStatus({ id: instance._id, status: 'offline' })
    // Simulate restart by setting back to online after a delay
    setTimeout(() => {
      updateStatus({ id: instance._id, status: 'online' })
    }, 2000)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this instance? This action cannot be undone.')) {
      await removeInstance({ id: instance._id })
    }
  }

  const cpuUsage = instance.cpuUsage ?? 0
  const memoryUsage = instance.memoryUsage ?? 0

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
          <h1 className="text-2xl font-bold text-white">{instance.name}</h1>
          <Badge variant={instance.status === 'online' ? 'success' : instance.status === 'error' ? 'danger' : 'warning'}>
            {instance.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
          <button
            type="button"
            onClick={handleQuarantine}
            className="inline-flex items-center gap-2 rounded-lg border border-amber-600/50 bg-amber-500/10 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            Quarantine
          </button>
          <button
            type="button"
            onClick={handleDelete}
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
        <span>{instance.provider ?? 'Local'} / {instance.region ?? 'default'}</span>
        <span>·</span>
        <span>Version: {instance.version ?? 'unknown'}</span>
        {instance.lastHeartbeat && (
          <>
            <span>·</span>
            <span>Last heartbeat: {new Date(instance.lastHeartbeat).toLocaleString()}</span>
          </>
        )}
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
              <div className="text-2xl font-bold text-white mb-2">{cpuUsage}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${cpuUsage}%` }}
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
              <div className="text-2xl font-bold text-white mb-2">{memoryUsage}%</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${memoryUsage}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Agents</span>
                <HardDrive className="w-4 h-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{instance.agentCount}</div>
              <p className="text-xs text-slate-400">{agentList.filter((a: any) => a.status === 'active').length} active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agents</CardTitle>
                <Badge variant="info">{agentList.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agentList.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No agents on this instance.</p>
                )}
                {agentList.map((agent: any) => (
                  <div
                    key={agent._id}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-white">{agent.name}</div>
                        <div className="text-xs text-slate-400">{agent.model ?? 'No model set'}</div>
                      </div>
                    </div>
                    <Badge
                      variant={agent.status === 'active' ? 'success' : agent.status === 'idle' ? 'warning' : 'default'}
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
                {activity.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
                )}
                {activity.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-start justify-between gap-4 border-b border-slate-700/30 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm text-slate-300">
                      {event.action} — {event.resourceType}{event.resourceId ? ` (${event.resourceId})` : ''}
                    </p>
                    <span className="whitespace-nowrap text-xs text-slate-500">
                      {new Date(event.createdAt).toLocaleString()}
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
