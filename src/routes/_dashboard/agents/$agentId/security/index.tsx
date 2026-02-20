import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/security/')({ component: AgentSecurityIndex })

function AgentSecurityIndex() {
  const { agentId } = Route.useParams()
  const logs = useQuery(api.auditLogs.list, { resourceType: 'security', limit: 10 })
  const entries = logs ?? []
  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>
      <div><h1 className="text-2xl font-bold text-white">Security</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} security overview</p></div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Security Events</p><p className="text-2xl font-bold text-white mt-1">{entries.length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Status</p><p className="text-2xl font-bold text-emerald-400 mt-1">Healthy</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Risk Level</p><p className="text-2xl font-bold text-cyan-400 mt-1">Low</p></CardContent></Card>
      </div>
      <Card><CardHeader><div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400" /><CardTitle>Recent Security Events</CardTitle></div></CardHeader><CardContent>
        <div className="space-y-2">
          {entries.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No security events.</p>}
          {entries.map(e => (
            <div key={e._id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <div><span className="text-sm text-white">{e.action}</span><p className="text-xs text-slate-400">{e.details ?? '—'}</p></div>
              <span className="text-xs text-slate-500">{new Date(e.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
