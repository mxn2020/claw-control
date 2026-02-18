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
  '/_dashboard/fleet/instances/$instanceId/personalities/user-md',
)({
  component: InstanceUserMdEditor,
})

const mockUserMdContent = `# USER.md

## User Context
This file describes the default user persona that agents on this instance
should assume when no session-specific user context is available.

## Defaults
- **Name**: Guest User
- **Locale**: en-US
- **Timezone**: UTC
- **Preferred Language**: English

## Behavior Overrides
- Greet returning users by name when identity is available
- Default to formal tone for unidentified users
- Show metric units unless user locale indicates otherwise

## Privacy
- Do not persist PII beyond the active session
- Anonymize user data in logs and traces
- Respect GDPR and CCPA data deletion requests
`

const mockVersions = [
  { id: 'v3', label: 'v3 — Current', date: 'Jan 8, 2025', author: 'platform-team' },
  { id: 'v2', label: 'v2', date: 'Dec 20, 2024', author: 'admin' },
  { id: 'v1', label: 'v1 — Initial', date: 'Nov 15, 2024', author: 'admin' },
]

function InstanceUserMdEditor() {
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
          <User className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">USER.md</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                defaultValue={mockUserMdContent}
                className="w-full h-[500px] rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 font-mono text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 resize-y"
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>

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
