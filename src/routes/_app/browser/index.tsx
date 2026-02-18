import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Globe, Monitor, Image, List, Clock } from 'lucide-react'
import { useBrowserSessions } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/browser/')({
  component: BrowserIndex,
})

const formatRelativeTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return Math.floor(diff / 1000) + 's ago'
  if (diff < 3600000) return Math.floor(diff / 60000) + ' min'
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' hrs'
  return Math.floor(diff / 86400000) + ' days'
}

function BrowserIndex() {
  const sessions = useBrowserSessions()

  const activeSessions = sessions.filter((s) => s.status === 'active')
  const pastSessions = sessions.filter((s) => s.status === 'completed' || s.status === 'failed')
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Browser</h1>
          <p className="text-sm text-slate-400 mt-1">
            Agent web automation dashboard
          </p>
        </div>
        <Link to="/browser/sessions">
          <Badge className="bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer flex items-center gap-1.5 px-3 py-1.5">
            <Clock size={12} />
            View Past Sessions
          </Badge>
        </Link>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Active Browser Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700">
                    <Monitor size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{s.url}</p>
                    <p className="text-xs text-slate-500">{s.agentId} · {formatRelativeTime(s.createdAt)}</p>
                  </div>
                </div>
                <Badge variant="success">{s.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queued Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <List className="w-4 h-4 text-cyan-400" />
              Queued Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastSessions.map((t) => (
                <div key={t.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <p className="text-sm text-slate-200">{t.taskDescription}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-500">{t.agentId}</span>
                    <Badge className={t.status === 'failed' ? 'bg-red-900/50 text-red-300' : 'bg-slate-700 text-slate-400'}>
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              Past Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.filter((s) => s.status === 'completed').map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{p.url}</p>
                    <p className="text-xs text-slate-500">{p.pagesVisited.length} pages · {formatRelativeTime(p.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
