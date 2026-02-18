import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/observe/analytics/activity')({
  component: AnalyticsActivity,
})

const HOURS = ['00', '04', '08', '12', '16', '20']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function AnalyticsActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Activity Heatmap</h1>
        <p className="text-sm text-slate-400 mt-1">Agent activity by day and hour</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <div className="flex gap-1 mb-1 ml-10">
                {HOURS.map((h) => (
                  <div key={h} className="flex-1 text-center text-xs text-slate-500">{h}h</div>
                ))}
              </div>
              {DAYS.map((day) => (
                <div key={day} className="flex items-center gap-1 mb-1">
                  <span className="w-10 text-xs text-slate-400 shrink-0">{day}</span>
                  {HOURS.map((h) => {
                    const intensity = Math.random()
                    const opacity = Math.round(intensity * 10) * 10
                    return (
                      <div
                        key={h}
                        className="flex-1 h-6 rounded-sm bg-cyan-500"
                        style={{ opacity: opacity / 100 }}
                        title={`${day} ${h}h`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-slate-400">Low</span>
            <div className="flex gap-0.5">
              {[10, 30, 50, 70, 90].map((o) => (
                <div key={o} className="w-5 h-3 rounded-sm bg-cyan-500" style={{ opacity: o / 100 }} />
              ))}
            </div>
            <span className="text-xs text-slate-400">High</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
