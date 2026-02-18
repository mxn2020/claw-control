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
  Bot,
  Save,
  History,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/personalities/agents-md',
)({
  component: AgentsMdEditor,
})

const mockAgentsContent = `# AGENTS.md

## Agent Definitions

### support-bot
- **Role**: Customer-facing support assistant
- **Model**: gpt-4o
- **Max Tokens**: 4096
- **Temperature**: 0.3
- **Tools**: read, browser
- **Escalation**: Forward to human agent after 3 failed resolution attempts

### sales-assistant
- **Role**: Sales qualification and product information
- **Model**: gpt-4o-mini
- **Max Tokens**: 2048
- **Temperature**: 0.5
- **Tools**: read, browser
- **Escalation**: Tag lead in CRM when purchase intent detected

### internal-ops
- **Role**: Internal operations automation
- **Model**: claude-3.5-sonnet
- **Max Tokens**: 8192
- **Temperature**: 0.1
- **Tools**: exec, read, write, edit
- **Escalation**: Require approval for destructive operations

## Coordination Rules
1. Agents must not share session context across conversations
2. Only internal-ops may execute write operations
3. All agents log interactions to the audit trail
4. Rate limits are enforced per-agent, not per-instance
`

const mockVersions = [
  { id: 'v3', label: 'v3 — Current', date: 'Jan 5, 2025', author: 'ops-team' },
  { id: 'v2', label: 'v2', date: 'Dec 18, 2024', author: 'admin' },
  { id: 'v1', label: 'v1 — Initial', date: 'Nov 15, 2024', author: 'admin' },
]

function AgentsMdEditor() {
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">AGENTS.md</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Editor</CardTitle>
                <Badge variant="info">Markdown</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                defaultValue={mockAgentsContent}
                className="w-full h-[500px] rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 font-mono text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 resize-y"
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Version History Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <CardTitle className="text-base">Version History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockVersions.map((version, i) => (
                  <button
                    key={version.id}
                    type="button"
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      i === 0
                        ? 'border-cyan-500/50 bg-cyan-500/10'
                        : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-sm font-medium text-white">{version.label}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      {version.date} · {version.author}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
