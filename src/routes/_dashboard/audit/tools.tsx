import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Wrench,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/audit/tools')({
  component: AuditTools,
})

const mockToolExecutions = [
  {
    id: 1,
    timestamp: '2025-01-15 10:32:14.123 UTC',
    agent: 'research-agent',
    tool: 'web-search',
    args: '{ "query": "latest AI safety papers 2025" }',
    result: 'success (12 results)',
    duration: '1.2s',
  },
  {
    id: 2,
    timestamp: '2025-01-15 10:31:58.891 UTC',
    agent: 'analytics-agent',
    tool: 'db-query',
    args: '{ "sql": "SELECT count(*) FROM events WHERE date > ..." }',
    result: 'success (847 rows)',
    duration: '0.12s',
  },
  {
    id: 3,
    timestamp: '2025-01-15 10:31:42.445 UTC',
    agent: 'support-agent',
    tool: 'knowledge-search',
    args: '{ "query": "refund policy", "limit": 5 }',
    result: 'success (5 results)',
    duration: '0.3s',
  },
  {
    id: 4,
    timestamp: '2025-01-15 10:31:15.102 UTC',
    agent: 'qa-tester',
    tool: 'browser-automation',
    args: '{ "url": "https://app.acme.co/dashboard", "action": "screenshot" }',
    result: 'timeout (30s limit)',
    duration: '30.0s',
  },
  {
    id: 5,
    timestamp: '2025-01-15 10:30:48.778 UTC',
    agent: 'billing-agent',
    tool: 'stripe-api',
    args: '{ "method": "invoices.list", "customer": "cus_xyz" }',
    result: 'success (3 invoices)',
    duration: '0.8s',
  },
  {
    id: 6,
    timestamp: '2025-01-15 10:30:22.334 UTC',
    agent: 'research-agent',
    tool: 'web-search',
    args: '{ "query": "transformer architecture improvements" }',
    result: 'success (8 results)',
    duration: '0.9s',
  },
  {
    id: 7,
    timestamp: '2025-01-15 10:29:55.112 UTC',
    agent: 'support-agent',
    tool: 'send-email',
    args: '{ "to": "user@example.com", "subject": "Support ticket #4521" }',
    result: 'success (delivered)',
    duration: '1.5s',
  },
]

function AuditTools() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Tool Execution Ledger
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Immutable record of every tool invocation across all agents
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Executions (24h)</span>
              <Wrench className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">1,247</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Avg Duration</span>
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">0.8s</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Failure Rate</span>
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">2.1%</span>
          </CardContent>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Execution Log</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Args
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockToolExecutions.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 text-white whitespace-nowrap">
                      {entry.agent}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{entry.tool}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs max-w-[300px] truncate">
                      {entry.args}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge
                        variant={
                          entry.result.startsWith('success')
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {entry.result}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-mono text-xs">
                      {entry.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
