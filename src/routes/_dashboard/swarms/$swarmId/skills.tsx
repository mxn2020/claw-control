import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/skills')({
  component: SwarmSkills,
})

const mockSkills = [
  { id: 'sk_1', name: 'web-search', version: '1.2.0', enabled: true, instances: 3 },
  { id: 'sk_2', name: 'code-interpreter', version: '2.0.1', enabled: true, instances: 2 },
  { id: 'sk_3', name: 'email-sender', version: '1.0.3', enabled: false, instances: 0 },
  { id: 'sk_4', name: 'file-manager', version: '1.1.0', enabled: true, instances: 3 },
]

function SwarmSkills() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Skills</h1>
        <p className="text-sm text-slate-400 mt-1">Skill operations across all instances in swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installed Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-white">{skill.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">v{skill.version} · {skill.instances} instance(s)</p>
                </div>
                <Badge variant={skill.enabled ? 'success' : 'default'}>{skill.enabled ? 'enabled' : 'disabled'}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
