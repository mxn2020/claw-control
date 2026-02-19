import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/observe/analytics/tools')({
  component: AnalyticsTools,
})

const mockTools = [
  { name: 'web-search', calls: 48_320, successRate: '98.2%' },
  { name: 'code-interpreter', calls: 21_440, successRate: '94.7%' },
  { name: 'email-sender', calls: 12_810, successRate: '99.1%' },
  { name: 'file-manager', calls: 9_330, successRate: '97.5%' },
  { name: 'browser-automation', calls: 6_120, successRate: '91.3%' },
]

function AnalyticsTools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tool Usage</h1>
        <p className="text-sm text-slate-400 mt-1">Most-called tools and skills fleet-wide</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTools.map((tool, i) => (
              <div
                key={tool.name}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-500 w-4">#{i + 1}</span>
                  <div>
                    <span className="font-mono text-sm text-white">{tool.name}</span>
                    <p className="text-xs text-slate-400 mt-0.5">{tool.calls.toLocaleString()} calls</p>
                  </div>
                </div>
                <Badge variant="success">{tool.successRate}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
