import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/skills/permissions',
)({
  component: AgentSkillsPermissions,
})

const mockPermissions = [
  {
    skill: 'Knowledge Base Search',
    permissions: [
      { name: 'filesystem', access: 'read', granted: true },
      { name: 'network', access: 'none', granted: false },
    ],
  },
  {
    skill: 'Ticket Creation',
    permissions: [
      { name: 'filesystem', access: 'none', granted: false },
      { name: 'network', access: 'write', granted: true },
    ],
  },
  {
    skill: 'Billing Refund',
    permissions: [
      { name: 'filesystem', access: 'none', granted: false },
      { name: 'network', access: 'read/write', granted: true },
    ],
  },
  {
    skill: 'Email Compose',
    permissions: [
      { name: 'filesystem', access: 'none', granted: false },
      { name: 'network', access: 'write', granted: true },
    ],
  },
]

function AgentSkillsPermissions() {
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
        <h1 className="text-2xl font-bold text-white">Skill Permissions</h1>
        <p className="text-sm text-slate-400 mt-1">
          Filesystem and network access granted to each skill on agent {agentId}
        </p>
      </div>

      <div className="space-y-4">
        {mockPermissions.map((entry) => (
          <Card key={entry.skill}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <CardTitle className="text-base">{entry.skill}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {entry.permissions.map((perm) => (
                  <div
                    key={perm.name}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
                  >
                    <span className="text-sm text-slate-300 capitalize">{perm.name}</span>
                    <Badge variant={perm.granted ? 'warning' : 'default'}>
                      {perm.access === 'none' ? 'no access' : perm.access}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
