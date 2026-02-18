import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Bot, Send, User, Info } from 'lucide-react'

export const Route = createFileRoute('/_app/chat/$agentId')({
  component: ChatConversation,
})

const agentProfiles: Record<string, { name: string; role: string; status: string }> = {
  agent_1: { name: 'Research Assistant', role: 'Research & Analysis', status: 'online' },
  agent_2: { name: 'Email Drafter', role: 'Communication', status: 'online' },
  agent_3: { name: 'Code Reviewer', role: 'Development', status: 'idle' },
  agent_4: { name: 'Meeting Summarizer', role: 'Productivity', status: 'offline' },
  agent_5: { name: 'Finance Tracker', role: 'Finance', status: 'offline' },
}

const mockMessages = [
  { id: '1', role: 'agent' as const, content: "Hello! I'm ready to help. What would you like me to research today?", time: '9:00 AM' },
  { id: '2', role: 'user' as const, content: 'Can you analyze the latest trends in AI agent frameworks? Focus on open-source options.', time: '9:01 AM' },
  { id: '3', role: 'agent' as const, content: "I'll look into that right away. I'll examine LangChain, CrewAI, AutoGen, and other popular frameworks. Give me a few moments to compile the analysis.", time: '9:01 AM' },
  { id: '4', role: 'agent' as const, content: "Here's what I found:\n\n**Top AI Agent Frameworks (2024):**\n\n1. **LangChain** — Most popular, great ecosystem, supports chains and agents\n2. **CrewAI** — Role-based agent collaboration, rising fast\n3. **AutoGen** — Microsoft's multi-agent conversation framework\n4. **LlamaIndex** — Best for RAG-based agents\n\nWant me to dive deeper into any of these?", time: '9:05 AM' },
  { id: '5', role: 'user' as const, content: 'Yes, compare CrewAI and AutoGen specifically. Pros and cons of each.', time: '9:06 AM' },
  { id: '6', role: 'agent' as const, content: "Great choice! Here's a detailed comparison:\n\n**CrewAI:**\n✅ Simple API, role-based agents\n✅ Built-in task delegation\n❌ Less mature ecosystem\n\n**AutoGen:**\n✅ Strong multi-agent conversations\n✅ Microsoft backing, good docs\n❌ Steeper learning curve\n\nI'd recommend CrewAI for quick prototypes and AutoGen for complex multi-agent systems.", time: '9:10 AM' },
]

function ChatConversation() {
  const { agentId } = Route.useParams()
  const agent = agentProfiles[agentId] || { name: 'Unknown Agent', role: 'General', status: 'offline' }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Agent header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-700/60">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
              <Bot size={18} className="text-cyan-400" />
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 ${
                agent.status === 'online' ? 'bg-emerald-400' : agent.status === 'idle' ? 'bg-amber-400' : 'bg-slate-500'
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{agent.name}</p>
            <p className="text-xs text-slate-500">{agent.role} · {agent.status}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-slate-700'}`}>
                  {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-cyan-400" />}
                </div>
              </div>
              <div className={`max-w-[70%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`rounded-lg px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  {msg.content}
                </div>
                <p className="text-xs text-slate-600 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-700/60">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="sm" className="px-3">
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Agent Info Sidebar */}
      <div className="w-64 flex-shrink-0 border-l border-slate-700/60 pl-4 hidden xl:block">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Info size={14} />
            Agent Info
          </div>
          <Card>
            <CardContent className="py-4 space-y-3">
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700">
                  <Bot size={28} className="text-cyan-400" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">{agent.name}</p>
                <p className="text-xs text-slate-500">{agent.role}</p>
              </div>
              <div className="flex justify-center">
                <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'idle' ? 'warning' : 'danger'}>
                  {agent.status}
                </Badge>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-700/60">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Messages today</span>
                  <span className="text-slate-300">24</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Response time</span>
                  <span className="text-slate-300">~3s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tokens used</span>
                  <span className="text-slate-300">12.4k</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
