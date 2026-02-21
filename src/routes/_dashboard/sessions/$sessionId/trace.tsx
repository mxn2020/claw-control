import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Activity, Code } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId/trace')({
  component: SessionTrace,
})

function SessionTrace() {
  const { sessionId } = Route.useParams()
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Trace</h1>
          </div>
          <p className="text-sm text-slate-400">Tool-call waterfall for session {sessionId}</p>
        </div>
        <Badge variant="info">{msgList.length} messages</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Message Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {msgList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No trace data available.</p>}
            {msgList.map((msg, idx) => (
              <div key={msg._id} className="flex items-start gap-4 rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className={`w-3 h-3 rounded-full ${msg.role === 'assistant' ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
                  {idx < msgList.length - 1 && <div className="w-px h-8 bg-slate-700" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-mono font-medium text-white">{msg.role}</span>
                    </div>
                    <Badge variant={msg.role === 'assistant' ? 'info' : 'default'}>{msg.role}</Badge>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                  <pre className="text-xs text-slate-400 bg-slate-800/50 rounded p-2 overflow-x-auto border border-slate-700/30 whitespace-pre-wrap">{msg.content}</pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
