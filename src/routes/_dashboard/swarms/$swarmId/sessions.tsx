import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/sessions')({
  component: SwarmSessions,
})

function SwarmSessions() {
  const { swarmId } = Route.useParams()
  const sessions = useQuery(api.sessions.list, {})
  const sessionList = sessions ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">All sessions across swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions ({sessionList.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessionList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No sessions found.</p>
            )}
            {sessionList.map((ses: any) => (
              <div
                key={ses._id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{ses.title ?? ses._id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(ses.startedAt).toLocaleString()} · {ses.messageCount ?? 0} messages
                  </p>
                </div>
                <Badge variant={ses.status === 'active' ? 'success' : 'default'}>{ses.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
