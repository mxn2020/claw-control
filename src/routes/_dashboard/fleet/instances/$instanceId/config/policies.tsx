import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/policies')({ component: InstanceConfigPolicies })
function InstanceConfigPolicies() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Policies</h1><p className="text-sm text-slate-400 mt-1">Security and execution policies</p></div>
      <Card><CardHeader><CardTitle>Policy Configuration</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Security policies, sandbox rules, and execution constraints are managed on the VPS instance. Connect a running instance to configure policies.</p></CardContent></Card>
    </div>
  )
}
