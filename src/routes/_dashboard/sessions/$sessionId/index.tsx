import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { X, AlertTriangle, Download, Bot, User } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId/')({
  component: SessionDetail,
})

function SessionDetail() {
  const { sessionId } = Route.useParams()
  const session = useQuery(api.sessions.get, { id: sessionId as Id<"sessions"> })
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []

  if (!session) return <div className="flex items-center justify-center py-20 text-slate-500">Loading session…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{session.title ?? 'Session'}</h1>
          <p className="text-sm text-slate-400 mt-1">Session {sessionId}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors">
            <X className="w-4 h-4" />Close Session
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors">
            <AlertTriangle className="w-4 h-4" />Escalate
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors">
            <Download className="w-4 h-4" />Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {msgList.length === 0 && <p className="text-sm text-slate-500 text-center py-12">No messages in this session.</p>}
          {msgList.map((msg: any) => (
            <div key={msg._id} className={`flex gap-3 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-cyan-600/20' : 'bg-slate-700'}`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4 text-slate-300" />}
              </div>
              <div className={`max-w-[70%] rounded-xl px-4 py-3 ${msg.role === 'assistant' ? 'bg-slate-800 text-slate-200' : 'bg-cyan-600/20 text-slate-200'}`}>
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs text-slate-500 mt-1 block">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle className="text-sm">Session Info</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><span className="text-xs text-slate-400">Status</span><div className="mt-1"><Badge variant={session.status === 'active' ? 'success' : 'default'}>{session.status}</Badge></div></div>
              <div><span className="text-xs text-slate-400">Messages</span><p className="text-sm text-white">{session.messageCount ?? msgList.length}</p></div>
              <div><span className="text-xs text-slate-400">Started</span><p className="text-sm text-white">{new Date(session.startedAt).toLocaleString()}</p></div>
              {session.channel && <div><span className="text-xs text-slate-400">Channel</span><div className="mt-1"><Badge variant="info">{session.channel}</Badge></div></div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
