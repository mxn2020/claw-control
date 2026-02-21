import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Bot,
  Server,
  Wrench,
  Shield,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/security/quarantine')({
  component: SecurityQuarantine,
})

const quarantinedInstances = [
  {
    id: 'gw-staging-02',
    reason: 'Suspicious outbound connection detected',
    quarantinedAt: '2025-01-15 08:12:00 UTC',
    status: 'isolated',
    severity: 'high',
  },
  {
    id: 'gw-dev-01',
    reason: 'Unauthorized API key usage',
    quarantinedAt: '2025-01-14 16:45:00 UTC',
    status: 'under-review',
    severity: 'medium',
  },
]

const quarantinedAgents = [
  {
    id: 'qa-tester-v2',
    reason: 'Exceeded tool execution rate limit (10x normal)',
    quarantinedAt: '2025-01-15 09:30:00 UTC',
    instance: 'gw-prod-01',
    status: 'suspended',
  },
  {
    id: 'research-agent-exp',
    reason: 'Attempted to access restricted network endpoint',
    quarantinedAt: '2025-01-14 22:15:00 UTC',
    instance: 'gw-staging-02',
    status: 'suspended',
  },
]

const flaggedSkills = [
  {
    name: 'web-scraper@1.3.0',
    reason: 'CVE-2024-1234 in dependency chain',
    flaggedAt: '2025-01-15 06:00:00 UTC',
    usedBy: 3,
    action: 'disabled',
  },
  {
    name: 'shell-exec@0.9.1',
    reason: 'Unrestricted command execution capability',
    flaggedAt: '2025-01-14 12:00:00 UTC',
    usedBy: 1,
    action: 'review-required',
  },
  {
    name: 'file-writer@2.1.0',
    reason: 'Write access to sensitive directories',
    flaggedAt: '2025-01-13 18:30:00 UTC',
    usedBy: 2,
    action: 'restricted',
  },
]

const containmentActions = [
  {
    id: 1,
    timestamp: '2025-01-15 09:30:12 UTC',
    action: 'agent.suspend',
    target: 'qa-tester-v2',
    initiatedBy: 'auto-policy',
    details: 'Rate limit policy triggered — agent suspended',
  },
  {
    id: 2,
    timestamp: '2025-01-15 08:12:05 UTC',
    action: 'instance.isolate',
    target: 'gw-staging-02',
    initiatedBy: 'auto-policy',
    details: 'Network anomaly detected — instance isolated from fleet',
  },
  {
    id: 3,
    timestamp: '2025-01-14 22:15:30 UTC',
    action: 'agent.suspend',
    target: 'research-agent-exp',
    initiatedBy: 'admin@acme.co',
    details: 'Manual suspension after network policy violation',
  },
  {
    id: 4,
    timestamp: '2025-01-14 16:45:18 UTC',
    action: 'instance.quarantine',
    target: 'gw-dev-01',
    initiatedBy: 'auto-policy',
    details: 'Unauthorized credential usage detected',
  },
  {
    id: 5,
    timestamp: '2025-01-14 12:00:00 UTC',
    action: 'skill.disable',
    target: 'shell-exec@0.9.1',
    initiatedBy: 'security-scan',
    details: 'Skill flagged for unrestricted execution capability',
  },
]

function SecurityQuarantine() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Quarantine</h1>
        <p className="text-sm text-slate-400 mt-1">
          Isolated instances, suspended agents, and flagged skills
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Instances</span>
              <Server className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {quarantinedInstances.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Agents</span>
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {quarantinedAgents.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Flagged Skills</span>
              <Wrench className="w-5 h-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {flaggedSkills.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Quarantined Instances */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-red-400" />
            <CardTitle className="text-base">Quarantined Instances</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quarantinedInstances.map((inst) => (
              <div
                key={inst.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant="danger">{inst.severity}</Badge>
                <span className="text-sm font-mono text-cyan-400 shrink-0">
                  {inst.id}
                </span>
                <span className="text-sm text-slate-300 flex-1">
                  {inst.reason}
                </span>
                <Badge variant="outline" className="text-xs">
                  {inst.status}
                </Badge>
                <span className="text-xs text-slate-500 shrink-0">
                  {inst.quarantinedAt}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quarantined Agents */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Suspended Agents</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quarantinedAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant="warning">suspended</Badge>
                <span className="text-sm font-mono text-cyan-400 shrink-0">
                  {agent.id}
                </span>
                <span className="text-sm text-slate-300 flex-1">
                  {agent.reason}
                </span>
                <Badge variant="outline" className="text-xs">
                  {agent.instance}
                </Badge>
                <span className="text-xs text-slate-500 shrink-0">
                  {agent.quarantinedAt}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flagged Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-purple-400" />
            <CardTitle className="text-base">Flagged Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Skill
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Used By
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {flaggedSkills.map((skill) => (
                  <tr
                    key={skill.name}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                      {skill.name}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{skill.reason}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {skill.usedBy} agent{skill.usedBy !== 1 ? 's' : ''}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          skill.action === 'disabled' ? 'danger' : 'warning'
                        }
                      >
                        {skill.action}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Containment Actions Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Containment Actions Log</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {containmentActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {action.action}
                    </Badge>
                    <span className="text-sm text-cyan-400 font-mono">
                      {action.target}
                    </span>
                    <span className="text-xs text-slate-500">
                      by {action.initiatedBy}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{action.details}</p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">
                  {action.timestamp}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
