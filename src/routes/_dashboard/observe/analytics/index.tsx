import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/observe/analytics/')({
  component: AnalyticsOverview,
})

function AnalyticsOverview() {
  const stats = useQuery(api.platform.getStats, {})
  const sessions = useQuery(api.sessions.list, {})

  const totalMessages = sessions?.reduce((sum, s) => sum + s.messageCount, 0) ?? 0

  const kpis = [
    { label: 'Total Sessions', value: stats?.totalSessions ?? 0, delta: null },
    { label: 'Messages Sent', value: totalMessages.toLocaleString(), delta: null },
    { label: 'Active Agents', value: stats?.activeAgents ?? 0, delta: null },
    { label: 'Online Instances', value: stats?.onlineInstances ?? 0, delta: null },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Fleet-wide analytics overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions && sessions.length > 0 ? (
            <div className="space-y-2">
              {sessions.slice(0, 10).map((s) => (
                <div key={s._id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-800/50">
                  <div>
                    <p className="text-sm text-white">{s.title || `Session ${s._id.slice(-6)}`}</p>
                    <p className="text-xs text-slate-500">
                      {s.messageCount} messages · {s.channel ?? 'direct'}
                    </p>
                  </div>
                  <Badge variant={s.status === 'active' ? 'success' : s.status === 'escalated' ? 'warning' : 'default'}>
                    {s.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
              <p className="text-sm text-slate-500">No sessions yet. Connect an instance to start tracking.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
