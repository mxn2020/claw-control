import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/kill-switch')({ component: SwarmKillSwitch })
function SwarmKillSwitch() {
  const { swarmId } = Route.useParams()
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-red-400">Kill Switch</h1><p className="text-sm text-slate-400 mt-1">Emergency shutdown for swarm {swarmId}</p></div>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeAgents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeSessions ?? 0}</p></CardContent></Card>
      </div>
      <Card className="border-red-700/50"><CardHeader><CardTitle className="text-red-400">Emergency Actions</CardTitle></CardHeader><CardContent>
        <p className="text-sm text-slate-400 mb-4">These actions will immediately affect all agents and sessions in this swarm.</p>
        <div className="flex gap-3">
          <button type="button" className="rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors border-2 border-red-500">KILL ALL AGENTS</button>
          <button type="button" className="rounded-lg bg-amber-700 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600 transition-colors border-2 border-amber-500">PAUSE ALL</button>
        </div>
      </CardContent></Card>
    </div>
  )
}
