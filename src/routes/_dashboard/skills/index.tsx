import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Puzzle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/')({
  component: SkillsOverview,
})

const riskVariant = (level: string) => {
  switch (level) {
    case 'low': return 'success' as const
    case 'medium': return 'warning' as const
    case 'high': return 'danger' as const
    default: return 'default' as const
  }
}

function SkillsOverview() {
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet-wide skill inventory and policies
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillList.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">No skills installed yet.</div>
        )}
        {skillList.map((skill) => (
          <Card key={skill._id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Puzzle className="w-5 h-5 text-cyan-400" />
                  <CardTitle className="text-base">{skill.name}</CardTitle>
                </div>
                <div
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${skill.isEnabled ? 'bg-cyan-600' : 'bg-slate-700'
                    }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${skill.isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">
                {skill.description ?? 'No description'}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">v{skill.version}</span>
                <Badge variant={riskVariant(skill.riskLevel ?? 'low')}>
                  {skill.riskLevel ?? 'low'} risk
                </Badge>
                <span className="text-xs text-slate-500">
                  {skill.isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
