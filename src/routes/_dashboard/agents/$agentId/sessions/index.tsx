import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/sessions/')({ component: AgentSessionsIndex })

function AgentSessionsIndex() {
  const { agentId } = Route.useParams()
  const sessions = useQuery(api.sessions.list, {})
  const sessionList = sessions ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Sessions</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} — {sessionList.length} sessions</p></div>
      <Card><CardHeader><CardTitle>All Sessions</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {sessionList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No sessions found.</p>}
          {sessionList.map((s: any) => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{s.title ?? s._id}</span><p className="text-xs text-slate-400 mt-0.5">{new Date(s.startedAt).toLocaleString()} · {s.messageCount ?? 0} messages</p></div>
              <Badge variant={s.status === 'active' ? 'success' : 'default'}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
