import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/catalog')({ component: AgentCatalog })

function AgentCatalog() {
  const blueprints = useQuery(api.blueprints.list, {})
  const bpList = blueprints ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Agent Catalog</h1><p className="text-sm text-slate-400 mt-1">{bpList.length} agent blueprints available</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bpList.length === 0 && <p className="text-sm text-slate-500 text-center py-6 col-span-full">No blueprints found.</p>}
        {bpList.map(bp => (
          <Card key={bp._id} className="hover:border-cyan-500/50 transition-colors">
            <CardHeader><CardTitle>{bp.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400 mb-2">{bp.description ?? 'No description'}</p>
              <div className="flex gap-2"><Badge variant="info">{bp.deployCount} deploys</Badge></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
