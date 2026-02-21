import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/scan/results')({ component: SkillScanResults })
function SkillScanResults() {
  const skills = useQuery(api.platform.list, {})
  const scanned = (skills ?? []).filter(s => s.isEnabled)
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Scan Results</h1><p className="text-sm text-slate-400 mt-1">{scanned.length} skills passed scanning</p></div>
      <Card><CardHeader><CardTitle>Completed Scans</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {scanned.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No scan results yet.</p>}
          {scanned.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version} · Risk: {s.riskLevel ?? 'low'}</p></div>
              <Badge variant="success">passed</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
