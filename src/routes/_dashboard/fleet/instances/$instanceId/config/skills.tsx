import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Puzzle,
  Plus,
  Trash2,
  Save,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/skills',
)({
  component: SkillsConfig,
})

const mockSkills = [
  { id: 'sk-1', name: 'Web Search', description: 'Search the web for real-time information', installed: true },
  { id: 'sk-2', name: 'Code Execution', description: 'Execute code in a sandboxed environment', installed: true },
  { id: 'sk-3', name: 'Database Query', description: 'Run read-only SQL queries against configured databases', installed: true },
  { id: 'sk-4', name: 'Email Sender', description: 'Send transactional emails via configured SMTP', installed: false },
  { id: 'sk-5', name: 'File Manager', description: 'Read and write files within the agent sandbox', installed: true },
  { id: 'sk-6', name: 'Calendar', description: 'Access and manage calendar events', installed: false },
  { id: 'sk-7', name: 'Knowledge Base', description: 'Query internal knowledge base documents', installed: true },
  { id: 'sk-8', name: 'Image Generation', description: 'Generate images from text prompts', installed: false },
]

function SkillsConfig() {
  const { instanceId } = Route.useParams()
  const installedCount = mockSkills.filter((s) => s.installed).length

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/config"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Puzzle className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Skills Configuration</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Global Skills</CardTitle>
              <CardDescription className="mt-1">
                Install or uninstall skills available to agents on this instance
              </CardDescription>
            </div>
            <Badge variant="info">
              {installedCount} of {mockSkills.length} installed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Puzzle className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <Badge variant={skill.installed ? 'success' : 'danger'}>
                        {skill.installed ? 'installed' : 'not installed'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{skill.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {skill.installed ? (
                    <>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Uninstall
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Install
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
