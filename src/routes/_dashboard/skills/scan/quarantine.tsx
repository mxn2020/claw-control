import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/skills/scan/quarantine')({
  component: SkillScanQuarantine,
})

const mockQuarantined = [
  {
    id: 'sk_4',
    name: 'file-manager',
    version: '1.1.0',
    reason: 'Unrestricted filesystem access detected',
    flagged: '2025-01-14',
  },
  {
    id: 'sk_8',
    name: 'network-scanner',
    version: '0.3.2',
    reason: 'Port scanning capability violates policy',
    flagged: '2025-01-12',
  },
]

function SkillScanQuarantine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Quarantine</h1>
        <p className="text-sm text-slate-400 mt-1">Flagged skills awaiting review</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quarantined Skills ({mockQuarantined.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockQuarantined.map((sk) => (
              <div
                key={sk.id}
                className="rounded-lg border border-red-900/50 bg-red-950/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-medium text-white">{sk.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="danger">quarantined</Badge>
                    <span className="text-xs text-slate-400">{sk.flagged}</span>
                  </div>
                </div>
                <p className="text-xs text-red-400">{sk.reason}</p>
                <p className="text-xs text-slate-400 mt-1">v{sk.version}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    className="rounded border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    Review
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-700 px-3 py-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
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
