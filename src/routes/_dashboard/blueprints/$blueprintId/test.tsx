import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/test',
)({
  component: BlueprintTest,
})

const mockRuns = [
  { id: 'run_1', input: 'Hello, I need help with my order', status: 'passed', duration: '1.2s' },
  { id: 'run_2', input: 'Can I get a refund?', status: 'passed', duration: '0.9s' },
  { id: 'run_3', input: 'Translate this to French: good morning', status: 'failed', duration: '2.1s' },
]

function BlueprintTest() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Sandbox Test</h1>
        <p className="text-sm text-slate-400 mt-1">Test blueprint {blueprintId} in a sandboxed environment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <textarea
              rows={4}
              placeholder="Enter a test message to send to the blueprint…"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
              >
                Run Test
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <p className="text-sm text-white truncate max-w-xs">{run.input}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Duration: {run.duration}</p>
                </div>
                <Badge variant={run.status === 'passed' ? 'success' : 'danger'}>{run.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
