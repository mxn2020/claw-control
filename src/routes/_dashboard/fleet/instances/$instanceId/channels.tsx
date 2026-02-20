import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Radio,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/channels',
)({
  component: InstanceChannels,
})

function InstanceChannels() {
  const { instanceId } = Route.useParams()
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Radio className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Channels</h1>
          <p className="text-sm text-slate-400">{channelList.length} channel{channelList.length !== 1 ? 's' : ''} configured</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connectors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {channelList.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No channels configured yet.</p>
            )}
            {channelList.map((channel) => (
              <div
                key={channel._id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{channel.name}</span>
                      <Badge variant={channel.status === 'connected' ? 'success' : 'danger'}>
                        {channel.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">
                      {channel.platform} · {(channel.messageCount ?? 0).toLocaleString()} messages
                    </p>
                  </div>
                </div>
                {channel.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
