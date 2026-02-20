import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { ClipboardList, ShieldCheck, Wrench, Settings2, UserCog } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/audit/')({
  component: AuditPage,
})

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

const actionIcons: Record<string, React.ReactNode> = {
  tool_call: <Wrench className="w-3.5 h-3.5 text-cyan-400" />,
  config_change: <Settings2 className="w-3.5 h-3.5 text-amber-400" />,
  auth: <UserCog className="w-3.5 h-3.5 text-emerald-400" />,
  security: <ShieldCheck className="w-3.5 h-3.5 text-red-400" />,
}

function AuditPage() {
  const logs = useQuery(api.auditLogs.list, {})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        <p className="text-sm text-slate-400 mt-1">Chronological record of all agent and system activity</p>
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {logs === undefined ? (
              <p className="text-sm text-slate-500 py-6 text-center">Loading audit events...</p>
            ) : logs.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">No audit events recorded yet.</p>
            ) : (
              logs.map((log) => (
                <div key={log._id} className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0">
                  <div className="mt-0.5 flex-shrink-0">
                    {actionIcons[log.resourceType] ?? <ClipboardList className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-medium text-white">{log.action}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{log.resourceType}</span>
                      {log.resourceId && (
                        <code className="text-xs text-slate-500 font-mono">{log.resourceId}</code>
                      )}
                    </div>
                    {log.details && <p className="text-xs text-slate-400 truncate">{log.details}</p>}
                    <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                      {log.userId && <span>{log.userId}</span>}
                      <span>{formatTime(log.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
