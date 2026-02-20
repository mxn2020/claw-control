import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/agents/$agentId/sessions/$sessionId')({ component: AgentSessionDetail })

function AgentSessionDetail() {
  const { sessionId } = Route.useParams()
  const session = useQuery(api.sessions.get, { id: sessionId as Id<"sessions"> })
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []
  if (!session) return <div className="text-center py-12 text-slate-500">Loading session…</div>
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">{session.title ?? 'Session'}</h1><p className="text-sm text-slate-400 mt-1"><Badge variant={session.status === 'active' ? 'success' : 'default'}>{session.status}</Badge> · {msgList.length} messages</p></div>
      <Card><CardHeader><CardTitle>Messages</CardTitle></CardHeader><CardContent>
        <div className="space-y-3">
          {msgList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No messages.</p>}
          {msgList.map(msg => (
            <div key={msg._id} className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-slate-800 ml-8' : 'bg-cyan-950/30 mr-8'}`}>
              <div className="flex items-center gap-2 mb-1"><Badge variant="outline">{msg.role}</Badge><span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleTimeString()}</span></div>
              <p className="text-sm text-slate-300">{msg.content}</p>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
