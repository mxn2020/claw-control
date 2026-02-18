import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Search,
  FileText,
  Download,
  Filter,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/observe/logs')({
  component: ObserveLogs,
})

const mockLogs = [
  {
    id: 1,
    timestamp: '2025-01-15 10:32:14.123',
    level: 'info',
    agent: 'support-agent',
    message: 'Session created for user u_8x2k. Channel: webchat.',
  },
  {
    id: 2,
    timestamp: '2025-01-15 10:32:12.891',
    level: 'debug',
    agent: 'research-agent',
    message: 'Tool web-search returned 12 results in 1.2s.',
  },
  {
    id: 3,
    timestamp: '2025-01-15 10:32:10.445',
    level: 'warn',
    agent: 'qa-tester',
    message: 'Rate limit at 85% capacity. Provider: openai. Model: gpt-4o.',
  },
  {
    id: 4,
    timestamp: '2025-01-15 10:32:08.102',
    level: 'error',
    agent: 'qa-tester',
    message: 'Tool browser_automation timed out after 30s. Retrying (attempt 2/3).',
  },
  {
    id: 5,
    timestamp: '2025-01-15 10:32:05.778',
    level: 'info',
    agent: 'billing-agent',
    message: 'Invoice lookup completed. Found 3 pending invoices for org_acme.',
  },
  {
    id: 6,
    timestamp: '2025-01-15 10:32:03.221',
    level: 'info',
    agent: 'support-agent',
    message: 'Agent responded with 245 tokens. Latency: 0.8s.',
  },
  {
    id: 7,
    timestamp: '2025-01-15 10:32:01.009',
    level: 'debug',
    agent: 'analytics-agent',
    message: 'Database query executed in 120ms. Rows returned: 847.',
  },
  {
    id: 8,
    timestamp: '2025-01-15 10:31:58.654',
    level: 'error',
    agent: 'research-agent',
    message: 'External API returned 503. Endpoint: api.datasource.io/v2/search.',
  },
]

const levelVariant = (level: string) => {
  switch (level) {
    case 'error':
      return 'danger' as const
    case 'warn':
      return 'warning' as const
    case 'info':
      return 'info' as const
    case 'debug':
      return 'default' as const
    default:
      return 'default' as const
  }
}

function ObserveLogs() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Logs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Structured log viewer across all agents and instances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs..."
                className="flex-1 bg-transparent border-none text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select className="bg-slate-700 border border-slate-600 text-slate-300 text-xs rounded-lg px-3 py-1.5">
                <option value="">Level: All</option>
                <option value="error">error</option>
                <option value="warn">warn</option>
                <option value="info">info</option>
                <option value="debug">debug</option>
              </select>
              <select className="bg-slate-700 border border-slate-600 text-slate-300 text-xs rounded-lg px-3 py-1.5">
                <option value="">Agent: All</option>
                <option value="support-agent">support-agent</option>
                <option value="research-agent">research-agent</option>
                <option value="qa-tester">qa-tester</option>
                <option value="billing-agent">billing-agent</option>
                <option value="analytics-agent">analytics-agent</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Entries */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Log Stream</CardTitle>
            <span className="text-xs text-slate-500 ml-2">
              Showing {mockLogs.length} entries
            </span>
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
                    Level
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={levelVariant(log.level)}>
                        {log.level}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      {log.agent}
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">
                      {log.message}
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
