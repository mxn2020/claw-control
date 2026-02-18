import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Search,
  GitBranch,
  Clock,
  AlertTriangle,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/observe/traces')({
  component: ObserveTraces,
})

const mockTraces = [
  {
    id: 'tr-a1b2c3',
    timestamp: '2025-01-15 10:32:14',
    duration: '1.2s',
    agent: 'support-agent',
    status: 'ok',
    spans: 8,
    operation: 'session.handle_message',
  },
  {
    id: 'tr-d4e5f6',
    timestamp: '2025-01-15 10:31:58',
    duration: '3.8s',
    agent: 'research-agent',
    status: 'ok',
    spans: 14,
    operation: 'tool.web_search',
  },
  {
    id: 'tr-g7h8i9',
    timestamp: '2025-01-15 10:31:42',
    duration: '0.4s',
    agent: 'billing-agent',
    status: 'ok',
    spans: 4,
    operation: 'session.create',
  },
  {
    id: 'tr-j0k1l2',
    timestamp: '2025-01-15 10:31:15',
    duration: '12.1s',
    agent: 'qa-tester',
    status: 'error',
    spans: 22,
    operation: 'tool.browser_automation',
  },
  {
    id: 'tr-m3n4o5',
    timestamp: '2025-01-15 10:30:48',
    duration: '0.8s',
    agent: 'support-agent',
    status: 'ok',
    spans: 6,
    operation: 'agent.respond',
  },
]

const slowestTraces = [
  { id: 'tr-j0k1l2', agent: 'qa-tester', operation: 'tool.browser_automation', duration: '12.1s' },
  { id: 'tr-x9y8z7', agent: 'research-agent', operation: 'tool.deep_search', duration: '8.4s' },
  { id: 'tr-d4e5f6', agent: 'research-agent', operation: 'tool.web_search', duration: '3.8s' },
  { id: 'tr-w6v5u4', agent: 'analytics-agent', operation: 'tool.db_query', duration: '2.9s' },
  { id: 'tr-t3s2r1', agent: 'support-agent', operation: 'agent.escalate', duration: '2.1s' },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'ok':
      return 'success' as const
    case 'error':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function ObserveTraces() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Traces</h1>
        <p className="text-sm text-slate-400 mt-1">
          Distributed trace waterfall view for agent operations
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search traces by ID, agent, or operation..."
              className="flex-1 bg-transparent border-none text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trace List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Recent Traces</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Trace ID
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Operation
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Spans
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTraces.map((trace) => (
                  <tr
                    key={trace.id}
                    className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50 cursor-pointer"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                      {trace.id}
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {trace.timestamp}
                    </td>
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                      {trace.duration}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      {trace.agent}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{trace.operation}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {trace.spans}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(trace.status)}>
                        {trace.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Slowest Traces */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Slowest Traces (24h)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {slowestTraces.map((trace) => (
              <div
                key={trace.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-cyan-400 shrink-0">
                  {trace.id}
                </span>
                <span className="text-sm text-slate-300">{trace.agent}</span>
                <Badge variant="outline" className="text-xs">
                  {trace.operation}
                </Badge>
                <span className="ml-auto text-sm font-bold text-amber-400">
                  {trace.duration}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
