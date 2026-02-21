import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Bot, Plus, Search } from 'lucide-react'
import { useAgents, useSessions } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/chat/')({
  component: ChatIndex,
})

function ChatIndex() {
  const agents = useAgents() ?? []
  const sessions = useSessions() ?? []

  // Group sessions by agent, showing the most recent session per agent
  const agentSessions = agents.map((agent) => {
    const agentSess = sessions
      .filter((s) => s.agentId === agent._id)
      .sort((a, b) => (b.lastMessageAt ?? b._creationTime) - (a.lastMessageAt ?? a._creationTime))
    const latest = agentSess[0]
    return {
      agentId: agent._id,
      agentName: agent.name,
      status: agent.status as 'active' | 'idle' | 'error',
      lastMessage: latest
        ? `${latest.messageCount} messages · ${latest.channel ?? 'direct'}`
        : 'No conversations yet',
      timestamp: latest
        ? new Date(latest.lastMessageAt ?? latest._creationTime).toLocaleString()
        : '',
      hasSession: !!latest,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Chat</h1>
          <p className="text-sm text-slate-400 mt-1">
            Unified inbox across all your agents
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search conversations..."
          className="pl-10"
        />
      </div>

      {/* Conversation List */}
      <div className="space-y-2">
        {agentSessions.length > 0 ? agentSessions.map((conv) => (
          <Link
            key={conv.agentId}
            to="/chat/$agentId"
            params={{ agentId: conv.agentId }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                      <Bot size={18} className="text-cyan-400" />
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-800 ${conv.status === 'active'
                          ? 'bg-emerald-400'
                          : conv.status === 'idle'
                            ? 'bg-amber-400'
                            : 'bg-slate-500'
                        }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{conv.agentName}</p>
                      <span className="text-xs text-slate-500">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )) : (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No agents available. Create agents from the dashboard first.</p>
          </div>
        )}
      </div>
    </div>
  )
}
