import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Server, Bot, Activity, Zap } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/fleet/')({
  component: FleetOverview,
})

const instances = [
  {
    id: 'inst_1',
    name: 'Production Gateway',
    status: 'online' as const,
    agents: 3,
    provider: 'DigitalOcean',
    region: 'nyc3',
    cpu: 42,
    memory: 68,
  },
  {
    id: 'inst_2',
    name: 'Staging Server',
    status: 'online' as const,
    agents: 2,
    provider: 'Hetzner',
    region: 'eu-central',
    cpu: 15,
    memory: 32,
  },
  {
    id: 'inst_3',
    name: 'Dev Instance',
    status: 'offline' as const,
    agents: 1,
    provider: 'Local',
    region: undefined,
    cpu: 0,
    memory: 0,
  },
]

function FleetOverview() {
  const stats = [
    { label: 'Total Instances', value: 3, icon: <Server className="w-5 h-5 text-cyan-400" /> },
    { label: 'Online', value: 2, icon: <Zap className="w-5 h-5 text-emerald-400" /> },
    { label: 'Total Agents', value: 6, icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { label: 'Active Sessions', value: 2, icon: <Activity className="w-5 h-5 text-cyan-400" /> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Fleet Overview</h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor and manage your OpenClaw instances
        </p>
      </div>

      {/* Stats Row */}
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

      {/* Instance Health Grid */}
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
                    <Badge
                      variant={instance.status === 'online' ? 'success' : 'danger'}
                    >
                      {instance.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{instance.provider}</span>
                    {instance.region && (
                      <>
                        <span>·</span>
                        <span>{instance.region}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                    <Bot className="w-4 h-4 text-slate-400" />
                    <span>
                      {instance.agents} agent{instance.agents !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {instance.status === 'online' && (
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>CPU</span>
                          <span>{instance.cpu}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${instance.cpu}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>MEM</span>
                          <span>{instance.memory}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${instance.memory}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
