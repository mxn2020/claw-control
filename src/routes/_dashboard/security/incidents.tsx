import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  AlertTriangle,
  Clock,
  Shield,
  FileText,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/security/incidents')({
  component: SecurityIncidents,
})

const incidents = [
  {
    id: 'INC-001',
    title: 'Unauthorized outbound connection from gw-staging-02',
    severity: 'critical',
    status: 'investigating',
    createdAt: '2025-01-15 08:12:00 UTC',
    assignee: 'security-team',
    description:
      'Instance gw-staging-02 attempted to connect to an unknown external IP. Connection was blocked by firewall policy. Instance has been quarantined.',
  },
  {
    id: 'INC-002',
    title: 'Rate limit bypass attempt on qa-tester agent',
    severity: 'high',
    status: 'mitigated',
    createdAt: '2025-01-15 09:30:00 UTC',
    assignee: 'ops@acme.co',
    description:
      'Agent qa-tester-v2 exceeded execution rate limits by 10x. Automated policy suspended the agent. Under review for potential compromise.',
  },
  {
    id: 'INC-003',
    title: 'Expired OAuth token used in production',
    severity: 'medium',
    status: 'resolved',
    createdAt: '2025-01-14 14:20:00 UTC',
    assignee: 'admin@acme.co',
    description:
      'DISCORD_BOT_TOKEN expired but was still configured on support-agent. Requests failed with 401. Token has been rotated.',
  },
  {
    id: 'INC-004',
    title: 'CVE-2024-1234 detected in web-search skill',
    severity: 'high',
    status: 'open',
    createdAt: '2025-01-13 06:00:00 UTC',
    assignee: 'security-team',
    description:
      'Automated vulnerability scan detected CVE-2024-1234 in a dependency of web-search@1.1.0. Patch available in v1.1.1.',
  },
  {
    id: 'INC-005',
    title: 'Suspicious prompt injection attempt logged',
    severity: 'low',
    status: 'resolved',
    createdAt: '2025-01-12 19:45:00 UTC',
    assignee: 'admin@acme.co',
    description:
      'User attempted prompt injection via webchat. Agent guardrails blocked the attempt. No data exposure.',
  },
]

const timeline = [
  { time: '2025-01-15 09:30', event: 'INC-002 created — rate limit bypass detected', type: 'created' },
  { time: '2025-01-15 09:31', event: 'qa-tester-v2 automatically suspended', type: 'action' },
  { time: '2025-01-15 08:12', event: 'INC-001 created — unauthorized connection', type: 'created' },
  { time: '2025-01-15 08:13', event: 'gw-staging-02 quarantined', type: 'action' },
  { time: '2025-01-14 14:20', event: 'INC-003 created — expired OAuth token', type: 'created' },
  { time: '2025-01-14 15:00', event: 'INC-003 resolved — token rotated', type: 'resolved' },
  { time: '2025-01-13 06:00', event: 'INC-004 created — CVE detected', type: 'created' },
  { time: '2025-01-12 19:45', event: 'INC-005 created — prompt injection attempt', type: 'created' },
  { time: '2025-01-12 20:00', event: 'INC-005 resolved — no data exposure', type: 'resolved' },
]

const severityVariant = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'danger' as const
    case 'high':
      return 'danger' as const
    case 'medium':
      return 'warning' as const
    case 'low':
      return 'info' as const
    default:
      return 'default' as const
  }
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'investigating':
      return 'danger' as const
    case 'open':
      return 'warning' as const
    case 'mitigated':
      return 'info' as const
    case 'resolved':
      return 'success' as const
    default:
      return 'default' as const
  }
}

const timelineVariant = (type: string) => {
  switch (type) {
    case 'created':
      return 'warning' as const
    case 'action':
      return 'info' as const
    case 'resolved':
      return 'success' as const
    default:
      return 'default' as const
  }
}

function SecurityIncidents() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Incidents</h1>
        <p className="text-sm text-slate-400 mt-1">
          Security incident tracking and response timeline
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Open</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {incidents.filter((i) => i.status === 'open' || i.status === 'investigating').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Mitigated</span>
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {incidents.filter((i) => i.status === 'mitigated').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Resolved</span>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {incidents.filter((i) => i.status === 'resolved').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total (30d)</span>
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {incidents.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Incident Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Incident Timeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <span className="text-xs text-slate-500 font-mono shrink-0 w-36">
                  {item.time}
                </span>
                <Badge variant={timelineVariant(item.type)} className="shrink-0">
                  {item.type}
                </Badge>
                <span className="text-sm text-slate-300">{item.event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incident List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">All Incidents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Assignee
                  </th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr
                    key={inc.id}
                    className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50 cursor-pointer"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                      {inc.id}
                    </td>
                    <td className="px-4 py-3 text-white">{inc.title}</td>
                    <td className="px-4 py-3">
                      <Badge variant={severityVariant(inc.severity)}>
                        {inc.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(inc.status)}>
                        {inc.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {inc.createdAt}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {inc.assignee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Incident Detail Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Incident Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center border border-dashed border-slate-600 rounded-lg">
            <span className="text-sm text-slate-500">
              Select an incident above to view full details, timeline, and
              response actions
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
