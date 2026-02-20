import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Search, FileText } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/observe/logs')({
  component: ObserveLogs,
})

function ObserveLogs() {
  const logs = useQuery(api.auditLogs.list, { limit: 50 })
  const entries = logs ?? []

  const levelVariant = (action: string) => {
    if (action.includes('error') || action.includes('fail')) return 'danger' as const
    if (action.includes('warn') || action.includes('quarantine')) return 'warning' as const
    if (action.includes('create') || action.includes('start')) return 'info' as const
    return 'default' as const
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Logs</h1>
        <p className="text-sm text-slate-400 mt-1">Structured log viewer across all agents and instances</p>
      </div>

      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="flex-1 bg-transparent border-none text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Log Stream</CardTitle>
            <span className="text-xs text-slate-500 ml-2">Showing {entries.length} entries</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Resource</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">No log entries.</td></tr>
                )}
                {entries.map((log) => (
                  <tr key={log._id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={levelVariant(log.action)}>{log.action}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{log.resourceType}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{log.details ?? '—'}</td>
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
