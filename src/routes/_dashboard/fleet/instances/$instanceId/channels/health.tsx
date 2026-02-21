import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { Activity, Wifi, WifiOff, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convexApi = api as Record<string, any>

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/channels/health')({ component: InstanceChannelHealth })

function InstanceChannelHealth() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const channels = useQuery(convexApi.platform?.listChannels ?? null, {})
  const stats = useQuery(convexApi.platform?.getStats ?? null, {})

  const channelList = channels ?? []
  const connectedCount = channelList.filter((c: { status: string }) => c.status === 'connected').length
  const totalCount = channelList.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Health</h1>
        <p className="text-sm text-slate-400 mt-1">
          {instance?.name ?? 'Instance'} — Monitor channel connectivity and performance
        </p>
      </div>

      {/* Health summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-slate-400">Connected</p>
            </div>
            <p className="text-2xl font-bold text-white">{connectedCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">of {totalCount} channels</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-cyan-400" />
              <p className="text-xs text-slate-400">Active Sessions</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.activeSessions ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <p className="text-xs text-slate-400">Avg Latency</p>
            </div>
            <p className="text-2xl font-bold text-white">—</p>
            <p className="text-xs text-slate-500 mt-0.5">Requires VPS agent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-xs text-slate-400">Errors (24h)</p>
            </div>
            <p className="text-2xl font-bold text-white">—</p>
            <p className="text-xs text-slate-500 mt-0.5">Requires VPS agent</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-channel health status */}
      <Card>
        <CardHeader><CardTitle>Channel Status</CardTitle></CardHeader>
        <CardContent>
          {totalCount === 0 ? (
            <div className="text-center py-8">
              <WifiOff className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No channels configured. Add connectors to monitor their health.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {channelList.map((ch: { _id: string; name: string; platform: string; status: string }) => (
                <div key={ch._id} className="flex items-center justify-between py-3 px-4 rounded-lg border border-slate-700/50 bg-slate-900/30">
                  <div className="flex items-center gap-3">
                    {ch.status === 'connected'
                      ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                      : <WifiOff className="w-4 h-4 text-slate-500" />}
                    <div>
                      <span className="text-sm font-medium text-white">{ch.name}</span>
                      <p className="text-xs text-slate-500">{ch.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Latency</p>
                      <p className="text-xs text-slate-400 font-mono">—</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Uptime</p>
                      <p className="text-xs text-slate-400 font-mono">—</p>
                    </div>
                    <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Note about VPS connectivity */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-slate-300">
        <p className="font-medium text-amber-400 mb-1">Latency & error tracking requires VPS agent</p>
        <p className="text-xs text-slate-400">
          Real-time latency monitoring, error rate tracking, and historical uptime data require a connected OpenClaw VPS agent.
          Once your instance is connected via the agent tunnel, these metrics will populate automatically.
        </p>
      </div>
    </div>
  )
}
