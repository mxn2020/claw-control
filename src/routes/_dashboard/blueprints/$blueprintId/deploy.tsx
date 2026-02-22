import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Rocket,
  Server,
  History,
} from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'
import { useToast } from '#/components/ui/toast'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/deploy',
)({
  component: BlueprintDeploy,
})

function BlueprintDeploy() {
  const { blueprintId } = Route.useParams()
  const { user } = useAuth()
  const orgId = user?.orgId as any
  const { toast } = useToast()

  const blueprint = useQuery(api.blueprints.get, { id: blueprintId as Id<"blueprints"> })
  const instances = useQuery(api.instances.list, orgId ? { orgId } : "skip")
  const auditLogs = useQuery(api.platform.listAuditLogs, orgId ? { orgId } : "skip")
  const deployBlueprint = useMutation(api.blueprints.deploy as any)

  const [selectedInstances, setSelectedInstances] = useState<Set<string>>(new Set())
  const [isDeploying, setIsDeploying] = useState(false)

  const toggleInstance = (id: string) => {
    const next = new Set(selectedInstances)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedInstances(next)
  }

  const handleDeploy = async () => {
    if (!orgId || selectedInstances.size === 0) return
    setIsDeploying(true)
    try {
      await deployBlueprint({
        blueprintId: blueprintId as Id<"blueprints">,
        orgId,
        instanceIds: Array.from(selectedInstances) as Id<"instances">[]
      })
      toast("Deployment initiated successfully!", "success")
      setSelectedInstances(new Set())
    } catch (e: any) {
      toast(e.message, "error")
    } finally {
      setIsDeploying(false)
    }
  }

  if (!blueprint || !instances || !auditLogs) {
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
              {instances!.map((inst) => (
                <div
                  key={inst._id}
                  onClick={() => toggleInstance(inst._id)}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg border transition-colors cursor-pointer ${selectedInstances.has(inst._id) ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedInstances.has(inst._id) ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
                      }`}>
                      {selectedInstances.has(inst._id) && <span className="bg-white w-2 h-2 rounded-sm" />}
                    </div>
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
        <Button
          variant="default"
          size="sm"
          disabled={selectedInstances.size === 0 || isDeploying}
          onClick={handleDeploy}
        >
          <Rocket className="w-4 h-4 mr-2" />
          {isDeploying ? "Deploying..." : `Deploy to ${selectedInstances.size} Instance${selectedInstances.size !== 1 ? 's' : ''}`}
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
