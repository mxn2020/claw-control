import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Plus } from 'lucide-react'
import { useInstances } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/fleet/instances/')({
  component: InstanceList,
})

const formatRelativeTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return Math.floor(diff / 1000) + 's ago'
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago'
  return Math.floor(diff / 3600000) + 'h ago'
}

function InstanceList() {
  const instances = useInstances()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Instances</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your OpenClaw instances
          </p>
        </div>
        <Link
          to="/fleet/instances/new"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Instance
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-4 py-3 font-medium text-slate-400">Name</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Provider</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Region</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Agents</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Version</th>
                  <th className="px-4 py-3 font-medium text-slate-400">Last Heartbeat</th>
                </tr>
              </thead>
              <tbody>
                {instances.map((instance) => (
                  <tr
                    key={instance.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/fleet/instances/$instanceId"
                        params={{ instanceId: instance.id }}
                        className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {instance.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={instance.status === 'online' ? 'success' : 'danger'}
                      >
                        {instance.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{instance.provider}</td>
                    <td className="px-4 py-3 text-slate-300">{instance.region}</td>
                    <td className="px-4 py-3 text-slate-300">{instance.agentCount}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">
                        {instance.version}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{formatRelativeTime(instance.lastHeartbeat)}</td>
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
