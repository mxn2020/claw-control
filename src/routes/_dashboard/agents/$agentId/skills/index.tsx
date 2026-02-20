import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Puzzle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/skills/')({
  component: AgentSkillsIndex,
})

function AgentSkillsIndex() {
  const { agentId } = Route.useParams()
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []

  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <p className="text-sm text-slate-400 mt-1">Agent {agentId} — {skillList.length} skills available</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Installed Skills</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {skillList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No skills found.</p>}
            {skillList.map(s => (
              <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div className="flex items-center gap-3">
                  <Puzzle className="w-5 h-5 text-slate-400" />
                  <div>
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <p className="text-xs text-slate-400">{s.description ?? 'No description'} · v{s.version}</p>
                  </div>
                </div>
                <Badge variant={s.isEnabled ? 'success' : 'default'}>{s.isEnabled ? 'enabled' : 'disabled'}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
