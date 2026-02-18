import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  FileText,
  Folder,
  ChevronRight,
  Save,
  RotateCcw,
  Pencil,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/files',
)({
  component: InstanceFiles,
})

const mockFiles = [
  {
    name: 'SOUL.md',
    type: 'file' as const,
    size: '2.4 KB',
    modified: '2025-01-14 08:30',
  },
  {
    name: 'AGENTS.md',
    type: 'file' as const,
    size: '1.8 KB',
    modified: '2025-01-13 16:45',
  },
  {
    name: 'USER.md',
    type: 'file' as const,
    size: '956 B',
    modified: '2025-01-12 11:20',
  },
  {
    name: 'config.json',
    type: 'file' as const,
    size: '1.2 KB',
    modified: '2025-01-15 09:00',
  },
  {
    name: 'skills/',
    type: 'folder' as const,
    size: '—',
    modified: '2025-01-10 14:15',
  },
  {
    name: 'logs/',
    type: 'folder' as const,
    size: '—',
    modified: '2025-01-15 09:42',
  },
]

const mockFileContent = `# SOUL.md

You are **support-bot**, a helpful customer support agent deployed on OpenClaw.

## Personality
- Friendly, concise, and empathetic
- Always acknowledge the customer's concern before troubleshooting
- Escalate to a human agent when unsure

## Guardrails
- Never share internal pricing or roadmap details
- Do not make promises about timelines
- Redirect billing questions to the billing team

## Knowledge Sources
- Product documentation (auto-synced)
- FAQ database
- Recent release notes
`

function InstanceFiles() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Files — {instanceId}</h1>
        <p className="text-sm text-slate-400 mt-1">
          Browse and edit files in ~/.openclaw/
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-slate-400">
        <span className="text-slate-300 hover:text-white cursor-pointer">
          ~
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-300 hover:text-white cursor-pointer">
          .openclaw
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-cyan-400">SOUL.md</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">File Tree</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {mockFiles.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  className={`w-full flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-left transition-colors ${
                    file.name === 'SOUL.md'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-slate-700/50 border border-transparent'
                  }`}
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File Content Viewer */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-sm font-mono">SOUL.md</CardTitle>
                <Badge variant="info">Markdown</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Revert
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button size="sm">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 rounded-lg p-4 text-sm text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto min-h-[300px]">
              {mockFileContent}
            </pre>
          </CardContent>

          {/* File Metadata */}
          <div className="border-t border-slate-700 px-6 py-3">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Size: 2.4 KB</span>
              <span>·</span>
              <span>Modified: 2025-01-14 08:30</span>
              <span>·</span>
              <span>Encoding: UTF-8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
