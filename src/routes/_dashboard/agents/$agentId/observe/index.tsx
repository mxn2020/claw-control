import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Activity,
  DollarSign,
  Clock,
  Search,
  Terminal,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/observe/')({
  component: AgentObserveIndex,
})

const mockTraces = [
  {
    id: 'trace_4821',
    operation: 'chat.completion',
    status: 'ok' as const,
    duration: '320ms',
    tokens: 1842,
    cost: 0.0092,
    time: '2 min ago',
  },
  {
    id: 'trace_4820',
    operation: 'tool.search_docs',
    status: 'ok' as const,
    duration: '148ms',
    tokens: 0,
    cost: 0,
    time: '4 min ago',
  },
  {
    id: 'trace_4819',
    operation: 'chat.completion',
    status: 'error' as const,
    duration: '5012ms',
    tokens: 0,
    cost: 0,
    time: '8 min ago',
  },
  {
    id: 'trace_4818',
    operation: 'chat.completion',
    status: 'ok' as const,
    duration: '412ms',
    tokens: 2105,
    cost: 0.0105,
    time: '12 min ago',
  },
  {
    id: 'trace_4817',
    operation: 'tool.create_ticket',
    status: 'ok' as const,
    duration: '89ms',
    tokens: 0,
    cost: 0,
    time: '15 min ago',
  },
]

const mockLogs = [
  { ts: '14:32:18.421', level: 'INFO', message: 'Session sess_901 started — channel: Discord' },
  { ts: '14:32:18.523', level: 'DEBUG', message: 'Loading personality files: SOUL.md, AGENTS.md' },
  { ts: '14:32:19.102', level: 'INFO', message: 'chat.completion request sent — model: gpt-4o' },
  { ts: '14:32:19.422', level: 'INFO', message: 'chat.completion response — 1842 tokens, 320ms' },
  { ts: '14:32:22.891', level: 'WARN', message: 'Rate limit approaching: 82/100 requests per minute' },
  { ts: '14:32:24.005', level: 'ERROR', message: 'chat.completion timeout — 5012ms exceeded 5000ms limit' },
  { ts: '14:32:24.010', level: 'INFO', message: 'Retrying with fallback model: gpt-4o-mini' },
]

const mockCostSummary = {
  today: 12.38,
  thisWeek: 67.42,
  thisMonth: 284.52,
  avgPerSession: 0.27,
  totalTokens: 1_284_300,
  totalRequests: 4821,
}

function statusVariant(status: string) {
  return status === 'ok' ? 'success' as const : 'danger' as const
}

function logLevelClass(level: string) {
  switch (level) {
    case 'ERROR': return 'text-red-400'
    case 'WARN': return 'text-amber-400'
    case 'DEBUG': return 'text-slate-500'
    default: return 'text-cyan-400'
  }
}

function AgentObserveIndex() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Observability</h1>
        <p className="mt-1 text-sm text-slate-400">
          Agent {agentId} — traces, logs, and cost analysis
        </p>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Today</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">${mockCostSummary.today.toFixed(2)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">This Week</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">${mockCostSummary.thisWeek.toFixed(2)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">This Month</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">${mockCostSummary.thisMonth.toFixed(2)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Avg / Session</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">${mockCostSummary.avgPerSession.toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Traces */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <CardTitle>Recent Traces</CardTitle>
              </div>
              <Badge variant="info">{mockTraces.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockTraces.map((trace) => (
                <div
                  key={trace.id}
                  className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white">{trace.id}</span>
                      <Badge variant={statusVariant(trace.status)}>{trace.status}</Badge>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {trace.operation} · {trace.duration}
                      {trace.tokens > 0 && ` · ${trace.tokens} tokens`}
                      {trace.cost > 0 && ` · $${trace.cost.toFixed(4)}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {trace.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Log Stream Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <CardTitle>Log Stream</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-3 font-mono text-xs space-y-1 max-h-[400px] overflow-y-auto">
              {mockLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-500 shrink-0">{log.ts}</span>
                  <span className={`shrink-0 w-12 ${logLevelClass(log.level)}`}>{log.level}</span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
