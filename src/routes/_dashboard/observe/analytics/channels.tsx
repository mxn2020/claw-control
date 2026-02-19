import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/observe/analytics/channels')({
  component: AnalyticsChannels,
})

const mockChannels = [
  { name: 'Discord', messages7d: 42_300, trend: '+15%', status: 'connected' },
  { name: 'Slack', messages7d: 28_100, trend: '+8%', status: 'connected' },
  { name: 'WebChat', messages7d: 18_940, trend: '-2%', status: 'connected' },
  { name: 'GitHub', messages7d: 9_210, trend: '+22%', status: 'connected' },
  { name: 'WhatsApp', messages7d: 4_580, trend: '+5%', status: 'inactive' },
]

function AnalyticsChannels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channel Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Message volume per channel over time</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Volume (7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockChannels.map((ch) => {
              const max = mockChannels[0].messages7d
              const pct = Math.round((ch.messages7d / max) * 100)
              return (
                <div key={ch.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">{ch.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{ch.messages7d.toLocaleString()}</span>
                      <Badge variant={ch.trend.startsWith('+') ? 'success' : 'warning'}>{ch.trend}</Badge>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-cyan-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
