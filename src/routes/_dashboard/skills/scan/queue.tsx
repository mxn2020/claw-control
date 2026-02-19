import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/skills/scan/queue')({
  component: SkillScanQueue,
})

const mockQueue = [
  { id: 'sk_5', name: 'browser-automation', version: '1.0.0', submitted: '5 min ago', priority: 'high' },
  { id: 'sk_6', name: 'db-query', version: '2.1.3', submitted: '12 min ago', priority: 'medium' },
  { id: 'sk_7', name: 'pdf-reader', version: '0.9.1', submitted: '30 min ago', priority: 'low' },
]

const priorityVariant = (p: string) => {
  if (p === 'high') return 'danger' as const
  if (p === 'medium') return 'warning' as const
  return 'default' as const
}

function SkillScanQueue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Scan Queue</h1>
        <p className="text-sm text-slate-400 mt-1">Pending skill security scans</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue ({mockQueue.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockQueue.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-white">{item.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">v{item.version} · Submitted {item.submitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={priorityVariant(item.priority)}>{item.priority}</Badge>
                  <Badge variant="warning">pending</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
