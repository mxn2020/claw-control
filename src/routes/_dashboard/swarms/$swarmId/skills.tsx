import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/skills')({
  component: SwarmSkills,
})

function SwarmSkills() {
  const { swarmId } = Route.useParams()
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Skills</h1>
        <p className="text-sm text-slate-400 mt-1">Skill operations across all instances in swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installed Skills ({skillList.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No skills found.</p>
            )}
            {skillList.map((skill) => (
              <div key={skill._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div>
                  <span className="font-mono text-sm text-white">{skill.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">v{skill.version} · {skill.description ?? 'No description'}</p>
                </div>
                <Badge variant={skill.isEnabled ? 'success' : 'default'}>{skill.isEnabled ? 'enabled' : 'disabled'}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
