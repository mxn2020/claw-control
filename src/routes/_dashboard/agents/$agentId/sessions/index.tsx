import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  MessageSquare,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/sessions/',
)({
  component: AgentSessions,
})

const mockSessions = [
  {
    id: 'sess_901',
    timestamp: '2024-01-15 10:32 AM',
    status: 'completed' as const,
    messageCount: 14,
    channel: 'Discord',
  },
  {
    id: 'sess_900',
    timestamp: '2024-01-15 10:10 AM',
    status: 'completed' as const,
    messageCount: 6,
    channel: 'Slack',
  },
  {
    id: 'sess_899',
    timestamp: '2024-01-15 09:45 AM',
    status: 'active' as const,
    messageCount: 21,
    channel: 'Web Chat',
  },
  {
    id: 'sess_898',
    timestamp: '2024-01-15 09:20 AM',
    status: 'completed' as const,
    messageCount: 9,
    channel: 'Discord',
  },
  {
    id: 'sess_897',
    timestamp: '2024-01-15 08:55 AM',
    status: 'escalated' as const,
    messageCount: 32,
    channel: 'Web Chat',
  },
  {
    id: 'sess_896',
    timestamp: '2024-01-14 04:12 PM',
    status: 'completed' as const,
    messageCount: 4,
    channel: 'Email',
  },
]

const statusVariant = {
  active: 'success' as const,
  completed: 'default' as const,
  escalated: 'warning' as const,
}

function AgentSessions() {
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
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Sessions</h1>
          </div>
          <p className="text-sm text-slate-400">
            Session inbox for agent {agentId}
          </p>
        </div>
        <Badge variant="info">{mockSessions.length} sessions</Badge>
      </div>

      {/* Sessions list */}
      <Card>
        <CardHeader>
          <CardTitle>All Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSessions.map((session) => (
              <Link
                key={session.id}
                to="/sessions/$sessionId"
                params={{ sessionId: session.id }}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {session.id}
                    </span>
                    <Badge variant="default">{session.channel}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {session.messageCount} msgs
                    </span>
                  </div>
                </div>
                <Badge variant={statusVariant[session.status]}>
                  {session.status}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
