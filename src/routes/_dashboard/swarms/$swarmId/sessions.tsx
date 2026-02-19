import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/sessions')({
  component: SwarmSessions,
})

const mockSessions = [
  { id: 'ses_1', agent: 'support-agent', user: 'user_abc', started: '12:01', status: 'active', messages: 14 },
  { id: 'ses_2', agent: 'eng-agent', user: 'user_def', started: '11:55', status: 'active', messages: 8 },
  { id: 'ses_3', agent: 'code-bot', user: 'user_ghi', started: '11:40', status: 'ended', messages: 32 },
  { id: 'ses_4', agent: 'support-agent', user: 'user_jkl', started: '11:30', status: 'ended', messages: 5 },
]

function SwarmSessions() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">All sessions across swarm {swarmId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSessions.map((ses) => (
              <div
                key={ses.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{ses.agent}</span>
                    <span className="text-xs text-slate-400">↔ {ses.user}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Started {ses.started} · {ses.messages} messages</p>
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
