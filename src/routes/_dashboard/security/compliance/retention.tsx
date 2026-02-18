import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/security/compliance/retention',
)({
  component: ComplianceRetention,
})

const mockPolicies = [
  { id: 'pol_1', name: 'Session Logs', retention: '90 days', scope: 'all instances', status: 'active' },
  { id: 'pol_2', name: 'Audit Logs', retention: '2 years', scope: 'all instances', status: 'active' },
  { id: 'pol_3', name: 'Tool Call Traces', retention: '30 days', scope: 'production', status: 'active' },
  { id: 'pol_4', name: 'User Data', retention: '1 year', scope: 'EU instances', status: 'active' },
]

function ComplianceRetention() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Retention Policies</h1>
        <p className="text-sm text-slate-400 mt-1">Log and session data retention policies</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPolicies.map((pol) => (
              <div
                key={pol.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{pol.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Retain for <span className="text-amber-400">{pol.retention}</span> · scope: {pol.scope}
                  </p>
                </div>
                <Badge variant="success">{pol.status}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Add Policy
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
