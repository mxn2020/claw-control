import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/security/compliance/')({
  component: ComplianceOverview,
})

function ComplianceOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Compliance</h1>
        <p className="text-sm text-slate-400 mt-1">Compliance status overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'SOC 2', status: 'compliant' },
          { label: 'GDPR', status: 'compliant' },
          { label: 'HIPAA', status: 'review' },
          { label: 'ISO 27001', status: 'compliant' },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-white">{item.label}</p>
              <Badge
                variant={item.status === 'compliant' ? 'success' : 'warning'}
                className="mt-2"
              >
                {item.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'GDPR audit completed', date: '2025-01-15', status: 'passed' },
              { action: 'Data residency policy updated', date: '2025-01-10', status: 'info' },
              { action: 'HIPAA review initiated', date: '2025-01-08', status: 'pending' },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <div>
                  <span className="text-sm text-white">{row.action}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{row.date}</p>
                </div>
                <Badge variant={row.status === 'passed' ? 'success' : row.status === 'pending' ? 'warning' : 'info'}>
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
