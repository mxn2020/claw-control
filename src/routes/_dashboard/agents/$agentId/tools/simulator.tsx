import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { ArrowLeft, Play, CheckCircle, XCircle } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/tools/simulator',
)({
  component: AgentToolsSimulator,
})

const mockResults = [
  { tool: 'exec', args: 'ls -la /tmp', verdict: 'allowed', policy: 'default-allow' },
  { tool: 'write', args: '/etc/hosts append ...', verdict: 'denied', policy: 'no external writes' },
  { tool: 'browser', args: 'GET https://example.com', verdict: 'allowed', policy: 'browser allow-list' },
]

function AgentToolsSimulator() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/tools"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Tool Call Simulator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Test policy verdicts for tool calls on agent {agentId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulate a Tool Call</CardTitle>
          <CardDescription>
            Enter a tool and arguments to evaluate which policies apply.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="tool:exec  args:ls -la"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              <Play className="w-4 h-4" />
              Simulate
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Simulations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockResults.map((result, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  {result.verdict === 'allowed' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <div>
                    <span className="text-sm font-mono font-medium text-white">{result.tool}</span>
                    <span className="text-xs text-slate-400 ml-2">{result.args}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{result.policy}</span>
                  <Badge variant={result.verdict === 'allowed' ? 'success' : 'danger'}>
                    {result.verdict}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
