import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  AlertTriangle,
  Clock,
  Shield,
  FileText,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/incidents')({
  component: SecurityIncidents,
})

const actionSeverity = (action: string) => {
  if (action.includes('quarantine') || action.includes('isolate'))
    return 'critical'
  if (action.includes('suspend') || action.includes('block'))
    return 'high'
  if (action.includes('disable') || action.includes('error'))
    return 'medium'
  return 'low'
}

const severityVariant = (severity: string) => {
  switch (severity) {
    case 'critical': return 'danger' as const
    case 'high': return 'danger' as const
    case 'medium': return 'warning' as const
    case 'low': return 'info' as const
    default: return 'default' as const
  }
}

function SecurityIncidents() {
  const auditLogs = useQuery(api.platform.listAuditLogs, {})

  if (!auditLogs) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading incidents…</span>
      </div>
    )
  }

  // Filter for security-relevant events as incidents
  const incidents = auditLogs
    .filter(
      (l) =>
        l.action.includes('quarantine') ||
        l.action.includes('suspend') ||
        l.action.includes('security') ||
        l.action.includes('block') ||
        l.action.includes('isolate') ||
        l.action.includes('error') ||
        l.action.includes('disable')
    )
    .map((l, i) => ({
      ...l,
      incidentId: `INC-${String(i + 1).padStart(3, '0')}`,
      severity: actionSeverity(l.action),
      status: l.action.includes('resolve')
        ? 'resolved'
        : l.action.includes('mitigate')
          ? 'mitigated'
          : 'open',
    }))

  const allEvents = auditLogs.slice(0, 20)

  const openCount = incidents.filter(
    (i) => i.status === 'open'
  ).length
  const mitigatedCount = incidents.filter(
    (i) => i.status === 'mitigated'
  ).length
  const resolvedCount = incidents.filter(
    (i) => i.status === 'resolved'
  ).length

  const statusVariant = (status: string) => {
    switch (status) {
      case 'open': return 'warning' as const
      case 'mitigated': return 'info' as const
      case 'resolved': return 'success' as const
      default: return 'default' as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Incidents</h1>
        <p className="text-sm text-slate-400 mt-1">
          Security incident tracking and response timeline
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Open</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{openCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Mitigated</span>
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {mitigatedCount}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Resolved</span>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {resolvedCount}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total</span>
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {incidents.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Event Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Event Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {allEvents.length === 0 ? (
            <p className="text-sm text-slate-500">No recent events</p>
          ) : (
            <div className="space-y-3">
              {allEvents.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <span className="text-xs text-slate-500 font-mono shrink-0 w-36">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                  <Badge variant="outline" className="shrink-0">
                    {item.action}
                  </Badge>
                  <span className="text-sm text-slate-300">
                    {item.resourceType}
                    {item.resourceId ? ` — ${item.resourceId}` : ''}
                    {item.details ? `: ${item.details}` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Incident List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Security Incidents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {incidents.length === 0 ? (
            <p className="text-sm text-slate-500 p-6">
              No security incidents detected
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Resource
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((inc) => (
                    <tr
                      key={inc._id}
                      className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50 cursor-pointer"
                    >
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                        {inc.incidentId}
                      </td>
                      <td className="px-4 py-3 text-white">{inc.action}</td>
                      <td className="px-4 py-3">
                        <Badge variant={severityVariant(inc.severity)}>
                          {inc.severity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(inc.status)}>
                          {inc.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                        {new Date(inc.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {inc.resourceType}
                        {inc.resourceId ? ` — ${inc.resourceId}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
