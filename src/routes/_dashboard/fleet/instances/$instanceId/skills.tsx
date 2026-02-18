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

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/skills',
)({
  component: InstanceSkills,
})

const mockSkills = [
  { id: 'sk-1', name: 'Web Search', version: '1.4.0', risk: 'low' as const, agentsUsing: 5 },
  { id: 'sk-2', name: 'Code Execution', version: '2.1.3', risk: 'high' as const, agentsUsing: 3 },
  { id: 'sk-3', name: 'Database Query', version: '1.0.2', risk: 'medium' as const, agentsUsing: 4 },
  { id: 'sk-4', name: 'Email Sender', version: '0.9.1', risk: 'medium' as const, agentsUsing: 2 },
  { id: 'sk-5', name: 'File Manager', version: '1.2.0', risk: 'high' as const, agentsUsing: 6 },
  { id: 'sk-6', name: 'Knowledge Base', version: '3.0.0', risk: 'low' as const, agentsUsing: 7 },
]

const riskVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
}

function InstanceSkills() {
  const { instanceId } = Route.useParams()

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
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Installed Skills</CardTitle>
            <Badge variant="info">{mockSkills.length} installed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Puzzle className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <Badge variant="info">v{skill.version}</Badge>
                      <Badge variant={riskVariant[skill.risk]}>
                        <Shield className="w-3 h-3 mr-1" />
                        {skill.risk} risk
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Used by {skill.agentsUsing} agents
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
