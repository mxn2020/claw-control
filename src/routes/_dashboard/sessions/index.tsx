import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { MessageSquare, Search, Clock, Bot } from 'lucide-react'
import { useState } from 'react'
import { useSessions } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/sessions/')({
  component: SessionsPage,
})

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active: 'success', idle: 'default', completed: 'default', error: 'danger',
}

const timeAgo = (ms: number) => {
  const d = Date.now() - ms
  if (d < 60_000) return 'just now'
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`
  return `${Math.floor(d / 86_400_000)}d ago`
}

function SessionsPage() {
  const sessions = useSessions() || []
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = sessions.filter((s) => {
    const matchesQuery = query === '' || (s.title ?? '').toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesQuery && matchesStatus
  })

  const active = sessions.filter((s) => s.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-sm text-slate-400 mt-1">{active} active · {sessions.length} total</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search sessions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="flex gap-1">
          {['all', 'active', 'idle', 'completed'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === s ? 'bg-cyan-600 text-white' : 'border border-slate-600 text-slate-400 hover:text-white'}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions list */}
      <div className="space-y-2">
        {filtered.map((session) => (
          <Link key={session._id} to="/sessions/$sessionId" params={{ sessionId: session._id }} className="block">
            <Card className="hover:border-cyan-500/40 transition-all duration-200 cursor-pointer">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-white truncate">{session.title ?? 'Untitled Session'}</p>
                      <Badge variant={statusColors[session.status] ?? 'default'}>{session.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      {session.agentId && <span className="font-mono">{session.agentId}</span>}
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{session.messageCount ?? 0} messages</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(session._creationTime)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No sessions found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
