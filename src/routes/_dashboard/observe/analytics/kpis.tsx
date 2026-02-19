import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/observe/analytics/kpis')({
  component: AnalyticsKPIs,
})

const mockKPIs = [
  { name: 'Customer Satisfaction', value: '94.2%', target: '90%', status: 'on-track' },
  { name: 'First Response Time', value: '1m 12s', target: '< 2m', status: 'on-track' },
  { name: 'Resolution Rate', value: '87.4%', target: '90%', status: 'at-risk' },
  { name: 'Escalation Rate', value: '3.1%', target: '< 5%', status: 'on-track' },
  { name: 'Cost per Session', value: '$0.08', target: '< $0.10', status: 'on-track' },
]

function AnalyticsKPIs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">KPI Widgets</h1>
        <p className="text-sm text-slate-400 mt-1">Custom business metric widgets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockKPIs.map((kpi) => (
          <Card key={kpi.name}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{kpi.name}</p>
              <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-slate-500">Target: {kpi.target}</span>
                <Badge variant={kpi.status === 'on-track' ? 'success' : 'warning'}>{kpi.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
