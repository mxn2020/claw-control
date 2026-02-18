import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { AlertTriangle, Clock } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/audit/incidents')({
  component: AuditIncidents,
})

const mockIncidents = [
  {
    id: 1,
    timestamp: '2025-01-15 08:12:33 UTC',
    severity: 'critical',
    description: 'Unauthorized API key usage detected from unknown IP',
    status: 'investigating',
    resolution: '',
  },
  {
    id: 2,
    timestamp: '2025-01-14 21:04:18 UTC',
    severity: 'high',
    description: 'Rate limit exceeded on production agent endpoint',
    status: 'resolved',
    resolution: 'Blocked offending IP and increased rate-limit threshold',
  },
  {
    id: 3,
    timestamp: '2025-01-13 14:55:02 UTC',
    severity: 'medium',
    description: 'Agent sandbox escape attempt caught by policy engine',
    status: 'resolved',
    resolution: 'Quarantined agent, patched sandbox policy',
  },
  {
    id: 4,
    timestamp: '2025-01-12 09:30:47 UTC',
    severity: 'low',
    description: 'Expired TLS certificate on staging webhook endpoint',
    status: 'resolved',
    resolution: 'Renewed certificate via ACME provider',
  },
]

const severityVariant: Record<string, 'danger' | 'warning' | 'info' | 'default'> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'default',
}

function AuditIncidents() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Incidents</h1>
        <p className="text-sm text-slate-400 mt-1">
          Security incident log — severity, status, and resolution details
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Open Incidents</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">1</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Resolved (30d)</span>
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">3</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Avg Resolution</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">4.2h</span>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Incident Log</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Resolution
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {inc.timestamp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={severityVariant[inc.severity] ?? 'default'}>
                        {inc.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 max-w-[300px]">
                      {inc.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge
                        variant={
                          inc.status === 'resolved' ? 'success' : 'warning'
                        }
                      >
                        {inc.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-[250px]">
                      {inc.resolution || '—'}
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
