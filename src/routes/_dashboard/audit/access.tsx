import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ShieldCheck, Clock } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/audit/access')({
  component: AuditAccess,
})

const mockAccessEntries = [
  {
    id: 1,
    timestamp: '2025-01-15 10:32:14 UTC',
    user: 'admin@acme.co',
    ip: '203.0.113.42',
    action: 'login',
    resource: 'Dashboard',
  },
  {
    id: 2,
    timestamp: '2025-01-15 09:18:02 UTC',
    user: 'ops@acme.co',
    ip: '198.51.100.17',
    action: 'view',
    resource: 'Fleet / Instances',
  },
  {
    id: 3,
    timestamp: '2025-01-14 16:45:31 UTC',
    user: 'dev@acme.co',
    ip: '192.0.2.88',
    action: 'api_call',
    resource: 'POST /agents/deploy',
  },
  {
    id: 4,
    timestamp: '2025-01-14 14:22:10 UTC',
    user: 'admin@acme.co',
    ip: '203.0.113.42',
    action: 'update',
    resource: 'Settings / API Keys',
  },
  {
    id: 5,
    timestamp: '2025-01-14 11:05:44 UTC',
    user: 'viewer@acme.co',
    ip: '10.0.0.5',
    action: 'view',
    resource: 'Observe / Logs',
  },
]

function AuditAccess() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Access Log</h1>
        <p className="text-sm text-slate-400 mt-1">
          Who accessed the control plane — timestamps, users, IPs, and actions
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Logins (24h)</span>
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">38</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Unique Users</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">12</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Avg Session</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">24m</span>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Recent Access</CardTitle>
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
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Resource
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAccessEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 text-white whitespace-nowrap">
                      {entry.user}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-mono text-xs">
                      {entry.ip}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{entry.action}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {entry.resource}
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
