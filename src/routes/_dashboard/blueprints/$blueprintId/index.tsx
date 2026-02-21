import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

import {
  FileCode,
  Rocket,
  Play,
  History,
  Brain,
  Wrench,
  Zap,
  Radio,
  Variable,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/blueprints/$blueprintId/')({
  component: BlueprintDetail,
})

const editorSections = [
  {
    label: 'Personality',
    icon: <Brain className="w-4 h-4 text-purple-400" />,
    placeholder: 'Define the agent persona, tone, and behavioral guidelines…',
  },
  {
    label: 'Tools',
    icon: <Wrench className="w-4 h-4 text-cyan-400" />,
    placeholder: 'Configure MCP tool servers and tool access policies…',
  },
  {
    label: 'Skills',
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    placeholder: 'Attach skills from the skill inventory…',
  },
  {
    label: 'Channels',
    icon: <Radio className="w-4 h-4 text-blue-400" />,
    placeholder: 'Select which channels this agent will be available on…',
  },
  {
    label: 'Variables',
    icon: <Variable className="w-4 h-4 text-emerald-400" />,
    placeholder: 'Define environment variables and secrets…',
  },
]

function BlueprintDetail() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCode className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">
              Customer Support Agent
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Blueprint {blueprintId} — Reusable agent template
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors">
            <Play className="w-4 h-4" />
            Test
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">
            <Rocket className="w-4 h-4" />
            Deploy
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors">
            <History className="w-4 h-4" />
            Versions
          </button>
        </div>
      </div>

      {/* Editor Sections */}
      <div className="space-y-4">
        {editorSections.map((section) => (
          <Card key={section.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {section.icon}
                <CardTitle className="text-sm">{section.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[80px] rounded-lg border border-dashed border-slate-700 bg-slate-900 p-4">
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
