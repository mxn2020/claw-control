import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Server, Bot, Activity, Zap, Plus, Wifi, WifiOff } from 'lucide-react'
import { useInstances } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/fleet/')({
  component: FleetOverview,
})

function FleetOverview() {
  const instances = useInstances()

  const online = instances.filter((i) => i.status === 'online').length
  const totalAgents = instances.reduce((s, i) => s + (i.agentCount ?? 0), 0)

  const stats = [
    { label: 'Total Instances', value: instances.length, icon: <Server className="w-5 h-5 text-cyan-400" /> },
    { label: 'Online', value: online, icon: <Zap className="w-5 h-5 text-emerald-400" /> },
    { label: 'Total Agents', value: totalAgents, icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { label: 'Active Sessions', value: instances.reduce((s, i) => s + ((i as { sessionCount?: number }).sessionCount ?? 0), 0), icon: <Activity className="w-5 h-5 text-cyan-400" /> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Fleet Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor and manage your OpenClaw instances</p>
        </div>
        <Link to="/fleet/instances/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> New Instance
          </Button>
        </Link>
      </div>

      {/* Stats */}
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

      {/* Instance List */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Instance Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {instances.map((instance) => (
            <Link
              key={instance.id}
              to="/fleet/instances/$instanceId"
              params={{ instanceId: instance.id }}
              className="block"
            >
              <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{instance.name}</CardTitle>
                    <Badge variant={(instance.status as string) === 'online' ? 'success' : (instance.status as string) === 'error' ? 'danger' : (instance.status as string) === 'provisioning' ? 'warning' : 'default'}>
                      {instance.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {instance.status === 'online'
                      ? <Wifi className="w-3 h-3 text-emerald-400" />
                      : <WifiOff className="w-3 h-3 text-slate-500" />}
                    <span>{instance.provider ?? 'Local'}</span>
                    {instance.region && <><span>·</span><span>{instance.region}</span></>}
                    {instance.version && <><span>·</span><span className="font-mono">v{instance.version}</span></>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                    <Bot className="w-4 h-4 text-slate-400" />
                    <span>{instance.agentCount} agent{instance.agentCount !== 1 ? 's' : ''}</span>
                  </div>
                  {instance.status === 'online' && instance.cpuUsage !== undefined && (
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>CPU</span><span>{instance.cpuUsage}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${instance.cpuUsage}%` }} />
                        </div>
                      </div>
                      {instance.memoryUsage !== undefined && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>MEM</span><span>{instance.memoryUsage}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${instance.memoryUsage}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
          {instances.length === 0 && (
            <div className="col-span-3 text-center py-12 text-slate-500">
              No instances yet.{' '}
              <Link to="/fleet/instances/new" className="text-cyan-400 hover:text-cyan-300">
                Add your first instance
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
