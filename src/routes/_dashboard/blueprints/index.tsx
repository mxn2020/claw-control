import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

import { FileCode, Plus, Rocket, Wrench } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/blueprints/')({
  component: BlueprintsLibrary,
})

const mockBlueprints = [
  {
    id: 'bp_1',
    name: 'Customer Support Agent',
    description:
      'A general-purpose support agent with escalation workflows and multi-channel routing.',
    deployCount: 12,
    skills: ['web-search', 'email-sender', 'code-interpreter'],
  },
  {
    id: 'bp_2',
    name: 'Research Assistant',
    description:
      'Deep research agent with web search, summarization, and citation tracking.',
    deployCount: 5,
    skills: ['web-search', 'file-manager'],
  },
]

function BlueprintsLibrary() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blueprints</h1>
          <p className="text-sm text-slate-400 mt-1">
            Reusable agent templates and configurations
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">
          <Plus className="w-4 h-4" />
          New Blueprint
        </button>
      </div>

      {/* Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBlueprints.map((bp) => (
          <Link
            key={bp.id}
            to="/blueprints/$blueprintId"
            params={{ blueprintId: bp.id }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all duration-200 cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-cyan-400" />
                  <CardTitle className="text-base">{bp.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">{bp.description}</p>
                <div className="flex items-center gap-2">
                  <Rocket className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {bp.deployCount} deployments
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bp.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 text-xs bg-slate-900 text-slate-300 px-2 py-1 rounded"
                    >
                      <Wrench className="w-3 h-3 text-slate-400" />
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
