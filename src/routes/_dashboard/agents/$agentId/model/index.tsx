import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/')({ component: AgentModelIndex })
function AgentModelIndex() {
  const { agentId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>
      <div><h1 className="text-2xl font-bold text-white">Model Configuration</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} model settings</p></div>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeAgents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSessions ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Model Settings</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Model selection, parameter tuning, and fallback configuration are managed per-agent. Connect a running VPS instance to configure the model used by this agent.</p></CardContent></Card>
    </div>
  )
}
