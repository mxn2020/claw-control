import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Download } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/audit/')({
  component: AuditLog,
})

const tabs = [
  { label: 'Tools', active: true },
  { label: 'Config Changes', active: false },
  { label: 'Access', active: false },
  { label: 'Incidents', active: false },
  { label: 'Export', active: false },
]

const mockAuditEntries = [
  {
    id: 1,
    timestamp: '2025-01-15 10:32:14 UTC',
    user: 'admin@acme.co',
    action: 'agent.deploy',
    resource: 'Support Agent (agent_1)',
    details: 'Deployed to Production Gateway',
  },
  {
    id: 2,
    timestamp: '2025-01-15 09:18:02 UTC',
    user: 'ops@acme.co',
    action: 'config.update',
    resource: 'OpenAI Provider',
    details: 'Updated API key and rate limits',
  },
  {
    id: 3,
    timestamp: '2025-01-14 16:45:31 UTC',
    user: 'admin@acme.co',
    action: 'skill.install',
    resource: 'web-search (v1.2.0)',
    details: 'Installed from marketplace',
  },
]

function AuditLog() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete audit trail of all platform actions
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Audit Table */}
      <Card>
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
                    Action
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAuditEntries.map((entry) => (
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
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline">{entry.action}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      {entry.resource}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {entry.details}
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
