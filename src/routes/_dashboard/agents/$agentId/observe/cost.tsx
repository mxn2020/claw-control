import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/cost')({ component: AgentObserveCost })

function AgentObserveCost() {
  const { agentId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Cost Analysis</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} usage costs</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalAgents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeSessions ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Skills</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSkills ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Online Instances</p><p className="text-2xl font-bold text-white mt-1">{stats?.onlineInstances ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Cost Tracking</CardTitle></CardHeader><CardContent>
        <p className="text-sm text-slate-400">Detailed cost tracking requires the VPS agent to report token usage and API costs. Connect a running instance to see real-time cost data.</p>
      </CardContent></Card>
    </div>
  )
}
