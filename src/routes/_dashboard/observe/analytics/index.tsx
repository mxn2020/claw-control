import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/observe/analytics/')({
  component: AnalyticsOverview,
})

function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Fleet-wide analytics overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: '8,421', delta: '+12%', positive: true },
          { label: 'Messages Sent', value: '142,330', delta: '+8%', positive: true },
          { label: 'Avg Latency', value: '340ms', delta: '-5%', positive: true },
          { label: 'Error Rate', value: '0.4%', delta: '+0.1%', positive: false },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
              <Badge variant={stat.positive ? 'success' : 'danger'} className="mt-1">{stat.delta}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
            <p className="text-sm text-slate-500">Analytics charts coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
