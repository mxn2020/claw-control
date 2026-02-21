import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/scan/queue')({ component: SkillScanQueue })
function SkillScanQueue() {
  const skills = useQuery(api.platform.list, {})
  const pending = (skills ?? []).filter(s => !s.isEnabled)
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Scan Queue</h1><p className="text-sm text-slate-400 mt-1">{pending.length} skills pending review</p></div>
      <Card><CardHeader><CardTitle>Pending Scans</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {pending.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No skills pending scan.</p>}
          {pending.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version} · Risk: {s.riskLevel ?? 'unknown'}</p></div>
              <Badge variant="warning">pending</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
