import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/personalities/history')({ component: InstancePersonalityHistory })
function InstancePersonalityHistory() {
  const logs = useQuery(api.auditLogs.list, { resourceType: 'config', limit: 20 })
  const entries = logs ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Personality History</h1><p className="text-sm text-slate-400 mt-1">Change log for personality files</p></div>
      <Card><CardHeader><CardTitle>History ({entries.length})</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {entries.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No personality changes recorded.</p>}
          {entries.map(e => (
            <div key={e._id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <div><Badge variant="outline">{e.action}</Badge><span className="text-sm text-slate-300 ml-2">{e.details ?? e.resourceType}</span></div>
              <span className="text-xs text-slate-500">{new Date(e.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
