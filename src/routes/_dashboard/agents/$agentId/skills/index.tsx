import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Puzzle,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/skills/',
)({
  component: AgentSkills,
})

const mockSkills = [
  {
    id: 'sk_1',
    name: 'Knowledge Base Search',
    inherited: true,
    permissions: ['read:docs', 'search:index'],
    status: 'active' as const,
  },
  {
    id: 'sk_2',
    name: 'Ticket Creation',
    inherited: true,
    permissions: ['write:tickets', 'read:users'],
    status: 'active' as const,
  },
  {
    id: 'sk_3',
    name: 'Billing Refund',
    inherited: false,
    permissions: ['write:billing', 'read:transactions', 'execute:refund'],
    status: 'active' as const,
  },
  {
    id: 'sk_4',
    name: 'Email Compose',
    inherited: false,
    permissions: ['write:email', 'read:templates'],
    status: 'inactive' as const,
  },
  {
    id: 'sk_5',
    name: 'Sentiment Analysis',
    inherited: true,
    permissions: ['read:messages'],
    status: 'active' as const,
  },
]

function AgentSkills() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Puzzle className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Skills</h1>
          </div>
          <p className="text-sm text-slate-400">
            Skills installed on agent {agentId}
          </p>
        </div>
        <Link
          to="/skills/marketplace"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Marketplace
        </Link>
      </div>

      {/* Skills list */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Installed Skills</CardTitle>
            <Badge variant="info">{mockSkills.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSkills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">
                      {skill.name}
                    </span>
                    <Badge
                      variant={skill.inherited ? 'default' : 'info'}
                    >
                      {skill.inherited ? 'inherited' : 'agent-specific'}
                    </Badge>
                  </div>
                  <Badge
                    variant={skill.status === 'active' ? 'success' : 'warning'}
                  >
                    {skill.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  <div className="flex gap-1.5 flex-wrap">
                    {skill.permissions.map((perm) => (
                      <Badge key={perm} variant="outline">
                        {perm}
                      </Badge>
                    ))}
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
