import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { MessageSquare, Clock, Filter } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/sessions/')({
  component: SessionsInbox,
})

const mockSessions = [
  {
    id: 'sess_1',
    title: 'Billing inquiry',
    agentName: 'Support Agent',
    channel: 'WebChat',
    messageCount: 12,
    status: 'active' as const,
    started: '2 min ago',
  },
  {
    id: 'sess_2',
    title: 'API integration help',
    agentName: 'Support Agent',
    channel: 'Discord',
    messageCount: 8,
    status: 'active' as const,
    started: '15 min ago',
  },
  {
    id: 'sess_3',
    title: 'Market analysis Q4',
    agentName: 'Research Agent',
    channel: 'Slack',
    messageCount: 24,
    status: 'closed' as const,
    started: '1 hour ago',
  },
  {
    id: 'sess_4',
    title: 'PR #421 review',
    agentName: 'Code Review Bot',
    channel: 'GitHub',
    messageCount: 6,
    status: 'escalated' as const,
    started: '30 min ago',
  },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success' as const
    case 'closed':
      return 'default' as const
    case 'escalated':
      return 'warning' as const
    default:
      return 'default' as const
  }
}

const channelVariant = (channel: string) => {
  switch (channel) {
    case 'WebChat':
      return 'info' as const
    case 'Discord':
      return 'default' as const
    case 'GitHub':
      return 'outline' as const
    case 'Slack':
      return 'default' as const
    default:
      return 'default' as const
  }
}

function SessionsInbox() {
  const filters = ['All', 'Active', 'Closed', 'Escalated']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">
          All sessions across agents and instances
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === 'All'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-2">
        {mockSessions.map((session) => (
          <Link
            key={session.id}
            to="/sessions/$sessionId"
            params={{ sessionId: session.id }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {session.title}
                        </span>
                        <Badge variant={channelVariant(session.channel)}>
                          {session.channel}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {session.agentName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {session.messageCount}
                    </div>
                    <Badge variant={statusVariant(session.status)}>
                      {session.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {session.started}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
