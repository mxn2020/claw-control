import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Plus, CheckCircle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/memory/inject',
)({
  component: AgentMemoryInject,
})

const mockRecentInjections = [
  { id: 'i1', text: 'User is based in New York', injectedAt: '2 min ago', source: 'manual' },
  { id: 'i2', text: 'User has VIP support tier', injectedAt: '1 hour ago', source: 'manual' },
  { id: 'i3', text: 'Preferred contact: email', injectedAt: '3 hours ago', source: 'api' },
]

function AgentMemoryInject() {
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
        <h1 className="text-2xl font-bold text-white">Quick Fact Injector</h1>
        <p className="text-sm text-slate-400 mt-1">
          Inject facts directly into agent {agentId} memory store
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            <CardTitle>Inject a Fact</CardTitle>
          </div>
          <CardDescription>
            Manually add a fact to the agent's long-term memory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <textarea
              placeholder="Enter a fact, e.g. 'User is a premium subscriber based in London'"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 resize-none h-24"
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Inject Fact
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Injections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentInjections.map((inj) => (
              <div
                key={inj.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-white">{inj.text}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="default">{inj.source}</Badge>
                  <span className="text-xs text-slate-400">{inj.injectedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
