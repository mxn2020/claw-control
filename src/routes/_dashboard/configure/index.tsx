import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Cpu, Settings, Plug, Server } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/configure/')({
  component: PlatformConfiguration,
})

const sections = [
  {
    title: 'Providers',
    description: 'Configure LLM API keys and provider settings.',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    placeholder:
      'OpenAI, Anthropic, Google, and other LLM provider API keys and endpoints.',
  },
  {
    title: 'Defaults',
    description: 'Set default model, temperature, and token limits.',
    icon: <Settings className="w-5 h-5 text-amber-400" />,
    placeholder:
      'Default model selection, temperature, max tokens, and retry policies.',
  },
  {
    title: 'Integrations',
    description: 'Connect third-party services and data sources.',
    icon: <Plug className="w-5 h-5 text-emerald-400" />,
    placeholder:
      'GitHub, Jira, Confluence, Notion, and other service integrations.',
  },
  {
    title: 'Self-Hosting',
    description: 'Manage self-hosted deployment configuration.',
    icon: <Server className="w-5 h-5 text-purple-400" />,
    placeholder:
      'Docker, Kubernetes, networking, storage, and compute settings.',
  },
]

function PlatformConfiguration() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configure</h1>
        <p className="text-sm text-slate-400 mt-1">
          Platform-wide configuration and provider settings
        </p>
      </div>

      {/* Configuration Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {section.icon}
                <div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[60px] rounded-lg border border-dashed border-slate-700 bg-slate-900 p-4">
                <p className="text-sm text-slate-500">
                  {section.placeholder}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
