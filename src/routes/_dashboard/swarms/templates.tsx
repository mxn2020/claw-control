import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/swarms/templates')({ component: SwarmTemplates })
function SwarmTemplates() {
  const blueprints = useQuery(api.blueprints.list, {})
  const bpList = blueprints ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Swarm Templates</h1><p className="text-sm text-slate-400 mt-1">{bpList.length} templates available</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bpList.length === 0 && <p className="text-sm text-slate-400 text-center py-6 col-span-full">No swarm templates. Create one from a blueprint.</p>}
        {bpList.map(bp => (
          <Card key={bp._id} className="hover:border-cyan-500/50 transition-colors">
            <CardHeader><CardTitle>{bp.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400 mb-2">{bp.description ?? 'No description'}</p>
              <Badge variant="info">{bp.deployCount} deploys</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
