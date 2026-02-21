import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Rocket,
  Server,
  CheckCircle,
  Clock,
  History,
  AlertTriangle,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/deploy',
)({
  component: BlueprintDeploy,
})

const targetInstances = [
  { id: 'inst_1', name: 'Production Gateway', agents: 3, selected: true },
  { id: 'inst_2', name: 'Staging Server', agents: 2, selected: true },
  { id: 'inst_3', name: 'Dev Instance', agents: 1, selected: false },
]

const deploymentHistory = [
  {
    id: 'dep_1',
    version: 'v2.4.0',
    timestamp: '2025-01-15 10:30:00',
    targets: ['prod-gateway', 'staging-server'],
    status: 'success',
    deployedBy: 'admin@acme.com',
  },
  {
    id: 'dep_2',
    version: 'v2.3.1',
    timestamp: '2025-01-12 14:15:00',
    targets: ['prod-gateway'],
    status: 'success',
    deployedBy: 'admin@acme.com',
  },
  {
    id: 'dep_3',
    version: 'v2.3.0',
    timestamp: '2025-01-10 09:00:00',
    targets: ['staging-server'],
    status: 'rolled-back',
    deployedBy: 'dev@acme.com',
  },
  {
    id: 'dep_4',
    version: 'v2.2.0',
    timestamp: '2025-01-05 16:45:00',
    targets: ['prod-gateway', 'staging-server', 'dev-instance'],
    status: 'success',
    deployedBy: 'admin@acme.com',
  },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'success':
      return 'success' as const
    case 'rolled-back':
      return 'warning' as const
    case 'failed':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function BlueprintDeploy() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Deploy Blueprint</h1>
            <p className="text-sm text-slate-400 mt-1">
              Deploy blueprint {blueprintId} to selected targets
            </p>
          </div>
        </div>
      </div>

      {/* Target Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Select Targets</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {targetInstances.map((inst) => (
              <div
                key={inst.id}
                className={`flex items-center justify-between py-3 px-4 rounded-lg border transition-colors ${
                  inst.selected
                    ? 'border-cyan-500 bg-cyan-900/20'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      inst.selected ? 'border-cyan-500 bg-cyan-600' : 'border-slate-600'
                    }`}
                  >
                    {inst.selected && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-white">{inst.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {inst.agents} agent{inst.agents !== 1 ? 's' : ''}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Preview Changes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              SOUL.md personality will be updated on 2 instances
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              3 tool configurations will be synchronised
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              2 skills will be installed on Staging Server
            </div>
          </div>
          <div className="mt-4">
            <Button variant="default" size="sm">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy to 2 Instances
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deployment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Deployment History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Version</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Targets</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Deployed By</th>
                </tr>
              </thead>
              <tbody>
                {deploymentHistory.map((dep) => (
                  <tr key={dep.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">{dep.version}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {dep.timestamp}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {dep.targets.map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(dep.status)}>{dep.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{dep.deployedBy}</td>
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
