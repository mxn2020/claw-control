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
  Activity,
  FileText,
  DollarSign,
  Clock,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { useUsageRecords } from '#/lib/dataHooks'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/observe',
)({
  component: InstanceObserve,
})

function InstanceObserve() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const agents = useQuery(api.agents.list, { instanceId: instanceId as Id<"instances"> })
  const sessions = useQuery(api.sessions.list, { instanceId: instanceId as Id<"instances"> })
  const usageRecords = useUsageRecords() ?? []
  const recentLogs = useQuery(api.auditLogs.list, { limit: 10 })
  const logs = recentLogs ?? []

  const totalTokens = usageRecords.reduce((s, r) => s + r.tokensUsed, 0)
  const totalCost = usageRecords.reduce((s, r) => s + r.cost, 0)
  const activeSessions = (sessions ?? []).filter(s => s.status === 'active').length

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Observability</h1>
          <p className="text-sm text-slate-400">{instance?.name ?? instanceId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <span className="text-sm text-slate-400">Active Sessions</span>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{activeSessions}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <span className="text-sm text-slate-400">Total Agents</span>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{(agents ?? []).length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <span className="text-sm text-slate-400">Total Cost</span>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">${totalCost.toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <CardTitle>Usage Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Tokens</span>
              <span className="text-slate-200">{totalTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Usage Records</span>
              <span className="text-slate-200">{usageRecords.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Sessions</span>
              <span className="text-slate-200">{(sessions ?? []).length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <CardTitle>Cost Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estimated Cost</span>
              <span className="text-slate-200">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Avg Cost/Record</span>
              <span className="text-slate-200">
                ${usageRecords.length > 0 ? (totalCost / usageRecords.length).toFixed(4) : '0.00'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Badge variant="info">{logs.length} events</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
            )}
            {logs.map((log) => (
              <div
                key={log._id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">{log.action}</span>
                      <Badge variant="info">{log.resourceType}</Badge>
                    </div>
                    {log.details && (
                      <p className="text-xs text-slate-400 mt-0.5">{log.details}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(log.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
