import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Plug,
  Plus,
  Bell,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/configure/integrations')({
  component: ConfigureIntegrations,
})

const statusVariant = (status: string) => {
  switch (status) {
    case 'connected':
      return 'success' as const
    case 'disconnected':
    case 'not configured':
      return 'default' as const
    case 'error':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function ConfigureIntegrations() {
  const channels = useQuery(api.platform.listChannels, {})

  if (!channels) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading integrations…</span>
      </div>
    )
  }

  const connectedCount = channels.filter((c) => c.status === 'connected').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-sm text-slate-400 mt-1">
            Channel connectors and third-party integrations
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Channels</span>
              <Plug className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {channels.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Connected</span>
              <Plug className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {connectedCount}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Disconnected</span>
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {channels.length - connectedCount}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Channel Connectors */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Channel Connectors</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {channels.length === 0 ? (
            <p className="text-sm text-slate-500 p-6">
              No channel integrations configured
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Messages
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((ch) => (
                    <tr
                      key={ch._id}
                      className="border-b border-slate-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 text-white">{ch.name}</td>
                      <td className="px-4 py-3 text-slate-300">
                        {ch.platform}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {ch.messageCount?.toLocaleString() ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {ch.lastActivity
                          ? new Date(ch.lastActivity).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(ch.status)}>
                          {ch.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
