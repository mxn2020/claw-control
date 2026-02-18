import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, FileText } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/tools/policies',
)({
  component: AgentToolsPolicies,
})

const mockPolicies = [
  {
    id: 'p1',
    name: 'No external writes',
    scope: 'agent',
    status: 'active',
    rule: 'deny write:* where target.external == true',
  },
  {
    id: 'p2',
    name: 'Rate-limit exec',
    scope: 'agent',
    status: 'active',
    rule: 'limit exec to 10 calls/minute',
  },
  {
    id: 'p3',
    name: 'Browser allow-list',
    scope: 'inherited',
    status: 'active',
    rule: 'allow browser where url.domain in [approved_domains]',
  },
]

function AgentToolsPolicies() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/tools"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Tool Policies</h1>
        <p className="text-sm text-slate-400 mt-1">
          Agent-scoped policy fences for {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <CardTitle>Active Policies</CardTitle>
          </div>
          <CardDescription>
            Policies evaluated before every tool call for this agent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPolicies.map((policy) => (
              <div
                key={policy.id}
                className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{policy.name}</span>
                    <Badge variant={policy.scope === 'agent' ? 'info' : 'default'}>
                      {policy.scope}
                    </Badge>
                  </div>
                  <Badge variant="success">{policy.status}</Badge>
                </div>
                <code className="text-xs text-slate-400 font-mono bg-slate-800 rounded px-2 py-1 block">
                  {policy.rule}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
