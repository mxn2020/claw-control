import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/observe/analytics/channels')({
  component: AnalyticsChannels,
})

function AnalyticsChannels() {
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Usage metrics across all communication channels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Channels ({channelList.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {channelList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No channels found.</p>
            )}
            {channelList.map((ch) => (
              <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div>
                  <span className="text-sm font-medium text-white">{ch.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{ch.platform} · {(ch.messageCount ?? 0).toLocaleString()} messages</p>
                </div>
                <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
