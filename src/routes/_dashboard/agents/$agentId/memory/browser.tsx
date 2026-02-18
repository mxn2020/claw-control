import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, FolderTree, FileText, Folder } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/memory/browser',
)({
  component: AgentMemoryBrowser,
})

const mockFiles = [
  { type: 'dir', path: '/memory/sessions/', entries: 142, size: '18.6 KB' },
  { type: 'dir', path: '/memory/embeddings/', entries: 1024, size: '4.2 MB' },
  { type: 'file', path: '/memory/facts.json', entries: 38, size: '2.4 KB' },
  { type: 'file', path: '/memory/preferences.json', entries: 12, size: '1.1 KB' },
  { type: 'file', path: '/memory/context.md', entries: null, size: '3.7 KB' },
]

function AgentMemoryBrowser() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/memory"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Memory
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Memory Browser</h1>
        <p className="text-sm text-slate-400 mt-1">
          File explorer for agent {agentId} workspace
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-cyan-400" />
            <CardTitle>Workspace</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockFiles.map((file) => (
              <button
                key={file.path}
                type="button"
                className="w-full flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-left hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {file.type === 'dir' ? (
                    <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  )}
                  <span className="text-sm font-mono text-slate-200">{file.path}</span>
                  {file.type === 'dir' && (
                    <Badge variant="info">{file.entries} entries</Badge>
                  )}
                </div>
                <span className="text-xs text-slate-400">{file.size}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
