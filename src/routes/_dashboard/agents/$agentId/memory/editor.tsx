import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, FileText, Save } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/memory/editor',
)({
  component: AgentMemoryEditor,
})

const mockFileContent = `{
  "facts": [
    {
      "id": "f1",
      "text": "User prefers concise responses",
      "source": "session_901",
      "confidence": 0.94,
      "created_at": "2025-01-10T14:23:00Z"
    },
    {
      "id": "f2",
      "text": "Primary language is English",
      "source": "config",
      "confidence": 1.0,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}`

function AgentMemoryEditor() {
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Memory Editor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Inline file editor for agent {agentId}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm font-mono">/memory/facts.json</CardTitle>
            </div>
            <Badge variant="info">JSON</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            defaultValue={mockFileContent}
            className="w-full h-80 rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 font-mono text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 resize-y"
            spellCheck={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}
