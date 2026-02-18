import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/skills/scan/results')({
  component: SkillScanResults,
})

const mockResults = [
  { id: 'sk_1', name: 'web-search', version: '1.2.0', risk: 'low', result: 'passed', scanned: '2025-01-15' },
  { id: 'sk_2', name: 'code-interpreter', version: '2.0.1', risk: 'high', result: 'passed', scanned: '2025-01-15' },
  { id: 'sk_3', name: 'email-sender', version: '1.0.3', risk: 'medium', result: 'passed', scanned: '2025-01-14' },
  { id: 'sk_4', name: 'file-manager', version: '1.1.0', risk: 'high', result: 'failed', scanned: '2025-01-14' },
]

const riskVariant = (r: string) => {
  if (r === 'low') return 'success' as const
  if (r === 'medium') return 'warning' as const
  return 'danger' as const
}

function SkillScanResults() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Scan Results</h1>
        <p className="text-sm text-slate-400 mt-1">Completed scan results with risk ratings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockResults.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="font-mono text-sm text-white">{r.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">v{r.version} · Scanned {r.scanned}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={riskVariant(r.risk)}>{r.risk} risk</Badge>
                  <Badge variant={r.result === 'passed' ? 'success' : 'danger'}>{r.result}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
