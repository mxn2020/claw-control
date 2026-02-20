import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/skills/permissions')({ component: AgentSkillsPermissions })

function AgentSkillsPermissions() {
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Skill Permissions</h1><p className="text-sm text-slate-400 mt-1">Manage permissions for {skillList.length} skills</p></div>
      <Card><CardHeader><CardTitle>Permission Matrix</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {skillList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No skills found.</p>}
          {skillList.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">Risk: {s.riskLevel ?? 'unknown'}</p></div>
              <div className="flex gap-2">
                <Badge variant={s.isEnabled ? 'success' : 'danger'}>{s.isEnabled ? 'allowed' : 'denied'}</Badge>
                <Badge variant="info">v{s.version}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
