import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/personalities/blueprints',
)({
  component: InstancePersonalityBlueprints,
})

const mockBlueprints = [
  { id: 'bp_1', name: 'Customer Support Agent', version: 'v2.1', status: 'active' },
  { id: 'bp_2', name: 'Research Assistant', version: 'v1.0', status: 'draft' },
  { id: 'bp_3', name: 'Code Review Bot', version: 'v3.4', status: 'active' },
  { id: 'bp_4', name: 'Sales Assistant', version: 'v1.2', status: 'inactive' },
]

const statusVariant = (s: string) => {
  if (s === 'active') return 'success' as const
  if (s === 'draft') return 'warning' as const
  return 'default' as const
}

function InstancePersonalityBlueprints() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Blueprint Library</h1>
        <p className="text-sm text-slate-400 mt-1">Personality blueprints available for instance {instanceId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blueprints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBlueprints.map((bp) => (
              <div
                key={bp.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <span className="text-sm font-medium text-white">{bp.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{bp.version}</p>
                </div>
                <Badge variant={statusVariant(bp.status)}>{bp.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
