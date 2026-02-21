import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/')({ component: AgentToolsIndex })
function AgentToolsIndex() {
  const { agentId } = Route.useParams()
  const skills = useQuery(api.platform.list, {})
  const list = skills ?? []
  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>
      <div><h1 className="text-2xl font-bold text-white">Tools</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} — {list.length} tools available</p></div>
      <Card><CardHeader><CardTitle>Available Tools</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No tools configured.</p>}
          {list.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-mono text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version} · {s.description ?? 'No description'}</p></div>
              <Badge variant={s.isEnabled ? 'success' : 'default'}>{s.isEnabled ? 'allowed' : 'denied'}</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
