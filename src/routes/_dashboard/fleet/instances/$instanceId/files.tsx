import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/files')({ component: InstanceFiles })
function InstanceFiles() {
  const { instanceId } = Route.useParams()
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Files</h1><p className="text-sm text-slate-400 mt-1">Instance {instanceId} file browser</p></div>
      <Card><CardHeader><CardTitle>File Browser</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">File browsing requires VPS agent connectivity. Connect a running instance to browse, upload, and manage files on the agent's filesystem.</p></CardContent></Card>
    </div>
  )
}
