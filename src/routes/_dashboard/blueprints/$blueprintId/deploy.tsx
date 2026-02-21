import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Rocket,
  Server,
  History,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/deploy',
)({
  component: BlueprintDeploy,
})

function BlueprintDeploy() {
  const { blueprintId } = Route.useParams()
  const blueprint = useQuery(api.blueprints.get, { id: blueprintId as Id<"blueprints"> })
  const instances = useQuery(api.instances.list, {})
  const auditLogs = useQuery(api.platform.listAuditLogs, {})

  if (!blueprint || !instances) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading deploy data…</span>
      </div>
    )
  }

  const logs = auditLogs ?? []

  // Filter audit logs for deploy events related to this blueprint
  const deployLogs = logs.filter(
    (l) =>
      l.action.includes('deploy') &&
      l.resourceType === 'blueprint'
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Deploy Blueprint</h1>
            <p className="text-sm text-slate-400 mt-1">
              Deploy {blueprint.name} to selected instances
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
          {instances.length === 0 ? (
            <p className="text-sm text-slate-500">No instances available</p>
          ) : (
            <div className="space-y-2">
              {instances.map((inst) => (
                <div
                  key={inst._id}
                  className="flex items-center justify-between py-3 px-4 rounded-lg border border-slate-700 bg-slate-900 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border-2 border-slate-600" />
                    <span className="text-sm text-white">{inst.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        inst.status === 'online'
                          ? 'success'
                          : inst.status === 'error'
                            ? 'danger'
                            : 'default'
                      }
                    >
                      {inst.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {inst.agentCount} agent{inst.agentCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deploy */}
      <div>
        <Button variant="default" size="sm">
          <Rocket className="w-4 h-4 mr-2" />
          Deploy to Selected Instances
        </Button>
      </div>

      {/* Deployment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Deployment History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {deployLogs.length === 0 ? (
            <p className="text-sm text-slate-500">
              No deployment history for this blueprint
            </p>
          ) : (
            <div className="space-y-3">
              {deployLogs.map((log) => (
                <div
                  key={log._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Badge variant="outline" className="text-xs">
                    {log.action}
                  </Badge>
                  <span className="text-sm text-slate-300 flex-1">
                    {log.details ?? 'No details'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
