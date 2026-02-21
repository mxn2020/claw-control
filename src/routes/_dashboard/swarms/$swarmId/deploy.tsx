import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Rocket,
  History,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/deploy')({
  component: SwarmDeploy,
})

function SwarmDeploy() {
  const { swarmId } = Route.useParams()
  const swarm = useQuery(api.swarms.get, { id: swarmId as Id<"swarms"> })
  const auditLogs = useQuery(api.platform.listAuditLogs, {})

  if (!swarm) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading deploy data…</span>
      </div>
    )
  }

  const logs = auditLogs ?? []
  const deployLogs = logs.filter(
    (l) => l.action.includes('deploy') && l.resourceType === 'swarm'
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Rolling Deploy</h1>
            <p className="text-sm text-slate-400 mt-1">
              Swarm: {swarm.name} — {swarm.tier} tier
            </p>
          </div>
        </div>
        <Button variant="default" size="sm">
          <Rocket className="w-4 h-4 mr-2" />
          New Deploy
        </Button>
      </div>

      {/* Swarm Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <Badge
                variant={
                  swarm.status === 'active'
                    ? 'success'
                    : swarm.status === 'error'
                      ? 'danger'
                      : 'default'
                }
              >
                {swarm.status}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500">Tier</p>
              <p className="text-sm text-white font-medium">{swarm.tier}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Instances</p>
              <p className="text-sm text-white font-medium">
                {swarm.instanceIds.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Agents</p>
              <p className="text-sm text-white font-medium">
                {swarm.agentIds.length}
              </p>
            </div>
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
        <CardContent>
          {deployLogs.length === 0 ? (
            <p className="text-sm text-slate-500">
              No deployment history for this swarm
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
