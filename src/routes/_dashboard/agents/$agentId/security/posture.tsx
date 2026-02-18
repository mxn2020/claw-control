import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/security/posture',
)({
  component: AgentSecurityPosture,
})

const postureScore = 82

const mockChecks = [
  { name: 'Sandbox enabled', status: 'pass', detail: 'Running in sandboxed mode' },
  { name: 'Tool policy active', status: 'pass', detail: '3 policies enforced' },
  { name: 'Skill permissions', status: 'warn', detail: '1 high-risk skill enabled' },
  { name: 'Memory encryption', status: 'pass', detail: 'AES-256 at rest' },
  { name: 'Rate limiting', status: 'pass', detail: '60 req/min enforced' },
  { name: 'Audit logging', status: 'pass', detail: 'All events captured' },
]

function AgentSecurityPosture() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/security"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Security
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Posture</h1>
          <p className="text-sm text-slate-400 mt-1">
            Security posture overview for agent {agentId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <Badge variant={postureScore >= 80 ? 'success' : postureScore >= 60 ? 'warning' : 'danger'}>
            Score: {postureScore}/100
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posture Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockChecks.map((check) => (
              <div
                key={check.name}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {check.status === 'pass' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="text-sm text-white">{check.name}</span>
                </div>
                <span className="text-xs text-slate-400">{check.detail}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
