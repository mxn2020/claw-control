import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/blueprints/$blueprintId/variables')({ component: BlueprintVariables })
function BlueprintVariables() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Blueprint Variables</h1><p className="text-sm text-slate-400 mt-1">Template variables for this blueprint</p></div>
      <Card><CardHeader><CardTitle>Variables</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Blueprint variables allow customization when deploying. Variables are defined in the blueprint and can be overridden per-deployment.</p></CardContent></Card>
    </div>
  )
}
