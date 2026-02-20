import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ShieldCheck, Clock } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/audit/access')({
  component: AuditAccess,
})

function AuditAccess() {
  const logs = useQuery(api.auditLogs.list, { limit: 50 })
  const entries = logs ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Access Log</h1>
        <p className="text-sm text-slate-400 mt-1">
          Who accessed the control plane — timestamps, users, and actions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Entries</span>
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{entries.length}</span>
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
            <span className="text-3xl font-bold text-white">
              {new Set(entries.filter(e => e.userId).map(e => e.userId)).size}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Last Activity</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-bold text-white">
              {entries[0] ? new Date(entries[0].createdAt).toLocaleString() : '—'}
            </span>
          </CardContent>
        </Card>
      </div>

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
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Resource</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">No access entries recorded.</td></tr>
                )}
                {entries.map((entry) => (
                  <tr key={entry._id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-white whitespace-nowrap">{entry.userId ?? '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{entry.action}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{entry.resourceType}</td>
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
