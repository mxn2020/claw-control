import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Lock, AlertTriangle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/security/quarantine',
)({
  component: AgentSecurityQuarantine,
})

const quarantineStatus = {
  active: false,
  reason: null as string | null,
  since: null as string | null,
}

const mockHistory = [
  { id: 'q1', reason: 'Anomalous tool usage pattern', since: 'Dec 14, 2024', lifted: 'Dec 14, 2024', duration: '2h' },
  { id: 'q2', reason: 'Rate limit violation spike', since: 'Nov 28, 2024', lifted: 'Nov 28, 2024', duration: '30m' },
]

function AgentSecurityQuarantine() {
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
        <h1 className="text-2xl font-bold text-white">Quarantine</h1>
        <p className="text-sm text-slate-400 mt-1">
          Quarantine status and controls for agent {agentId}
        </p>
      </div>

      <Card className={quarantineStatus.active ? 'border-red-500/50' : ''}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <CardTitle>Quarantine Status</CardTitle>
            </div>
            <Badge variant={quarantineStatus.active ? 'danger' : 'success'}>
              {quarantineStatus.active ? 'quarantined' : 'clear'}
            </Badge>
          </div>
          <CardDescription>
            When quarantined, the agent is suspended from processing new sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quarantineStatus.active ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Agent is quarantined</span>
                </div>
                <p className="text-sm text-slate-300">Reason: {quarantineStatus.reason}</p>
                <p className="text-xs text-slate-400 mt-1">Since: {quarantineStatus.since}</p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
              >
                Lift Quarantine
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Agent is operating normally.</p>
              <button
                type="button"
                className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Quarantine Agent
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quarantine History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3"
              >
                <div>
                  <div className="text-sm text-white">{entry.reason}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{entry.since} — lifted {entry.lifted}</div>
                </div>
                <Badge variant="default">{entry.duration}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
