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
  Wrench,
  Save,
  Terminal,
  FileText,
  Pencil,
  Edit3,
  Globe,
  LayoutDashboard,
  Clock,
  Network,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/tools',
)({
  component: ToolsConfig,
})

const mockTools = [
  { id: 'exec', name: 'Exec', description: 'Execute shell commands', icon: Terminal, enabled: true },
  { id: 'read', name: 'Read', description: 'Read files from filesystem', icon: FileText, enabled: true },
  { id: 'write', name: 'Write', description: 'Write files to filesystem', icon: Pencil, enabled: true },
  { id: 'edit', name: 'Edit', description: 'Edit existing files in-place', icon: Edit3, enabled: true },
  { id: 'browser', name: 'Browser', description: 'Browse and interact with web pages', icon: Globe, enabled: true },
  { id: 'canvas', name: 'Canvas', description: 'Visual canvas rendering', icon: LayoutDashboard, enabled: false },
  { id: 'cron', name: 'Cron', description: 'Schedule recurring tasks', icon: Clock, enabled: true },
  { id: 'nodes', name: 'Nodes', description: 'Inter-node communication', icon: Network, enabled: false },
]

function ToolsConfig() {
  const { instanceId } = Route.useParams()
  const enabledCount = mockTools.filter((t) => t.enabled).length

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
          <Wrench className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Tools</h1>
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
              <CardTitle>Tool Allow / Deny List</CardTitle>
              <CardDescription className="mt-1">
                Toggle which tools agents on this instance are permitted to use
              </CardDescription>
            </div>
            <Badge variant="info">
              {enabledCount} of {mockTools.length} enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <tool.icon className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{tool.name}</span>
                      <Badge variant={tool.enabled ? 'success' : 'danger'}>
                        {tool.enabled ? 'allowed' : 'denied'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{tool.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={tool.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-600 peer-checked:bg-cyan-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
