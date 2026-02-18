import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Bot, Plus, Search } from 'lucide-react'

export const Route = createFileRoute('/_app/chat/')({
  component: ChatIndex,
})

const conversations = [
  {
    id: 'agent_1',
    agentName: 'Research Assistant',
    lastMessage: "I've compiled the market analysis report. Here are the key findings on Q3 trends...",
    timestamp: '2 min ago',
    unread: 3,
    status: 'online' as const,
  },
  {
    id: 'agent_2',
    agentName: 'Email Drafter',
    lastMessage: 'Draft ready for your review: Re: Partnership Proposal from Acme Corp',
    timestamp: '15 min ago',
    unread: 1,
    status: 'online' as const,
  },
  {
    id: 'agent_3',
    agentName: 'Code Reviewer',
    lastMessage: 'Found 2 potential issues in the auth middleware. Suggesting fixes now.',
    timestamp: '1 hr ago',
    unread: 0,
    status: 'idle' as const,
  },
  {
    id: 'agent_4',
    agentName: 'Meeting Summarizer',
    lastMessage: 'Summary of Product Sync (Jan 15): 4 action items, 2 decisions made.',
    timestamp: '3 hrs ago',
    unread: 0,
    status: 'offline' as const,
  },
  {
    id: 'agent_5',
    agentName: 'Finance Tracker',
    lastMessage: 'Monthly budget report generated. Total spend is 12% under projection.',
    timestamp: 'Yesterday',
    unread: 0,
    status: 'offline' as const,
  },
]

function ChatIndex() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Chat</h1>
          <p className="text-sm text-slate-400 mt-1">
            Unified inbox across all your agents
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Chat
        </Button>
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
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            to="/chat/$agentId"
            params={{ agentId: conv.id }}
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
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-800 ${
                        conv.status === 'online'
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
                  {conv.unread > 0 && (
                    <Badge className="bg-cyan-600 text-white text-xs">{conv.unread}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
