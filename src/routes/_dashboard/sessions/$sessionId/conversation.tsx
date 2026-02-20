import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Bot,
  User,
  Settings,
  MessageSquare,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/sessions/$sessionId/conversation',
)({
  component: SessionConversation,
})

const roleConfig = {
  user: { icon: User, bg: 'bg-slate-700', bubble: 'bg-cyan-600/20 text-slate-200', label: 'User' },
  assistant: { icon: Bot, bg: 'bg-cyan-600/20', bubble: 'bg-slate-800 text-slate-200', label: 'Agent' },
  system: { icon: Settings, bg: 'bg-amber-600/20', bubble: 'bg-amber-900/30 text-amber-200 border border-amber-700/40', label: 'System' },
  tool: { icon: Settings, bg: 'bg-purple-600/20', bubble: 'bg-purple-900/30 text-purple-200 border border-purple-700/40', label: 'Tool' },
}

function SessionConversation() {
  const { sessionId } = Route.useParams()
  const session = useQuery(api.sessions.get, { id: sessionId as Id<"sessions"> })
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []

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
            {session?.title ?? 'Untitled'} — {msgList.length} messages
          </p>
        </div>
        <Badge variant={session?.status === 'active' ? 'success' : 'info'}>{session?.status ?? '…'}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Messages */}
        <div className="lg:col-span-3 space-y-4">
          {msgList.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Bot className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p>No messages yet.</p>
            </div>
          )}
          {msgList.map((msg) => {
            const config = roleConfig[msg.role as keyof typeof roleConfig] ?? roleConfig.system
            const Icon = config.icon
            return (
              <div
                key={msg._id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}
                >
                  <Icon
                    className={`w-4 h-4 ${msg.role === 'assistant'
                        ? 'text-cyan-400'
                        : msg.role === 'system' || msg.role === 'tool'
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
                  <span className="text-xs text-slate-500 mt-1 block">
                    {new Date(msg.createdAt).toLocaleString()}
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
                <p className="text-sm text-white">{msgList.length}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Participants</span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {[...new Set(msgList.map(m => m.role))].map(role => (
                    <Badge key={role} variant={role === 'assistant' ? 'info' : role === 'system' ? 'warning' : 'default'}>
                      {role}
                    </Badge>
                  ))}
                  {msgList.length === 0 && <span className="text-xs text-slate-500">—</span>}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Status</span>
                <div className="mt-1">
                  <Badge variant={session?.status === 'active' ? 'success' : 'default'}>
                    {session?.status ?? '…'}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Tokens</span>
                <p className="text-sm text-white">
                  {msgList.reduce((s, m) => s + (m.tokens ?? 0), 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
