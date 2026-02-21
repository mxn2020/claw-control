import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Cpu } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/model/provider',
)({
  component: AgentModelProvider,
})

const providers = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    selected: true,
    selectedModel: 'gpt-4o',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-3.5-sonnet', 'claude-3-haiku', 'claude-3-opus'],
    selected: false,
    selectedModel: '',
  },
  {
    id: 'google',
    name: 'Google',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash'],
    selected: false,
    selectedModel: '',
  },
]

function AgentModelProvider() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <DemoDataBanner />
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
          Select the provider and model for agent {agentId}
        </p>
      </div>

      <div className="space-y-4">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            className={provider.selected ? 'border-cyan-500/50' : ''}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-base">{provider.name}</CardTitle>
                </div>
                {provider.selected && <Badge variant="success">active</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {provider.models.map((model) => (
                  <button
                    key={model}
                    type="button"
                    className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors ${
                      provider.selectedModel === model
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
