import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Activity, AlertTriangle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/channels/health')({
  component: ChannelsHealth,
})

function ChannelsHealth() {
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels ?? []

  const connected = channelList.filter((c) => c.status === 'connected').length
  const errored = channelList.filter((c) => c.status === 'error').length
  const disconnected = channelList.filter((c) => c.status === 'disconnected').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Health</h1>
        <p className="text-sm text-slate-400 mt-1">Monitor connector health and uptime</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Activity className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{connected}</p>
            <p className="text-xs text-slate-500">Connected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{errored}</p>
            <p className="text-xs text-slate-500">Errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Activity className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{disconnected}</p>
            <p className="text-xs text-slate-500">Disconnected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Channels</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Platform</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Messages</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {channelList.map((ch) => (
                  <tr key={ch._id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{ch.name}</td>
                    <td className="px-4 py-3 text-slate-400">{ch.platform}</td>
                    <td className="px-4 py-3">
                      <Badge variant={ch.status === 'connected' ? 'success' : ch.status === 'error' ? 'danger' : 'warning'}>
                        {ch.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{ch.messageCount ?? 0}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {ch.lastActivity ? new Date(ch.lastActivity).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
                {channelList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No channels configured</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
