import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Radio, MessageSquare } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/channels/')({
  component: ChannelsOverview,
})

function ChannelsOverview() {
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Channels</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage communication channels and connectors
        </p>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channelList.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">No channels configured yet.</div>
        )}
        {channelList.map((channel) => (
          <Card key={channel._id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  <CardTitle className="text-base">{channel.name}</CardTitle>
                </div>
                <Badge variant={channel.status === 'connected' ? 'success' : 'danger'}>
                  {channel.status}
                </Badge>
              </div>
              <span className="text-xs text-slate-400">{channel.platform}</span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  {(channel.messageCount ?? 0).toLocaleString()} messages
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
