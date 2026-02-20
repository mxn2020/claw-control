import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Puzzle,
  Shield,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/skills',
)({
  component: InstanceSkills,
})

const riskVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
}

function InstanceSkills() {
  const { instanceId } = Route.useParams()
  const skills = useQuery(api.platform.list, {})
  const skillList = skills ?? []

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Puzzle className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-sm text-slate-400">{skillList.length} skills installed</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Installed Skills</CardTitle>
            <Badge variant="info">{skillList.length} installed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {skillList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No skills installed yet.</p>
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
                      <Badge variant="info">v{skill.version}</Badge>
                      {skill.riskLevel && (
                        <Badge variant={riskVariant[skill.riskLevel] ?? 'info'}>
                          <Shield className="w-3 h-3 mr-1" />
                          {skill.riskLevel} risk
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {skill.description ?? 'No description'}
                      {skill.author && ` · by ${skill.author}`}
                    </p>
                  </div>
                </div>
                <Badge variant={skill.isEnabled ? 'success' : 'default'}>
                  {skill.isEnabled ? 'enabled' : 'disabled'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
