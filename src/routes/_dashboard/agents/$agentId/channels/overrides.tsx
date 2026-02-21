import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/channels/overrides')({ component: AgentChannelsOverrides })
function AgentChannelsOverrides() {
  const channels = useQuery(api.platform.listChannels, {})
  const list = channels ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Channel Overrides</h1><p className="text-sm text-slate-400 mt-1">Per-channel configuration overrides</p></div>
      <Card><CardHeader><CardTitle>Override Rules</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No channel overrides configured.</p>}
          {list.map(ch => (
            <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{ch.name}</span><p className="text-xs text-slate-400">{ch.platform} · {(ch.messageCount ?? 0).toLocaleString()} messages</p></div>
              <Badge variant="outline">default</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
