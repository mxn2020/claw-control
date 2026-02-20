import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  MessageSquare,
  Clock,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/sessions',
)({
  component: InstanceSessions,
})

const statusVariant: Record<string, 'success' | 'info' | 'warning'> = {
  active: 'success',
  closed: 'info',
  escalated: 'warning',
}

const timeAgo = (ms: number) => {
  const d = Date.now() - ms
  if (d < 60_000) return 'just now'
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`
  return `${Math.floor(d / 86_400_000)}d ago`
}

function InstanceSessions() {
  const { instanceId } = Route.useParams()
  const sessions = useQuery(api.sessions.list, { instanceId: instanceId as Id<"instances"> })
  const sessionList = sessions ?? []

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-sm text-slate-400">{sessionList.length} session{sessionList.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active &amp; Recent Sessions</CardTitle>
            <Badge variant="info">{sessionList.length} sessions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sessionList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No sessions found for this instance.</p>
            )}
            {sessionList.map((session) => (
              <Link
                key={session._id}
                to="/sessions/$sessionId"
                params={{ sessionId: session._id }}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {session.title ?? 'Untitled Session'}
                      </span>
                      <Badge variant={statusVariant[session.status] ?? 'info'}>
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {session.channel ?? 'default'} · {session.messageCount} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {timeAgo(session.startedAt)}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
