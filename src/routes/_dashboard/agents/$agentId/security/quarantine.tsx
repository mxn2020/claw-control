import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/security/quarantine')({ component: AgentSecurityQuarantine })
function AgentSecurityQuarantine() {
  const skills = useQuery(api.platform.list, {})
  const quarantined = (skills ?? []).filter(s => !s.isEnabled && s.riskLevel === 'critical')
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Quarantine</h1><p className="text-sm text-slate-400 mt-1">{quarantined.length} items quarantined</p></div>
      <Card><CardHeader><CardTitle>Quarantined Items</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {quarantined.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No quarantined items. All clear.</p>}
          {quarantined.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-red-700/30 bg-red-900/10 p-4">
              <div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version} · Risk: critical</p></div>
              <Badge variant="danger">quarantined</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
