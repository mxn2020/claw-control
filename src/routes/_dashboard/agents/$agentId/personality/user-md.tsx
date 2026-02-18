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
  User,
  Save,
  History,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/personality/user-md',
)({
  component: AgentUserMdEditor,
})

const mockUserContent = `# USER.md

## User Context
This file defines user-facing context and personalization rules
for the agent's interactions.

## Preferences
- **Language**: English (US)
- **Timezone**: America/New_York
- **Date Format**: MM/DD/YYYY
- **Response Length**: Concise

## Personalization Rules
1. Address returning users by first name when available
2. Remember previous issue categories for context
3. Suggest relevant FAQ articles based on conversation history
4. Adapt formality level to match user's communication style

## Data Handling
- Store user preferences in session memory only
- Do not persist PII beyond the active session
- Anonymize user data in logs and audit trails
- Respect user opt-out preferences for data collection
`

const mockVersions = [
  { id: 'v2', label: 'v2 — Current', date: 'Jan 9, 2025', author: 'admin' },
  { id: 'v1', label: 'v1 — Initial', date: 'Dec 5, 2024', author: 'admin' },
]

function AgentUserMdEditor() {
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">USER.md</h1>
            <p className="text-sm text-slate-400">Agent {agentId}</p>
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
                defaultValue={mockUserContent}
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
