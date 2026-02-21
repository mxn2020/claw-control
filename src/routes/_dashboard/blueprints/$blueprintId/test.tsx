import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/blueprints/$blueprintId/test')({ component: BlueprintTest })
function BlueprintTest() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Blueprint Test</h1><p className="text-sm text-slate-400 mt-1">Test this blueprint in a sandboxed environment</p></div>
      <Card><CardHeader><CardTitle>Test Environment</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Blueprint testing requires VPS agent connectivity. Connect a running instance to deploy and test this blueprint in a sandbox.</p></CardContent></Card>
    </div>
  )
}
