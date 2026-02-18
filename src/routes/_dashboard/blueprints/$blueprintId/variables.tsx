import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/variables',
)({
  component: BlueprintVariables,
})

const mockVariables = [
  { key: 'SUPPORT_EMAIL', defaultValue: 'support@acme.com', description: 'Primary support email address', required: true },
  { key: 'MAX_RESPONSE_LEN', defaultValue: '500', description: 'Maximum response length in tokens', required: false },
  { key: 'TONE', defaultValue: 'professional', description: 'Agent communication tone', required: false },
  { key: 'ESCALATION_THRESHOLD', defaultValue: '3', description: 'Failed attempts before escalation', required: true },
]

function BlueprintVariables() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Template Variables</h1>
        <p className="text-sm text-slate-400 mt-1">Variable definitions for blueprint {blueprintId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockVariables.map((v) => (
              <div
                key={v.key}
                className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm text-cyan-400">{v.key}</span>
                  <Badge variant={v.required ? 'warning' : 'default'}>{v.required ? 'required' : 'optional'}</Badge>
                </div>
                <p className="text-xs text-slate-400">{v.description}</p>
                <p className="text-xs text-slate-500 mt-1">Default: <span className="font-mono text-slate-300">{v.defaultValue}</span></p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
