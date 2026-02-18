import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Puzzle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/skills/installed',
)({
  component: AgentSkillsInstalled,
})

const mockInstalled = [
  { id: 'sk_1', name: 'Knowledge Base Search', version: '1.2.0', risk: 'low', enabled: true },
  { id: 'sk_2', name: 'Ticket Creation', version: '2.0.1', risk: 'low', enabled: true },
  { id: 'sk_3', name: 'Billing Refund', version: '1.0.4', risk: 'high', enabled: true },
  { id: 'sk_4', name: 'Email Compose', version: '1.1.0', risk: 'medium', enabled: false },
  { id: 'sk_5', name: 'Sentiment Analysis', version: '3.0.0', risk: 'low', enabled: true },
]

const riskVariant = (risk: string) => {
  if (risk === 'high') return 'danger' as const
  if (risk === 'medium') return 'warning' as const
  return 'success' as const
}

function AgentSkillsInstalled() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/skills"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Skills
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Installed Skills</h1>
        <p className="text-sm text-slate-400 mt-1">
          Skills installed on agent {agentId} — manage versions and toggles
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-cyan-400" />
              <CardTitle>Installed Skills</CardTitle>
            </div>
            <Badge variant="info">{mockInstalled.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockInstalled.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Puzzle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs text-slate-400 ml-2">v{skill.version}</span>
                  </div>
                  <Badge variant={riskVariant(skill.risk)}>{skill.risk} risk</Badge>
                </div>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    skill.enabled ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      skill.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
