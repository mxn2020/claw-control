import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Radio,
  Power,
  Bot,
  Wrench,
  MessageSquare,
  AlertTriangle,
  Gauge,
  DollarSign,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useUsageRecords } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/observe/live')({
  component: ObserveLive,
})

function ObserveLive() {
  const stats = useQuery(api.platform.getStats, {})
  const auditLogs = useQuery(api.auditLogs.list, { limit: 20 })
  const usageRecords = useUsageRecords() ?? []
  const logs = auditLogs ?? []

  const totalCostToday = usageRecords.reduce((s, r) => s + r.cost, 0)

  // Build icon for event type
  const eventIcon = (action: string) => {
    if (action.includes('agent') || action.includes('create')) return <Bot className="w-4 h-4 text-emerald-400" />
    if (action.includes('tool')) return <Wrench className="w-4 h-4 text-cyan-400" />
    if (action.includes('session')) return <MessageSquare className="w-4 h-4 text-blue-400" />
    if (action.includes('error') || action.includes('quarantine')) return <AlertTriangle className="w-4 h-4 text-amber-400" />
    return <Bot className="w-4 h-4 text-cyan-400" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Event Stream</h1>
          <p className="text-sm text-slate-400 mt-1">
            Mission control — real-time event feed across all instances
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors border-2 border-red-500 shadow-lg shadow-red-900/30">
          <Power className="w-5 h-5" />
          KILL SWITCH
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-3">
            <span className="text-xs text-slate-400">Online Instances</span>
            <p className="text-2xl font-bold text-white">{stats?.onlineInstances ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3">
            <span className="text-xs text-slate-400">Active Agents</span>
            <p className="text-2xl font-bold text-white">{stats?.activeAgents ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3">
            <span className="text-xs text-slate-400">Active Sessions</span>
            <p className="text-2xl font-bold text-white">{stats?.activeSessions ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3">
            <span className="text-xs text-slate-400">Cost Today</span>
            <p className="text-2xl font-bold text-white">${totalCostToday.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Spend Velocity Meter */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <Gauge className="w-6 h-6 text-cyan-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">
                  Spend Velocity
                </span>
                <span className="text-sm font-bold text-cyan-400">
                  ${(totalCostToday / 24).toFixed(2)}/hr
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (totalCostToday / 120) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">$0</span>
                <span className="text-xs text-slate-500">Budget: $5.00/hr</span>
              </div>
            </div>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
        </CardContent>
      </Card>

      {/* Live Stream */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <CardTitle className="text-base">Live Feed</CardTitle>
            <Badge variant="success" className="ml-2">
              streaming
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No recent events.</p>
            )}
            {logs.map((log) => (
              <div
                key={log._id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                {eventIcon(log.action)}
                <Badge variant="outline" className="text-xs shrink-0">
                  {log.action}
                </Badge>
                <span className="text-sm text-slate-300 flex-1">
                  {log.resourceType}{log.resourceId ? ` (${log.resourceId})` : ''}
                  {log.details ? ` — ${log.details}` : ''}
                </span>
                <span className="text-xs text-slate-500 shrink-0">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
