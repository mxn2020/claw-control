import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/providers')({ component: InstanceConfigProviders })
function InstanceConfigProviders() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Providers</h1><p className="text-sm text-slate-400 mt-1">LLM provider configuration</p></div>
      <Card><CardHeader><CardTitle>Provider Settings</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">LLM provider API keys, endpoints, and fallback configuration are managed on the VPS instance. Connect a running instance to configure providers.</p></CardContent></Card>
    </div>
  )
}
