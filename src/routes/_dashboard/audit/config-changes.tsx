import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Settings,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/audit/config-changes')({
  component: AuditConfigChanges,
})

const mockConfigChanges = [
  {
    id: 1,
    timestamp: '2025-01-15 10:18:42 UTC',
    user: 'admin@acme.co',
    resource: 'support-agent',
    field: 'model',
    oldValue: 'gpt-4o',
    newValue: 'claude-3.5-sonnet',
  },
  {
    id: 2,
    timestamp: '2025-01-15 09:45:11 UTC',
    user: 'ops@acme.co',
    resource: 'OpenAI Provider',
    field: 'rate_limit',
    oldValue: '100 req/min',
    newValue: '200 req/min',
  },
  {
    id: 3,
    timestamp: '2025-01-15 08:30:05 UTC',
    user: 'admin@acme.co',
    resource: 'gw-prod-01',
    field: 'max_sessions',
    oldValue: '50',
    newValue: '100',
  },
  {
    id: 4,
    timestamp: '2025-01-14 16:22:33 UTC',
    user: 'security@acme.co',
    resource: 'research-agent',
    field: 'network_policy',
    oldValue: 'allow-all',
    newValue: 'restricted',
  },
  {
    id: 5,
    timestamp: '2025-01-14 14:10:19 UTC',
    user: 'admin@acme.co',
    resource: 'billing-agent',
    field: 'memory_encryption',
    oldValue: 'disabled',
    newValue: 'enabled',
  },
  {
    id: 6,
    timestamp: '2025-01-14 11:55:47 UTC',
    user: 'ops@acme.co',
    resource: 'cs-team swarm',
    field: 'max_agents',
    oldValue: '3',
    newValue: '5',
  },
  {
    id: 7,
    timestamp: '2025-01-14 09:08:12 UTC',
    user: 'admin@acme.co',
    resource: 'qa-tester',
    field: 'session_timeout',
    oldValue: '3600s',
    newValue: '1800s',
  },
  {
    id: 8,
    timestamp: '2025-01-13 17:30:00 UTC',
    user: 'security@acme.co',
    resource: 'Global Policy',
    field: 'debug_logging',
    oldValue: 'enabled',
    newValue: 'disabled',
  },
]

function AuditConfigChanges() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Config Change Log</h1>
        <p className="text-sm text-slate-400 mt-1">
          Immutable record of all configuration changes across the platform
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Changes (7d)</span>
              <Settings className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {mockConfigChanges.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Unique Users</span>
              <Settings className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">3</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Last Change</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg font-bold text-white">12 min ago</span>
          </CardContent>
        </Card>
      </div>

      {/* Change Log Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Change History</CardTitle>
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
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Field
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Old Value
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    New Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockConfigChanges.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 text-white whitespace-nowrap">
                      {entry.user}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      {entry.resource}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{entry.field}</Badge>
                    </td>
                    <td className="px-4 py-3 text-red-400 font-mono text-xs whitespace-nowrap">
                      {entry.oldValue}
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-mono text-xs whitespace-nowrap">
                      {entry.newValue}
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
