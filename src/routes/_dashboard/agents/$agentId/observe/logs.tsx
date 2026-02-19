import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, ScrollText } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/observe/logs',
)({
  component: AgentObserveLogs,
})

const mockLogs = [
  { level: 'info', message: 'Session started: sess_901', time: '14:23:01' },
  { level: 'info', message: 'Tool call: exec — ls -la /tmp', time: '14:23:04' },
  { level: 'warn', message: 'Rate limit approaching: 58/60 rpm', time: '14:23:10' },
  { level: 'info', message: 'Chat completion finished — 842 tokens', time: '14:23:12' },
  { level: 'error', message: 'Tool call denied by policy: no external writes', time: '14:23:18' },
  { level: 'info', message: 'Memory lookup completed — 5 facts retrieved', time: '14:23:20' },
  { level: 'info', message: 'Session ended: sess_901', time: '14:24:00' },
]

const levelVariant = (level: string) => {
  if (level === 'error') return 'danger' as const
  if (level === 'warn') return 'warning' as const
  return 'default' as const
}

const levelColor = (level: string) => {
  if (level === 'error') return 'text-red-400'
  if (level === 'warn') return 'text-amber-400'
  return 'text-slate-300'
}

function AgentObserveLogs() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/observe"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Observe
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Logs</h1>
        <p className="text-sm text-slate-400 mt-1">
          Agent-specific log stream for {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-cyan-400" />
            <CardTitle>Log Stream</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs space-y-1.5 max-h-80 overflow-y-auto">
            {mockLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-slate-500 shrink-0">{log.time}</span>
                <Badge variant={levelVariant(log.level)}>{log.level}</Badge>
                <span className={levelColor(log.level)}>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
