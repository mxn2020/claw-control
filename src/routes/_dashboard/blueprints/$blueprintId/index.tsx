import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  FileCode,
  Rocket,
  Brain,
  Wrench,
  Zap,
  Radio,
  Variable,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/blueprints/$blueprintId/')({
  component: BlueprintDetail,
})

function BlueprintDetail() {
  const { blueprintId } = Route.useParams()
  const blueprint = useQuery(api.blueprints.get, { id: blueprintId as Id<"blueprints"> })

  if (!blueprint) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading blueprint…</span>
      </div>
    )
  }

  const sections = [
    {
      label: 'Personality',
      icon: <Brain className="w-4 h-4 text-purple-400" />,
      content: blueprint.personality?.soulMd ?? 'Not configured',
      hasContent: !!blueprint.personality?.soulMd,
    },
    {
      label: 'Tools',
      icon: <Wrench className="w-4 h-4 text-cyan-400" />,
      content: blueprint.toolsConfig
        ? `Allowed: ${blueprint.toolsConfig.allowed?.join(', ') ?? 'all'}, Denied: ${blueprint.toolsConfig.denied?.join(', ') ?? 'none'}`
        : 'No tool configuration',
      hasContent: !!blueprint.toolsConfig,
    },
    {
      label: 'Skills',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      content: blueprint.skills?.join(', ') ?? 'No skills attached',
      hasContent: (blueprint.skills?.length ?? 0) > 0,
    },
    {
      label: 'Channels',
      icon: <Radio className="w-4 h-4 text-blue-400" />,
      content: blueprint.channels?.join(', ') ?? 'No channels configured',
      hasContent: (blueprint.channels?.length ?? 0) > 0,
    },
    {
      label: 'Variables',
      icon: <Variable className="w-4 h-4 text-emerald-400" />,
      content:
        blueprint.variables?.map((v) => `${v.key}=${v.defaultValue ?? '""'}`).join(', ') ??
        'No variables defined',
      hasContent: (blueprint.variables?.length ?? 0) > 0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCode className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">
              {blueprint.name}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {blueprint.description ?? 'No description'}
              {' · '}
              <Badge variant="outline" className="text-xs">
                {blueprint.deployCount} deploy{blueprint.deployCount !== 1 ? 's' : ''}
              </Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">
            <Rocket className="w-4 h-4" />
            Deploy
          </button>
        </div>
      </div>

      {/* Editor Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {section.icon}
                <CardTitle className="text-sm">{section.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`min-h-[60px] rounded-lg border p-4 ${section.hasContent
                    ? 'border-slate-700 bg-slate-900'
                    : 'border-dashed border-slate-700 bg-slate-900'
                  }`}
              >
                <p
                  className={`text-sm ${section.hasContent ? 'text-slate-300' : 'text-slate-500'}`}
                >
                  {section.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
