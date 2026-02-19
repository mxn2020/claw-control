import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/memory/health',
)({
  component: AgentMemoryHealth,
})

const healthScore = 87

const mockConflicts = [
  {
    id: 'c1',
    factA: 'User prefers detailed explanations',
    factB: 'User prefers concise responses',
    sourceA: 'session_842',
    sourceB: 'session_901',
    severity: 'medium',
  },
]

const mockChecks = [
  { name: 'Duplicate facts', status: 'pass', detail: 'No duplicates found' },
  { name: 'Stale entries', status: 'pass', detail: 'All entries < 90 days old' },
  { name: 'Contradictions', status: 'fail', detail: '1 conflict detected' },
  { name: 'Embedding coverage', status: 'pass', detail: '98% of facts indexed' },
]

function AgentMemoryHealth() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/memory"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Memory
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Memory Health</h1>
          <p className="text-sm text-slate-400 mt-1">
            Conflict detector and health score for agent {agentId}
          </p>
        </div>
        <Badge variant={healthScore >= 80 ? 'success' : healthScore >= 60 ? 'warning' : 'danger'}>
          Health: {healthScore}%
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <CardTitle>Health Checks</CardTitle>
          </div>
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle>Conflicts</CardTitle>
          </div>
          <CardDescription>Contradictions detected between stored facts.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockConflicts.length === 0 ? (
            <p className="text-sm text-slate-400">No conflicts detected.</p>
          ) : (
            <div className="space-y-3">
              {mockConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Fact A ({conflict.sourceA})</div>
                      <div className="text-sm text-white">{conflict.factA}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Fact B ({conflict.sourceB})</div>
                      <div className="text-sm text-white">{conflict.factB}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors">Keep A</button>
                    <button type="button" className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors">Keep B</button>
                    <button type="button" className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
