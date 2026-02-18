import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Puzzle, Download } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/skills/marketplace',
)({
  component: AgentSkillsMarketplace,
})

const mockAvailable = [
  { id: 'mk_1', name: 'Calendar Integration', category: 'productivity', risk: 'low', installs: 1240 },
  { id: 'mk_2', name: 'CRM Sync', category: 'crm', risk: 'medium', installs: 876 },
  { id: 'mk_3', name: 'Code Executor', category: 'dev', risk: 'high', installs: 532 },
  { id: 'mk_4', name: 'PDF Summarizer', category: 'documents', risk: 'low', installs: 2100 },
  { id: 'mk_5', name: 'Slack Notifier', category: 'comms', risk: 'low', installs: 1880 },
  { id: 'mk_6', name: 'SQL Query Runner', category: 'data', risk: 'high', installs: 310 },
]

const riskVariant = (risk: string) => {
  if (risk === 'high') return 'danger' as const
  if (risk === 'medium') return 'warning' as const
  return 'success' as const
}

function AgentSkillsMarketplace() {
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
        <h1 className="text-2xl font-bold text-white">Skill Marketplace</h1>
        <p className="text-sm text-slate-400 mt-1">
          Browse and install skills for agent {agentId}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAvailable.map((skill) => (
          <Card key={skill.id} className="hover:border-cyan-500/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Puzzle className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-sm">{skill.name}</CardTitle>
                </div>
                <Badge variant={riskVariant(skill.risk)}>{skill.risk} risk</Badge>
              </div>
              <Badge variant="default">{skill.category}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{skill.installs.toLocaleString()} installs</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded bg-cyan-600 px-3 py-1 text-xs font-medium text-white hover:bg-cyan-500 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Install
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
