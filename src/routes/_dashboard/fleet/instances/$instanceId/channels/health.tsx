import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/channels/health')({ component: InstanceChannelHealth })
function InstanceChannelHealth() {
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Channel Health</h1><p className="text-sm text-slate-400 mt-1">Monitor channel health and performance</p></div>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Active Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.activeSessions ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Skills</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSkills ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Health Status</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Detailed channel health requires VPS agent connectivity for latency monitoring, error rate tracking, and connection status.</p></CardContent></Card>
    </div>
  )
}
