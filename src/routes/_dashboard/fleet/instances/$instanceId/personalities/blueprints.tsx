import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/personalities/blueprints')({ component: InstancePersonalityBlueprints })
function InstancePersonalityBlueprints() {
  const blueprints = useQuery(api.blueprints.list, {})
  const list = blueprints ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Personality Blueprints</h1><p className="text-sm text-slate-400 mt-1">{list.length} blueprints available</p></div>
      <Card><CardHeader><CardTitle>Blueprints</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">
          {list.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No blueprints found.</p>}
          {list.map(bp => (
            <div key={bp._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
              <div><span className="text-sm font-medium text-white">{bp.name}</span><p className="text-xs text-slate-400">{bp.description ?? 'No description'}</p></div>
              <Badge variant="info">{bp.deployCount} deploys</Badge>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
