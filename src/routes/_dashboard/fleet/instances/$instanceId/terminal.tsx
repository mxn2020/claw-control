import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/terminal')({ component: InstanceTerminal })
function InstanceTerminal() {
  const { instanceId } = Route.useParams()
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Terminal</h1><p className="text-sm text-slate-400 mt-1">Instance {instanceId}</p></div>
      <Card><CardHeader><CardTitle>Terminal Access</CardTitle></CardHeader><CardContent>
        <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-4 font-mono text-xs text-green-400 min-h-[400px]">
          <p>$ Connecting to instance {instanceId}...</p>
          <p className="text-slate-500 mt-2">Terminal access requires VPS agent connectivity.</p>
        </div>
      </CardContent></Card>
    </div>
  )
}
