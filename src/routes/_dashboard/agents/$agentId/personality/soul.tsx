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
  Users,
  Save,
  History,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/personality/soul',
)({
  component: AgentSoulEditor,
})

const mockSoulContent = `# SOUL.md

## Identity
You are a helpful customer support agent deployed via the Claw Control
platform. You handle user inquiries with empathy and precision.

## Tone
- Warm and professional
- Concise — avoid unnecessary filler
- Use simple language; avoid jargon unless user is technical

## Values
- **Accuracy** — never fabricate information
- **Empathy** — acknowledge user frustration before resolving
- **Transparency** — explain reasoning when asked
- **Efficiency** — solve problems with minimal back-and-forth

## Behavioral Guidelines
1. Always greet the user warmly
2. Confirm understanding before proposing a solution
3. Escalate to human support after 3 failed resolution attempts
4. Never share internal system details with end users

## Constraints
- Do not access external APIs without explicit tool permissions
- Do not modify user account data directly
- Respect rate limits configured at the instance level
`

const mockVersions = [
  { id: 'v4', label: 'v4 — Current', date: 'Jan 10, 2025', author: 'admin' },
  { id: 'v3', label: 'v3', date: 'Dec 28, 2024', author: 'ops-team' },
  { id: 'v2', label: 'v2', date: 'Dec 12, 2024', author: 'admin' },
  { id: 'v1', label: 'v1 — Initial', date: 'Nov 20, 2024', author: 'admin' },
]

const mockInheritanceEnabled = true

function AgentSoulEditor() {
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
          <Users className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">SOUL.md</h1>
            <p className="text-sm text-slate-400">Agent {agentId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Inheritance Toggle */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-white">Inherit from instance default</span>
              <p className="text-xs text-slate-400 mt-0.5">
                When enabled, this agent uses the instance-level SOUL.md. Disable to override.
              </p>
            </div>
            <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              {mockInheritanceEnabled ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-500" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="info">Markdown</Badge>
                  <Badge variant="success">Inherited</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                defaultValue={mockSoulContent}
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
