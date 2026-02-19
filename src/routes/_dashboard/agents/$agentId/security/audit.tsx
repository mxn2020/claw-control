import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, ScrollText } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/security/audit',
)({
  component: AgentSecurityAudit,
})

const mockAuditLog = [
  { id: 'a1', action: 'tool.call', actor: 'agent', detail: 'exec: ls -la', risk: 'low', time: '14:23:04' },
  { id: 'a2', action: 'policy.deny', actor: 'policy-engine', detail: 'no external writes — denied write:/etc/hosts', risk: 'medium', time: '14:23:18' },
  { id: 'a3', action: 'memory.write', actor: 'agent', detail: 'injected fact: user is VIP', risk: 'low', time: '13:50:00' },
  { id: 'a4', action: 'config.change', actor: 'admin', detail: 'sandbox mode changed: off → on', risk: 'low', time: '12:00:00' },
  { id: 'a5', action: 'skill.enable', actor: 'admin', detail: 'enabled: Billing Refund', risk: 'high', time: 'Jan 9, 10:00' },
]

const riskVariant = (risk: string) => {
  if (risk === 'high') return 'danger' as const
  if (risk === 'medium') return 'warning' as const
  return 'default' as const
}

function AgentSecurityAudit() {
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

      <div>
        <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        <p className="text-sm text-slate-400 mt-1">
          Security-relevant events for agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-cyan-400" />
            <CardTitle>Audit Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockAuditLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={riskVariant(entry.risk)}>{entry.risk}</Badge>
                  <div>
                    <span className="text-sm font-mono text-white">{entry.action}</span>
                    <span className="text-xs text-slate-400 ml-2">by {entry.actor}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs text-slate-400 truncate max-w-48 hidden sm:block">{entry.detail}</span>
                  <span className="text-xs text-slate-500 shrink-0">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
