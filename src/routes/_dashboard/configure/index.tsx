import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Cpu, Settings, Plug, Server } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/configure/')({
  component: PlatformConfiguration,
})

function PlatformConfiguration() {
  const stats = useQuery(api.platform.getStats, {})
  const channels = useQuery(api.platform.listChannels, {})

  const channelCount = channels?.length ?? 0
  const skillCount = stats?.totalSkills ?? 0
  const instanceCount = stats?.totalInstances ?? 0

  const sections = [
    {
      title: 'Providers',
      description: 'Configure LLM API keys and provider settings.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      detail: `${instanceCount} instance${instanceCount !== 1 ? 's' : ''} with provider configs`,
    },
    {
      title: 'Defaults',
      description: 'Set default model, temperature, and token limits.',
      icon: <Settings className="w-5 h-5 text-amber-400" />,
      detail: `${skillCount} skill${skillCount !== 1 ? 's' : ''} available`,
    },
    {
      title: 'Integrations',
      description: 'Connect third-party services and data sources.',
      icon: <Plug className="w-5 h-5 text-emerald-400" />,
      detail: `${channelCount} channel${channelCount !== 1 ? 's' : ''} configured`,
    },
    {
      title: 'Self-Hosting',
      description: 'Manage self-hosted deployment configuration.',
      icon: <Server className="w-5 h-5 text-purple-400" />,
      detail: `${instanceCount} instance${instanceCount !== 1 ? 's' : ''} deployed`,
    },
  ]

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
              <div className="min-h-[40px] rounded-lg border border-slate-700 bg-slate-900 p-4">
                <p className="text-sm text-slate-300">
                  {section.detail}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
