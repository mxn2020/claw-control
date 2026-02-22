import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/skills/installed')({
  component: SkillsInstalled,
})

function SkillsInstalled() {
  const { user } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convexApi = api as Record<string, any>
  const skills = useQuery(convexApi.skills?.listInstalled ?? null, user?.orgId ? { orgId: user.orgId as Id<"organizations"> } : 'skip')
  const skillList = (skills ?? []).filter((s: any) => s.isEnabled)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Installed Skills</h1>
        <p className="text-sm text-slate-400 mt-1">{skillList.length} active skills across your fleet</p>
      </div>

      {skillList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillList.map((skill) => (
            <Card key={skill._id} className="hover:border-cyan-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{skill.name}</CardTitle>
                  <Badge variant={skill.riskLevel === 'critical' ? 'danger' : skill.riskLevel === 'high' ? 'warning' : 'success'}>
                    {skill.riskLevel ?? 'low'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-400 mb-2">{skill.description ?? 'No description'}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>v{skill.version}</span>
                  <span>{skill.author ?? 'Unknown'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-slate-500">No skills installed. Browse the marketplace to add skills.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
