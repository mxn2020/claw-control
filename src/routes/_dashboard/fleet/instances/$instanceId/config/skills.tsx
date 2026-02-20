import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Puzzle,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/skills',
)({
  component: SkillsConfig,
})

function SkillsConfig() {
  const { instanceId } = Route.useParams()
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []
  const enabledCount = skillList.filter(s => s.isEnabled).length

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/config"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Puzzle className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Skills Configuration</h1>
            <p className="text-sm text-slate-400">{skillList.length} skills available</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Global Skills</CardTitle>
              <CardDescription className="mt-1">
                Skills available to agents on this instance
              </CardDescription>
            </div>
            <Badge variant="info">
              {enabledCount} of {skillList.length} enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {skillList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No skills found.</p>
            )}
            {skillList.map((skill) => (
              <div
                key={skill._id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Puzzle className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <Badge variant={skill.isEnabled ? 'success' : 'danger'}>
                        {skill.isEnabled ? 'enabled' : 'disabled'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{skill.description ?? 'No description'}</p>
                  </div>
                </div>
                <Badge variant="info">v{skill.version}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
