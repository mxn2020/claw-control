import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Globe, Monitor, Image, List, Clock } from 'lucide-react'

export const Route = createFileRoute('/_app/browser/')({
  component: BrowserIndex,
})

const activeSessions = [
  { id: 'bs_1', url: 'github.com/claw-control', agent: 'Code Reviewer', status: 'active' as const, duration: '5 min' },
  { id: 'bs_2', url: 'docs.google.com/spreadsheet/...', agent: 'Research Assistant', status: 'active' as const, duration: '12 min' },
]

const queuedTasks = [
  { id: 'qt_1', description: 'Scrape pricing from competitor sites', agent: 'Research Assistant', priority: 'medium' as const },
  { id: 'qt_2', description: 'Fill out vendor registration form', agent: 'Admin Agent', priority: 'low' as const },
]

const browserProfiles = [
  { id: 'bp_1', name: 'Default', sessions: 12, lastUsed: '2 min ago' },
  { id: 'bp_2', name: 'Work', sessions: 8, lastUsed: '1 hr ago' },
  { id: 'bp_3', name: 'Research', sessions: 23, lastUsed: '3 hrs ago' },
]

function BrowserIndex() {
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
                    <p className="text-xs text-slate-500">{s.agent} · {s.duration}</p>
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
              {queuedTasks.map((t) => (
                <div key={t.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <p className="text-sm text-slate-200">{t.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-500">{t.agent}</span>
                    <Badge className={t.priority === 'medium' ? 'bg-amber-900/50 text-amber-300' : 'bg-slate-700 text-slate-400'}>
                      {t.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browser Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Image className="w-4 h-4 text-cyan-400" />
              Browser Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {browserProfiles.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.sessions} sessions · Last used {p.lastUsed}</p>
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
