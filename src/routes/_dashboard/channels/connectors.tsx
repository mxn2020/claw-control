import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/channels/connectors')({
  component: ChannelsConnectors,
})

function ChannelsConnectors() {
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Connectors</h1>
        <p className="text-sm text-slate-400 mt-1">Manage channel integrations and connectors</p>
      </div>

      {channelList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channelList.map((ch) => (
            <Card key={ch._id} className="hover:border-cyan-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{ch.name}</CardTitle>
                  <Badge variant={ch.status === 'connected' ? 'success' : ch.status === 'error' ? 'danger' : 'warning'}>
                    {ch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Platform: {ch.platform}</span>
                  <span>{ch.messageCount ?? 0} messages</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-slate-500">No connectors configured. Add a channel to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
