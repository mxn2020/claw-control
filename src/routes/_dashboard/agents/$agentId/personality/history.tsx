import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  History,
  RotateCcw,
  FileText,
  GitCommit,
  Eye,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/personality/history',
)({
  component: AgentPersonalityHistory,
})

const mockHistory = [
  { id: 'ch-1', file: 'SOUL.md', timestamp: 'Jan 10, 2025 14:32 UTC', author: 'admin', sha: 'a1b2c3d', summary: 'Updated tone guidelines to be more empathetic' },
  { id: 'ch-2', file: 'USER.md', timestamp: 'Jan 7, 2025 09:20 UTC', author: 'ops-team', sha: 'e4f5g6h', summary: 'Added timezone and locale defaults' },
  { id: 'ch-3', file: 'AGENTS.md', timestamp: 'Jan 3, 2025 16:45 UTC', author: 'admin', sha: 'i7j8k9l', summary: 'Refined agent handoff instructions' },
  { id: 'ch-4', file: 'SOUL.md', timestamp: 'Dec 28, 2024 11:10 UTC', author: 'platform-team', sha: 'm0n1o2p', summary: 'Added constraints for tool permission boundaries' },
  { id: 'ch-5', file: 'SOUL.md', timestamp: 'Dec 15, 2024 08:30 UTC', author: 'admin', sha: 'q3r4s5t', summary: 'Initial personality template with identity and values' },
]

function AgentPersonalityHistory() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/personality"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Personality
      </Link>

      <div className="flex items-center gap-3">
        <History className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Version History</h1>
          <p className="text-sm text-slate-400">Agent {agentId}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Timeline</CardTitle>
            <Badge variant="info">{mockHistory.length} changes</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockHistory.map((change) => (
              <div
                key={change.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">{change.file}</span>
                      <Badge variant="info">{change.author}</Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <GitCommit className="w-3 h-3" />
                        {change.sha}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{change.summary}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{change.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Diff
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Rollback
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
