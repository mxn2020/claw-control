import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/channels/routing')({ component: InstanceChannelRouting })
function InstanceChannelRouting() {
  const channels = useQuery(api.platform.listChannels, {})
  const list = channels ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Channel Routing</h1><p className="text-sm text-slate-400 mt-1">Message routing rules</p></div>
      <Card><CardHeader><CardTitle>Routing Rules</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No routing rules configured.</p>}
          {list.map(ch => (
            <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-mono text-cyan-400">{ch.name}</span><p className="text-xs text-slate-400">→ {ch.platform}</p></div>
              <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
