import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/config')({ component: SwarmConfig })
function SwarmConfig() {
  const { swarmId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Swarm Config</h1><p className="text-sm text-slate-400 mt-1">Push configuration across all instances in swarm {swarmId}</p></div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Instances</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalInstances ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Online</p><p className="text-2xl font-bold text-emerald-400 mt-1">{stats?.onlineInstances ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalAgents ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Configuration Push</CardTitle></CardHeader><CardContent>
        <p className="text-sm text-slate-400 mb-4">Push configuration changes to all instances in this swarm. Connect a running VPS agent to manage swarm-wide configuration.</p>
        <button type="button" className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">Push Config</button>
      </CardContent></Card>
    </div>
  )
}
