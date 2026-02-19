import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Inbox, MessageSquare } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/sessions/inbox',
)({
  component: AgentSessionsInbox,
})

const mockSessions = [
  { id: 'sess_901', user: 'user_42', subject: 'Billing inquiry', status: 'active', lastMessage: '2 min ago', messages: 8 },
  { id: 'sess_898', user: 'user_17', subject: 'Account reset request', status: 'idle', lastMessage: '15 min ago', messages: 4 },
  { id: 'sess_887', user: 'user_83', subject: 'Product question', status: 'closed', lastMessage: '1 hour ago', messages: 12 },
  { id: 'sess_881', user: 'user_56', subject: 'Refund request', status: 'closed', lastMessage: '3 hours ago', messages: 6 },
]

const statusVariant = (status: string) => {
  if (status === 'active') return 'success' as const
  if (status === 'idle') return 'warning' as const
  return 'default' as const
}

function AgentSessionsInbox() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/sessions"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sessions
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Sessions Inbox</h1>
        <p className="text-sm text-slate-400 mt-1">
          All sessions for agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-cyan-400" />
              <CardTitle>Sessions</CardTitle>
            </div>
            <Badge variant="info">{mockSessions.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSessions.map((session) => (
              <Link
                key={session.id}
                to="/agents/$agentId/sessions/$sessionId"
                params={{ agentId, sessionId: session.id }}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{session.subject}</div>
                    <div className="text-xs text-slate-400">{session.user} · {session.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default">{session.messages} msgs</Badge>
                  <Badge variant={statusVariant(session.status)}>{session.status}</Badge>
                  <span className="text-xs text-slate-400">{session.lastMessage}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
