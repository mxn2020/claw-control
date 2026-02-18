import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  MessageCircle,
  Github,
  Hash,
  Globe,
  Clock,
  MessageSquare,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/channels/')({
  component: ChannelsOverview,
})

const mockChannels = [
  {
    id: 'ch_1',
    name: 'WebChat',
    platform: 'Web',
    status: 'connected' as const,
    messageCount: 1_284,
    lastActivity: '2 min ago',
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'ch_2',
    name: 'Discord',
    platform: 'Discord',
    status: 'connected' as const,
    messageCount: 892,
    lastActivity: '5 min ago',
    icon: <MessageCircle className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: 'ch_3',
    name: 'GitHub',
    platform: 'GitHub',
    status: 'connected' as const,
    messageCount: 456,
    lastActivity: '12 min ago',
    icon: <Github className="w-5 h-5 text-white" />,
  },
  {
    id: 'ch_4',
    name: 'Slack',
    platform: 'Slack',
    status: 'disconnected' as const,
    messageCount: 2_103,
    lastActivity: '3 days ago',
    icon: <Hash className="w-5 h-5 text-amber-400" />,
  },
]

const tabs = [
  { label: 'Connectors', active: true },
  { label: 'Routing', active: false },
  { label: 'Health', active: false },
]

function ChannelsOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Channels</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage communication channels and connectors
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockChannels.map((channel) => (
          <Card key={channel.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {channel.icon}
                  <CardTitle className="text-base">{channel.name}</CardTitle>
                </div>
                <Badge
                  variant={
                    channel.status === 'connected' ? 'success' : 'danger'
                  }
                >
                  {channel.status}
                </Badge>
              </div>
              <span className="text-xs text-slate-400">
                {channel.platform}
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  {channel.messageCount.toLocaleString()} messages
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {channel.lastActivity}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
