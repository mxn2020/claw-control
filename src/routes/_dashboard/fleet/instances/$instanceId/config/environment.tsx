import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/environment')({ component: InstanceConfigEnv })
function InstanceConfigEnv() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Environment Variables</h1><p className="text-sm text-slate-400 mt-1">Manage environment configuration</p></div>
      <Card><CardHeader><CardTitle>Environment</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Environment variables are managed on the VPS instance. Connect a running instance to view and edit environment configuration.</p></CardContent></Card>
    </div>
  )
}
