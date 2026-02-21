import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Clock, Globe, Monitor } from 'lucide-react'
import { useBrowserSessions } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/browser/sessions')({
  component: BrowserSessions,
})

function BrowserSessions() {
  const sessions = useBrowserSessions() ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Past Browser Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">
          History of agent web automation sessions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Session History ({sessions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700">
                      <Monitor size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe size={12} className="text-slate-500" />
                        <p className="text-sm font-medium text-white">{s.url ?? 'No URL'}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {s.taskDescription ?? 'Browser session'} · {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={s.status === 'completed' ? 'success' : s.status === 'failed' ? 'danger' : 'info'}>
                    {s.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              No browser sessions yet. Start one from the browser page.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
