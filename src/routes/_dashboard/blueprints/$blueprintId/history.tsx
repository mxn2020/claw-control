import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/history',
)({
  component: BlueprintHistory,
})

const mockVersions = [
  { version: 'v3.0', date: '2025-01-15', author: 'alice@acme.com', notes: 'Added escalation logic', current: true },
  { version: 'v2.4', date: '2025-01-10', author: 'bob@acme.com', notes: 'Updated tone guidelines', current: false },
  { version: 'v2.3', date: '2025-01-05', author: 'alice@acme.com', notes: 'Fixed routing rule edge case', current: false },
  { version: 'v2.0', date: '2024-12-20', author: 'carol@acme.com', notes: 'Major refactor', current: false },
]

function BlueprintHistory() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Version History</h1>
        <p className="text-sm text-slate-400 mt-1">Version history and diff viewer for blueprint {blueprintId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Versions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockVersions.map((v) => (
              <div
                key={v.version}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-white">{v.version}</span>
                    {v.current && <Badge variant="success">current</Badge>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{v.date} · {v.author}</p>
                  <p className="text-xs text-slate-300 mt-0.5">{v.notes}</p>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  View Diff
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diff Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 border border-dashed border-slate-700 rounded-lg">
            <p className="text-sm text-slate-500">Select two versions to compare</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
