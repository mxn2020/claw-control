import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Wrench, CheckSquare, Square } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/tools/allowed',
)({
  component: AgentToolsAllowed,
})

const mockTools = [
  { name: 'exec', description: 'Execute shell commands', allowed: true, inherited: true },
  { name: 'read', description: 'Read files and resources', allowed: true, inherited: true },
  { name: 'write', description: 'Write and create files', allowed: false, inherited: false },
  { name: 'edit', description: 'Edit existing files', allowed: true, inherited: false },
  { name: 'browser', description: 'Web browsing and scraping', allowed: true, inherited: true },
  { name: 'canvas', description: 'Visual canvas rendering', allowed: false, inherited: true },
  { name: 'cron', description: 'Scheduled task execution', allowed: false, inherited: false },
  { name: 'nodes', description: 'Node graph operations', allowed: true, inherited: true },
]

function AgentToolsAllowed() {
  const { agentId } = Route.useParams()

  const enabledCount = mockTools.filter((t) => t.allowed).length

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/tools"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Allow / Deny Grid</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure per-tool access for agent {agentId}
          </p>
        </div>
        <Badge variant="info">{enabledCount}/{mockTools.length} enabled</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <CardTitle>Tools</CardTitle>
          </div>
          <CardDescription>
            Toggle tool permissions. Inherited tools follow instance defaults.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mockTools.map((tool) => (
              <button
                key={tool.name}
                type="button"
                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                  tool.allowed
                    ? 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50'
                    : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                }`}
              >
                {tool.allowed ? (
                  <CheckSquare className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-medium text-white">{tool.name}</span>
                    {tool.inherited ? (
                      <Badge variant="info">inherited</Badge>
                    ) : (
                      <Badge variant="warning">override</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
