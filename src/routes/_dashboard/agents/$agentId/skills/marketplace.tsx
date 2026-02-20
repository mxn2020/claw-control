import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Puzzle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/skills/marketplace')({ component: AgentSkillsMarketplace })

function AgentSkillsMarketplace() {
  const skills = useQuery(api.platform.list, {})
  const available = (skills ?? []).filter(s => !s.isEnabled)
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Skill Marketplace</h1><p className="text-sm text-slate-400 mt-1">{available.length} skills available to install</p></div>
      <Card><CardHeader><CardTitle>Available Skills</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {available.length === 0 && <p className="text-sm text-slate-500 text-center py-6">All skills are already installed.</p>}
          {available.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div className="flex items-center gap-3"><Puzzle className="w-5 h-5 text-slate-400" /><div><span className="text-sm font-medium text-white">{s.name}</span><p className="text-xs text-slate-400">{s.description ?? 'No description'} · v{s.version}</p></div></div>
              <Badge variant="default">available</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
