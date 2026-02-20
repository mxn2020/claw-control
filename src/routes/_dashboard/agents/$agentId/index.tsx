import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Bot, ArrowLeft, Cpu, MessageSquare, Coins, Settings, MemoryStick } from 'lucide-react'
import { useAgents, useSessions, useMemoryFiles, useUsageRecords } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/agents/$agentId/')({
  component: AgentDetailPage,
})

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active: 'success', idle: 'warning', paused: 'default', error: 'danger', quarantined: 'danger',
}

function AgentDetailPage() {
  const { agentId } = Route.useParams()
  const agents = useAgents()
  const agent = agents?.find((a) => a._id === agentId)
  const sessions = useSessions({ agentId })
  const memory = useMemoryFiles({ agentId })
  const usage = useUsageRecords({ agentId })
  const totalCost = usage?.reduce((s, r) => s + r.cost, 0) ?? 0

  if (!agent) {
    return (
      <div className="text-center py-16">
        <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">Agent not found.</p>
        <Link to="/agents" className="text-cyan-400 hover:underline text-sm mt-2 inline-block">← Back to agents</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link to="/agents" className="text-slate-400 hover:text-white transition-colors mt-1">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-cyan-600/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
            <Badge variant={statusColors[agent.status] ?? 'default'}>{agent.status}</Badge>
          </div>
          {agent.model && <p className="text-sm text-slate-400 font-mono ml-13">{agent.model}</p>}
        </div>
        <div className="flex gap-2">
          <Link to="/agents/$agentId/model" params={{ agentId }}>
            <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1.5" />Settings</Button>
          </Link>
          <Link to="/sessions" search={{ agentId }}>
            <Button size="sm"><MessageSquare className="w-4 h-4 mr-1.5" />Open Session</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Sessions', value: fmt(agent.sessionCount), icon: <MessageSquare className="w-4 h-4 text-cyan-400" /> },
          { label: 'Tokens', value: agent.totalTokens ? fmt(agent.totalTokens) : '—', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
          { label: 'Total Cost', value: `$${totalCost.toFixed(2)}`, icon: <Coins className="w-4 h-4 text-amber-400" /> },
          { label: 'Memory Files', value: String(memory?.length ?? 0), icon: <MemoryStick className="w-4 h-4 text-emerald-400" /> },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">{s.icon}<span className="text-xs text-slate-400">{s.label}</span></div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions?.slice(0, 5).map((s) => (
                <Link key={s._id} to="/sessions/$sessionId" params={{ sessionId: s._id }} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 rounded px-1.5">
                  <div>
                    <p className="text-sm text-white">{s.title ?? 'Untitled Session'}</p>
                    <p className="text-xs text-slate-500">{s.messageCount ?? 0} messages</p>
                  </div>
                  <Badge variant={s.status === 'active' ? 'success' : 'default'}>{s.status}</Badge>
                </Link>
              ))}
              {(!sessions || sessions.length === 0) && <p className="text-sm text-slate-500 py-4 text-center">No sessions yet</p>}
            </div>
          </CardContent>
        </Card>

        {/* Memory Files */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MemoryStick className="w-4 h-4 text-emerald-400" /> Memory Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {memory?.slice(0, 5).map((f) => (
                <div key={f._id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm text-white font-mono truncate">{f.path}</p>
                    {(f.tags?.length ?? 0) > 0 && (
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        {f.tags?.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs text-slate-500 bg-slate-700/50 px-1.5 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 ml-2">{f.fileType}</span>
                </div>
              ))}
              {(!memory || memory.length === 0) && <p className="text-sm text-slate-500 py-4 text-center">No memory files</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
