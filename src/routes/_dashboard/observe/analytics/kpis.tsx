import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/observe/analytics/kpis')({
  component: AnalyticsKPIs,
})

function AnalyticsKPIs() {
  const stats = useQuery(api.platform.getStats, {})

  const kpis = [
    { label: 'Total Instances', value: stats?.totalInstances ?? 0 },
    { label: 'Online Instances', value: stats?.onlineInstances ?? 0 },
    { label: 'Total Agents', value: stats?.totalAgents ?? 0 },
    { label: 'Active Agents', value: stats?.activeAgents ?? 0 },
    { label: 'Total Sessions', value: stats?.totalSessions ?? 0 },
    { label: 'Active Sessions', value: stats?.activeSessions ?? 0 },
    { label: 'Total Skills', value: stats?.totalSkills ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Key Performance Indicators</h1>
        <p className="text-sm text-slate-400 mt-1">Fleet-wide metrics dashboard</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{kpi.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
