import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/scan/quarantine')({ component: SkillScanQuarantine })
function SkillScanQuarantine() {
  const skills = useQuery(api.platform.list, {})
  const quarantined = (skills ?? []).filter(s => !s.isEnabled && s.riskLevel === 'critical')
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Quarantine</h1><p className="text-sm text-slate-400 mt-1">{quarantined.length} skills quarantined</p></div>
      <Card><CardHeader><CardTitle>Quarantined Skills</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {quarantined.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No quarantined skills. All skills are healthy.</p>}
          {quarantined.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-red-700/30 bg-red-900/10 p-4">
              <div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version} · {s.description ?? 'No description'}</p></div>
              <Badge variant="danger">quarantined</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
