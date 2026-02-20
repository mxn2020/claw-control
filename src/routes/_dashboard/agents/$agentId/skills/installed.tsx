import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Puzzle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/skills/installed')({ component: AgentSkillsInstalled })

function AgentSkillsInstalled() {
  const skills = useQuery(api.platform.list, {})
  const installed = (skills ?? []).filter(s => s.isEnabled)
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Installed Skills</h1><p className="text-sm text-slate-400 mt-1">{installed.length} skills installed</p></div>
      <Card><CardHeader><CardTitle>Skills</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {installed.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No installed skills.</p>}
          {installed.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div className="flex items-center gap-3"><Puzzle className="w-5 h-5 text-slate-400" /><div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version}</p></div></div>
              <Badge variant="success">installed</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
