import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/security/compliance/exports',
)({
  component: ComplianceExports,
})

const mockReports = [
  { id: 'rpt_1', name: 'SOC 2 Type II Report', generated: '2025-01-15', format: 'PDF', status: 'ready' },
  { id: 'rpt_2', name: 'GDPR Data Processing Record', generated: '2025-01-10', format: 'CSV', status: 'ready' },
  { id: 'rpt_3', name: 'Audit Log Export', generated: '2025-01-08', format: 'JSON', status: 'ready' },
]

function ComplianceExports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Compliance Exports</h1>
        <p className="text-sm text-slate-400 mt-1">Generate and download compliance reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Report Type</label>
              <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>SOC 2 Type II</option>
                <option>GDPR Data Processing</option>
                <option>Audit Log Export</option>
                <option>ISO 27001 Evidence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Date Range</label>
              <div className="flex gap-2">
                <input type="date" className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                <input type="date" className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Generate Report
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.map((rpt) => (
              <div
                key={rpt.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{rpt.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{rpt.generated} · {rpt.format}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{rpt.status}</Badge>
                  <button
                    type="button"
                    className="rounded border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
