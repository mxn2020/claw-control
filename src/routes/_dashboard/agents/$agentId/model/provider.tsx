import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Cpu } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/model/provider',
)({
  component: AgentModelProvider,
})

function AgentModelProvider() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const instances = useQuery(api.instances.list, {})

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading provider data…</span>
      </div>
    )
  }

  // Derive available providers from instance config
  const instance = instances?.find((i) => i._id === agent.instanceId)
  const configuredProviders = instance?.config?.providers ?? []

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/model"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Model
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">LLM Provider</h1>
        <p className="text-sm text-slate-400 mt-1">
          Select the provider and model for agent {agent.name}
        </p>
      </div>

      {/* Current Model */}
      <Card className="border-cyan-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Current Model</CardTitle>
            </div>
            <Badge variant="success">active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-cyan-400 font-mono">
            {agent.model ?? 'Not configured'}
          </p>
        </CardContent>
      </Card>

      {/* Available Providers from instance config */}
      {configuredProviders.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-slate-400">
            Available Providers (from instance config)
          </h2>
          {configuredProviders.map((provider) => (
            <Card key={provider}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <CardTitle className="text-base">{provider}</CardTitle>
                  </div>
                  {agent.model?.toLowerCase().includes(provider.toLowerCase()) && (
                    <Badge variant="success">active</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-500">
                  Configured on instance: {instance?.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-slate-500">
            No providers configured on the agent's instance. Add providers in
            instance settings.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
