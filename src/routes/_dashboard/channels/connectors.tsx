import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Plus,
  MessageSquare,
  Wifi,
  Clock,
  Bot,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/channels/connectors')({
  component: ChannelsConnectors,
})

const connectors = [
  {
    platform: 'Discord',
    name: 'Main Discord Server',
    status: 'connected',
    connectedAgents: ['support-agent', 'community-bot'],
    lastActivity: '2 min ago',
    messagesPerDay: 1240,
  },
  {
    platform: 'Slack',
    name: 'Engineering Workspace',
    status: 'connected',
    connectedAgents: ['ops-agent', 'code-review-bot'],
    lastActivity: '5 min ago',
    messagesPerDay: 890,
  },
  {
    platform: 'GitHub',
    name: 'org/main-repo',
    status: 'connected',
    connectedAgents: ['code-review-bot'],
    lastActivity: '12 min ago',
    messagesPerDay: 340,
  },
  {
    platform: 'WebChat',
    name: 'Customer Portal Widget',
    status: 'connected',
    connectedAgents: ['support-agent'],
    lastActivity: '1 min ago',
    messagesPerDay: 2100,
  },
  {
    platform: 'Email',
    name: 'support@acme.com',
    status: 'degraded',
    connectedAgents: ['support-agent'],
    lastActivity: '45 min ago',
    messagesPerDay: 150,
  },
  {
    platform: 'Slack',
    name: 'Sales Workspace',
    status: 'disconnected',
    connectedAgents: [],
    lastActivity: '3 days ago',
    messagesPerDay: 0,
  },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'connected':
      return 'success' as const
    case 'degraded':
      return 'warning' as const
    case 'disconnected':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function ChannelsConnectors() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Channel Connectors</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage platform connections across your fleet
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Connector
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Connectors</span>
              <MessageSquare className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{connectors.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Connected</span>
              <Wifi className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {connectors.filter((c) => c.status === 'connected').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Messages / Day</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {connectors.reduce((sum, c) => sum + c.messagesPerDay, 0).toLocaleString()}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Connectors Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">All Connectors</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Platform</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Connected Agents</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {connectors.map((conn) => (
                  <tr key={`${conn.platform}-${conn.name}`} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white font-medium">{conn.platform}</td>
                    <td className="px-4 py-3 text-slate-300">{conn.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(conn.status)}>{conn.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {conn.connectedAgents.length > 0 ? (
                          conn.connectedAgents.map((agent) => (
                            <Badge key={agent} variant="outline" className="text-xs">
                              <Bot className="w-3 h-3 mr-1" />
                              {agent}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500">none</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{conn.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
