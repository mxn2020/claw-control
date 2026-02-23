import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'
import { Send, Bot, User as UserIcon, ArrowLeft } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/chat/$agentId')({
  component: AgentChat,
})

function AgentChat() {
  const { agentId } = Route.useParams()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch the agent
  const agent = useQuery(api.agents.get, { id: agentId as any })

  // Find active sessions for this agent and get messages from the first one
  const sessions = useQuery(api.sessions.list, agent ? { agentId: agent._id } : 'skip')
  const activeSession = sessions?.find((s: any) => s.status === 'active')

  const messages = useQuery(
    api.sessions.getMessages,
    activeSession ? { sessionId: activeSession._id } : 'skip'
  )

  const createSession = useMutation(api.sessions.create)
  const addMessage = useMutation(api.sessions.addMessage)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.length])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || !agent) return

    let sessionId = activeSession?._id

    // Create a session if none exists
    if (!sessionId) {
      try {
        sessionId = await createSession({
          orgId: agent.orgId,
          agentId: agent._id,
          instanceId: agent.instanceId,
          channel: 'web',
          title: `Chat with ${agent.name}`,
        })
      } catch (err) {
        console.error('Failed to create session:', err)
        return
      }
    }

    try {
      await addMessage({
        sessionId,
        role: 'user',
        content: input.trim(),
      })
      setInput('')
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  const messageList = messages ?? []

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b border-slate-700 p-4">
        <Link to="/chat" className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{agent?.name ?? 'Agent'}</p>
          <div className="flex items-center gap-2">
            <Badge variant={agent?.status === 'active' ? 'success' : 'warning'} className="text-xs">
              {agent?.status ?? 'loading'}
            </Badge>
            {agent?.model && <span className="text-xs text-slate-500 font-mono">{agent.model}</span>}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageList.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Start a conversation with {agent?.name ?? 'this agent'}</p>
              <p className="text-xs text-slate-600 mt-1">Messages are stored in Convex and persist across sessions</p>
            </div>
          </div>
        )}

        {messageList.map((msg: any) => (
          <div key={msg._id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role !== 'user' && (
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[70%] rounded-xl px-4 py-2.5 ${msg.role === 'user'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 border border-slate-700 text-slate-300'
              }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${agent?.name ?? 'agent'}…`}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
