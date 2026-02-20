import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/channels/')({ component: AgentChannelsIndex })

function AgentChannelsIndex() {
  const { agentId } = Route.useParams()
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []
  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>
      <div><h1 className="text-2xl font-bold text-white">Channels</h1><p className="text-sm text-slate-400 mt-1">Agent {agentId} — {channelList.length} channels</p></div>
      <Card><CardHeader><CardTitle>Connected Channels</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {channelList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No channels configured.</p>}
          {channelList.map(ch => (
            <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{ch.name}</span><p className="text-xs text-slate-400">{ch.platform} · {(ch.messageCount ?? 0).toLocaleString()} messages</p></div>
              <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
