import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Wrench,
  Shield,
  CheckSquare,
  Square,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/')({
  component: AgentToolsIndex,
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

const mockSandboxMode = true

function AgentToolsIndex() {
  const { agentId } = Route.useParams()

  const enabledCount = mockTools.filter((t) => t.allowed).length
  const overriddenCount = mockTools.filter((t) => !t.inherited).length

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tool Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Agent {agentId} — configure allowed tools and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{enabledCount}/{mockTools.length} enabled</Badge>
          <Badge variant="warning">{overriddenCount} overridden</Badge>
        </div>
      </div>

      {/* Sandbox Mode */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-sm font-medium text-white">Sandbox Mode</span>
                <p className="text-xs text-slate-400 mt-0.5">
                  When enabled, all tool executions run in an isolated sandbox environment.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mockSandboxMode ? 'bg-cyan-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mockSandboxMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tool Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <CardTitle>Allow / Deny Grid</CardTitle>
          </div>
          <CardDescription>
            Toggle tool permissions for this agent. Inherited tools follow instance defaults.
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
