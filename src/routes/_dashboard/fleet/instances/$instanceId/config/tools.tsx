import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/tools')({ component: InstanceConfigTools })
function InstanceConfigTools() {
  const skills = useQuery(api.platform.list, {})
  const list = skills ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Tools Configuration</h1><p className="text-sm text-slate-400 mt-1">{list.length} tools available</p></div>
      <Card><CardHeader><CardTitle>Tools</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No tools configured.</p>}
          {list.map(s => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-mono text-white">{s.name}</span><p className="text-xs text-slate-400">v{s.version}</p></div>
              <Badge variant={s.isEnabled ? 'success' : 'default'}>{s.isEnabled ? 'enabled' : 'disabled'}</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
