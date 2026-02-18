import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, MessageSquare, User, Bot } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/sessions/$sessionId',
)({
  component: AgentSessionDetail,
})

const mockMessages = [
  { id: 'm1', role: 'user', content: 'Hi, I have a billing question about my last invoice.', time: '14:20:00' },
  { id: 'm2', role: 'assistant', content: 'Of course! I can help with that. Could you share your account ID or invoice number?', time: '14:20:05' },
  { id: 'm3', role: 'user', content: 'My account is ACC-00142. Invoice from December 15th.', time: '14:21:00' },
  { id: 'm4', role: 'assistant', content: 'Let me look that up for you... I can see invoice INV-2024-0892 for $48.00. What would you like to know?', time: '14:21:08' },
  { id: 'm5', role: 'user', content: 'I think I was charged twice for the same item.', time: '14:22:00' },
  { id: 'm6', role: 'assistant', content: 'I see what you mean — there are two line items for "Pro Plan Add-on". I\'m flagging this for a refund review. Is that okay?', time: '14:22:15' },
]

function AgentSessionDetail() {
  const { agentId, sessionId } = Route.useParams()

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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Session Detail</h1>
          <p className="text-sm text-slate-400 mt-1">{sessionId} · agent {agentId}</p>
        </div>
        <Badge variant="success">active</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <CardTitle>Conversation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-cyan-600'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] rounded-lg px-4 py-2.5 text-sm ${
                  msg.role === 'user'
                    ? 'bg-slate-700 text-white'
                    : 'bg-cyan-900/50 border border-cyan-700/30 text-white'
                }`}>
                  <p>{msg.content}</p>
                  <p className="text-xs text-slate-400 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
