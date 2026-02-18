import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  MessageSquare,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/sessions',
)({
  component: InstanceSessions,
})

const mockSessions = [
  { id: 'sess-001', agent: 'support-agent', status: 'active' as const, messageCount: 14, channel: 'Discord', timestamp: '2025-01-10 14:32 UTC' },
  { id: 'sess-002', agent: 'eng-agent', status: 'completed' as const, messageCount: 8, channel: 'Slack', timestamp: '2025-01-10 13:45 UTC' },
  { id: 'sess-003', agent: 'general-agent', status: 'escalated' as const, messageCount: 22, channel: 'WebChat', timestamp: '2025-01-10 12:18 UTC' },
  { id: 'sess-004', agent: 'support-agent', status: 'active' as const, messageCount: 5, channel: 'WebChat', timestamp: '2025-01-10 14:50 UTC' },
  { id: 'sess-005', agent: 'billing-agent', status: 'completed' as const, messageCount: 11, channel: 'Discord', timestamp: '2025-01-10 10:05 UTC' },
  { id: 'sess-006', agent: 'eng-agent', status: 'escalated' as const, messageCount: 31, channel: 'GitHub', timestamp: '2025-01-09 22:40 UTC' },
]

const statusVariant: Record<string, 'success' | 'info' | 'warning'> = {
  active: 'success',
  completed: 'info',
  escalated: 'warning',
}

function InstanceSessions() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active &amp; Recent Sessions</CardTitle>
            <Badge variant="info">{mockSessions.length} sessions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">{session.id}</span>
                      <Badge variant={statusVariant[session.status]}>
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {session.agent} · {session.channel} · {session.messageCount} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {session.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
