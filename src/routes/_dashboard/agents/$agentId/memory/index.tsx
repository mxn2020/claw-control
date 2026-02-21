import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/')({ component: AgentMemoryIndex })
function AgentMemoryIndex() {
  const { agentId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>
      <div><h1 className="text-2xl font-bold text-white">Memory</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} memory store</p></div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeSessions ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalAgents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Skills</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSkills ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Memory Store</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Memory browsing, editing, and health monitoring require VPS agent connectivity. Connect a running instance to access the agent's memory store.</p></CardContent></Card>
    </div>
  )
}
