import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Rocket,
  Clock,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  History,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/deploy')({
  component: SwarmDeploy,
})

const rolloutStages = [
  { name: 'Canary', percent: '5%', status: 'complete', duration: '15 min' },
  { name: 'Staged — 25%', percent: '25%', status: 'complete', duration: '30 min' },
  { name: 'Staged — 50%', percent: '50%', status: 'in-progress', duration: '—' },
  { name: 'Full Rollout', percent: '100%', status: 'pending', duration: '—' },
]

const deployHistory = [
  {
    id: 'sdep_1',
    version: 'v1.5.0',
    timestamp: '2025-01-15 09:00:00',
    status: 'in-progress',
    stage: 'Staged — 50%',
    deployedBy: 'admin@acme.com',
  },
  {
    id: 'sdep_2',
    version: 'v1.4.2',
    timestamp: '2025-01-12 11:30:00',
    status: 'success',
    stage: 'Full Rollout',
    deployedBy: 'admin@acme.com',
  },
  {
    id: 'sdep_3',
    version: 'v1.4.1',
    timestamp: '2025-01-10 08:15:00',
    status: 'rolled-back',
    stage: 'Staged — 25%',
    deployedBy: 'dev@acme.com',
  },
  {
    id: 'sdep_4',
    version: 'v1.4.0',
    timestamp: '2025-01-07 14:00:00',
    status: 'success',
    stage: 'Full Rollout',
    deployedBy: 'admin@acme.com',
  },
]

const stageVariant = (status: string) => {
  switch (status) {
    case 'complete':
      return 'success' as const
    case 'in-progress':
      return 'info' as const
    case 'pending':
      return 'default' as const
    default:
      return 'default' as const
  }
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'success':
      return 'success' as const
    case 'in-progress':
      return 'info' as const
    case 'rolled-back':
      return 'warning' as const
    case 'failed':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function SwarmDeploy() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Rolling Deploy</h1>
            <p className="text-sm text-slate-400 mt-1">
              Swarm {swarmId} — canary → staged → full rollout
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            <Rocket className="w-4 h-4 mr-2" />
            New Deploy
          </Button>
        </div>
      </div>

      {/* Current Rollout Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Current Rollout — v1.5.0</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {rolloutStages.map((stage, idx) => (
              <div key={stage.name} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex-1 rounded-lg border p-3 text-center ${
                    stage.status === 'complete'
                      ? 'border-emerald-500 bg-emerald-900/20'
                      : stage.status === 'in-progress'
                        ? 'border-cyan-500 bg-cyan-900/20'
                        : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  <p className="text-xs font-medium text-white">{stage.name}</p>
                  <p className="text-lg font-bold text-white mt-1">{stage.percent}</p>
                  <Badge variant={stageVariant(stage.status)} className="mt-1">
                    {stage.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{stage.duration}</p>
                </div>
                {idx < rolloutStages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deploy History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Deploy History</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Version</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Deployed By</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deployHistory.map((dep) => (
                  <tr key={dep.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">{dep.version}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {dep.timestamp}
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{dep.stage}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(dep.status)}>{dep.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{dep.deployedBy}</td>
                    <td className="px-4 py-3">
                      {dep.status === 'success' && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Rollback
                        </Button>
                      )}
                      {dep.status === 'in-progress' && (
                        <Badge variant="info">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          active
                        </Badge>
                      )}
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
