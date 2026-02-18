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
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/personalities/history',
)({
  component: InstancePersonalityHistory,
})

const mockHistory = [
  { id: 'ch-1', file: 'SOUL.md', timestamp: 'Jan 10, 2025 14:32 UTC', author: 'admin', summary: 'Updated tone guidelines and added escalation rules' },
  { id: 'ch-2', file: 'USER.md', timestamp: 'Jan 8, 2025 09:15 UTC', author: 'platform-team', summary: 'Added GDPR compliance section to privacy defaults' },
  { id: 'ch-3', file: 'AGENTS.md', timestamp: 'Jan 5, 2025 11:40 UTC', author: 'ops-team', summary: 'Added billing-agent persona definition' },
  { id: 'ch-4', file: 'SOUL.md', timestamp: 'Dec 28, 2024 16:22 UTC', author: 'ops-team', summary: 'Refined behavioral guidelines for support scenarios' },
  { id: 'ch-5', file: 'USER.md', timestamp: 'Dec 20, 2024 10:05 UTC', author: 'admin', summary: 'Initial user context template with locale defaults' },
  { id: 'ch-6', file: 'SOUL.md', timestamp: 'Dec 12, 2024 08:50 UTC', author: 'admin', summary: 'Added constraints section for tool permissions' },
]

function InstancePersonalityHistory() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/personalities"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Personalities
      </Link>

      <div className="flex items-center gap-3">
        <History className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Version History</h1>
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
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
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{change.summary}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{change.timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Rollback
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
