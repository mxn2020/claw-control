import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/security/compliance/regions')({
  component: ComplianceRegions,
})

const mockRegions = [
  { region: 'us-east-1', name: 'US East (N. Virginia)', dataTypes: ['user data', 'sessions'], status: 'active' },
  { region: 'eu-west-1', name: 'EU West (Ireland)', dataTypes: ['GDPR-scoped data'], status: 'active' },
  { region: 'ap-southeast-1', name: 'AP Southeast (Singapore)', dataTypes: ['APAC data'], status: 'active' },
  { region: 'us-west-2', name: 'US West (Oregon)', dataTypes: ['backups'], status: 'standby' },
]

function ComplianceRegions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Data Residency</h1>
        <p className="text-sm text-slate-400 mt-1">Regional data residency map and policies</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRegions.map((r) => (
              <div
                key={r.region}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{r.name}</span>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">{r.region}</p>
                  <div className="flex gap-1 mt-1">
                    {r.dataTypes.map((dt) => (
                      <span key={dt} className="text-xs text-cyan-400 bg-cyan-950/40 rounded px-1.5 py-0.5">{dt}</span>
                    ))}
                  </div>
                </div>
                <Badge variant={r.status === 'active' ? 'success' : 'default'}>{r.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
