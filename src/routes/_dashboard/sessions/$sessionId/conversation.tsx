import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Bot,
  User,
  Settings,
  MessageSquare,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/sessions/$sessionId/conversation',
)({
  component: SessionConversation,
})

const mockMessages = [
  {
    id: 1,
    role: 'user' as const,
    content: 'Hi, I need help with my billing. I was charged twice this month.',
    timestamp: '2024-01-15 10:32:01 AM',
  },
  {
    id: 2,
    role: 'assistant' as const,
    content:
      'I can see your account. Let me look into the duplicate charge. I found two transactions on Jan 15th — one for $29.99 and another for $29.99. The second one appears to be a duplicate.',
    timestamp: '2024-01-15 10:32:14 AM',
    toolCalls: ['lookup_account', 'list_transactions'],
  },
  {
    id: 3,
    role: 'system' as const,
    content: 'Policy engine: billing refund flow activated.',
    timestamp: '2024-01-15 10:32:15 AM',
  },
  {
    id: 4,
    role: 'user' as const,
    content: 'Yes, exactly. Can you refund the extra one?',
    timestamp: '2024-01-15 10:33:02 AM',
  },
  {
    id: 5,
    role: 'assistant' as const,
    content:
      "I've initiated a refund for the duplicate charge of $29.99. It should appear in your account within 3-5 business days. Is there anything else I can help with?",
    timestamp: '2024-01-15 10:34:11 AM',
    toolCalls: ['initiate_refund'],
  },
  {
    id: 6,
    role: 'user' as const,
    content: "No, that's all. Thanks!",
    timestamp: '2024-01-15 10:34:30 AM',
  },
]

const roleConfig = {
  user: { icon: User, bg: 'bg-slate-700', bubble: 'bg-cyan-600/20 text-slate-200', label: 'User' },
  assistant: { icon: Bot, bg: 'bg-cyan-600/20', bubble: 'bg-slate-800 text-slate-200', label: 'Agent' },
  system: { icon: Settings, bg: 'bg-amber-600/20', bubble: 'bg-amber-900/30 text-amber-200 border border-amber-700/40', label: 'System' },
}

function SessionConversation() {
  const { sessionId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Conversation</h1>
          </div>
          <p className="text-sm text-slate-400">
            Full thread for session {sessionId}
          </p>
        </div>
        <Badge variant="info">{mockMessages.length} messages</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Messages */}
        <div className="lg:col-span-3 space-y-4">
          {mockMessages.map((msg) => {
            const config = roleConfig[msg.role]
            const Icon = config.icon
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      msg.role === 'assistant'
                        ? 'text-cyan-400'
                        : msg.role === 'system'
                          ? 'text-amber-400'
                          : 'text-slate-300'
                    }`}
                  />
                </div>
                <div className={`max-w-[70%] rounded-xl px-4 py-3 ${config.bubble}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-400">
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  {'toolCalls' in msg && msg.toolCalls && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {msg.toolCalls.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <span className="text-xs text-slate-500 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Thread Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-xs text-slate-400">Messages</span>
                <p className="text-sm text-white">{mockMessages.length}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Participants</span>
                <div className="flex gap-1 mt-1">
                  <Badge variant="default">User</Badge>
                  <Badge variant="info">Agent</Badge>
                  <Badge variant="warning">System</Badge>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Duration</span>
                <p className="text-sm text-white">2m 29s</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Status</span>
                <div className="mt-1">
                  <Badge variant="success">completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
