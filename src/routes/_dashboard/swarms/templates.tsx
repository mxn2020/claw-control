import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/swarms/templates')({
  component: SwarmTemplates,
})

const mockTemplates = [
  {
    id: 'tpl_1',
    name: 'Support Factory',
    description: 'Multi-agent support swarm with escalation tiers',
    agents: 8,
    instances: 2,
    tier: 'μ-tier',
  },
  {
    id: 'tpl_2',
    name: 'Research Cluster',
    description: 'Parallel research agents with synthesis coordinator',
    agents: 5,
    instances: 1,
    tier: 'λ-tier',
  },
  {
    id: 'tpl_3',
    name: 'Trading Floor',
    description: 'High-frequency trading agents with risk management',
    agents: 12,
    instances: 4,
    tier: 'Ω-tier',
  },
  {
    id: 'tpl_4',
    name: 'Dev Pipeline',
    description: 'Code review, testing, and deployment automation',
    agents: 6,
    instances: 2,
    tier: 'μ-tier',
  },
]

function SwarmTemplates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swarm Templates</h1>
        <p className="text-sm text-slate-400 mt-1">Pre-built swarm topology templates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTemplates.map((tpl) => (
          <Card key={tpl.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{tpl.name}</CardTitle>
                <Badge variant="info">{tpl.tier}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">{tpl.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>{tpl.agents} agents</span>
                <span>{tpl.instances} instances</span>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-cyan-500 transition-colors"
                >
                  Deploy Template
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
