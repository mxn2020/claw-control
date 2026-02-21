import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/compliance/exports')({ component: ComplianceExports })
function ComplianceExports() {
  const logs = useQuery(api.auditLogs.list, { limit: 10 })
  const entries = logs ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Data Exports</h1><p className="text-sm text-slate-400 mt-1">Export data for compliance and regulatory requirements</p></div>
      <Card><CardHeader><CardTitle>Recent Export Activity</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {entries.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No export activity. Use the export tools to generate compliance reports.</p>}
          {entries.map(e => (
            <div key={e._id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-300">{e.action} — {e.resourceType}</span>
              <span className="text-xs text-slate-500">{new Date(e.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
