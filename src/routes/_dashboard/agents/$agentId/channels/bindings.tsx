import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Radio, Link2, Plus, Wifi, WifiOff } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/channels/bindings')({ component: AgentChannelsBindings })

function AgentChannelsBindings() {
  const channels = useQuery(api.platform.listChannels, {})
  const list = channels ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Link2 className="w-6 h-6 text-cyan-400" />
            Channel Bindings
          </h1>
          <p className="text-sm text-slate-400 mt-1">{list.length} channel{list.length !== 1 ? 's' : ''} bound to this agent</p>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1.5" />
          Bind Channel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            Active Bindings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {list.length === 0 && (
              <div className="text-center py-8">
                <WifiOff className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No channel bindings configured.</p>
                <p className="text-xs text-slate-500 mt-1">Bind channels to route messages to this agent.</p>
              </div>
            )}
            {list.map(ch => (
              <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div className="flex items-center gap-3">
                  {ch.status === 'connected'
                    ? <Wifi className="w-4 h-4 text-emerald-400" />
                    : <WifiOff className="w-4 h-4 text-slate-500" />}
                  <div>
                    <span className="text-sm font-medium text-white">{ch.name}</span>
                    <p className="text-xs text-slate-400">{ch.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
