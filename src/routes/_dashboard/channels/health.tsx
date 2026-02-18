import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Activity,
  AlertCircle,
  Clock,
  Wifi,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/channels/health')({
  component: ChannelsHealth,
})

const channels = [
  {
    name: 'Discord — Main Server',
    status: 'healthy',
    latency: '42ms',
    errorRate: '0.1%',
    uptime: '99.98%',
    messagesLast24h: 1240,
  },
  {
    name: 'Slack — Engineering',
    status: 'healthy',
    latency: '38ms',
    errorRate: '0.0%',
    uptime: '99.99%',
    messagesLast24h: 890,
  },
  {
    name: 'WebChat — Customer Portal',
    status: 'healthy',
    latency: '55ms',
    errorRate: '0.3%',
    uptime: '99.95%',
    messagesLast24h: 2100,
  },
  {
    name: 'GitHub — org/main-repo',
    status: 'healthy',
    latency: '120ms',
    errorRate: '0.2%',
    uptime: '99.90%',
    messagesLast24h: 340,
  },
  {
    name: 'Email — support@acme.com',
    status: 'degraded',
    latency: '850ms',
    errorRate: '4.2%',
    uptime: '98.50%',
    messagesLast24h: 150,
  },
  {
    name: 'Slack — Sales',
    status: 'down',
    latency: '—',
    errorRate: '100%',
    uptime: '0%',
    messagesLast24h: 0,
  },
]

const recentErrors = [
  {
    timestamp: '2025-01-15 14:32:01',
    channel: 'Email — support@acme.com',
    error: 'SMTP connection timeout after 30s',
    severity: 'warning',
  },
  {
    timestamp: '2025-01-15 14:28:45',
    channel: 'Slack — Sales',
    error: 'OAuth token expired — re-authentication required',
    severity: 'critical',
  },
  {
    timestamp: '2025-01-15 14:15:12',
    channel: 'Email — support@acme.com',
    error: 'Rate limit exceeded (429) — backing off 60s',
    severity: 'warning',
  },
  {
    timestamp: '2025-01-15 13:50:33',
    channel: 'WebChat — Customer Portal',
    error: 'WebSocket reconnection after network blip',
    severity: 'info',
  },
  {
    timestamp: '2025-01-15 12:10:08',
    channel: 'GitHub — org/main-repo',
    error: 'Webhook delivery delayed — GitHub status degraded',
    severity: 'info',
  },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'success' as const
    case 'degraded':
      return 'warning' as const
    case 'down':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

const severityVariant = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'danger' as const
    case 'warning':
      return 'warning' as const
    case 'info':
      return 'info' as const
    default:
      return 'default' as const
  }
}

function ChannelsHealth() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Channel Health</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time status, latency, and error rates for all channels
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Healthy</span>
              <Wifi className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {channels.filter((c) => c.status === 'healthy').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Degraded</span>
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {channels.filter((c) => c.status === 'degraded').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Down</span>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {channels.filter((c) => c.status === 'down').length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Health Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Channel Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Channel</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Latency</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Error Rate</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Uptime</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Msgs (24h)</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((ch) => (
                  <tr key={ch.name} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{ch.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(ch.status)}>{ch.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{ch.latency}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{ch.errorRate}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{ch.uptime}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.messagesLast24h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <CardTitle className="text-base">Recent Errors</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Channel</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Error</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Severity</th>
                </tr>
              </thead>
              <tbody>
                {recentErrors.map((err, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {err.timestamp}
                    </td>
                    <td className="px-4 py-3 text-white">{err.channel}</td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{err.error}</td>
                    <td className="px-4 py-3">
                      <Badge variant={severityVariant(err.severity)}>{err.severity}</Badge>
                    </td>
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
