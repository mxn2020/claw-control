import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Server,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/skills/installed')({
  component: SkillsInstalled,
})

const installedSkills = [
  {
    name: 'Web Scraper',
    versions: [
      { version: '2.3.1', instances: ['prod-gateway', 'staging-server'], agents: ['research-agent'] },
      { version: '2.2.0', instances: ['dev-instance'], agents: ['qa-tester'] },
    ],
    risk: 'MEDIUM',
    hasDrift: true,
  },
  {
    name: 'GitHub PR Reviewer',
    versions: [
      { version: '1.8.0', instances: ['prod-gateway', 'staging-server', 'dev-instance'], agents: ['code-review-bot'] },
    ],
    risk: 'LOW',
    hasDrift: false,
  },
  {
    name: 'Slack Notifier',
    versions: [
      { version: '3.1.2', instances: ['prod-gateway'], agents: ['support-agent', 'ops-agent'] },
    ],
    risk: 'LOW',
    hasDrift: false,
  },
  {
    name: 'SQL Query Builder',
    versions: [
      { version: '4.0.0', instances: ['prod-gateway'], agents: ['analytics-agent'] },
      { version: '3.9.8', instances: ['staging-server'], agents: ['analytics-agent'] },
      { version: '3.8.5', instances: ['dev-instance'], agents: ['qa-tester'] },
    ],
    risk: 'HIGH',
    hasDrift: true,
  },
  {
    name: 'Shell Executor',
    versions: [
      { version: '1.2.0', instances: ['dev-instance'], agents: ['devops-agent'] },
    ],
    risk: 'CRITICAL',
    hasDrift: false,
  },
]

const riskVariant = (risk: string) => {
  switch (risk) {
    case 'LOW':
      return 'success' as const
    case 'MEDIUM':
      return 'warning' as const
    case 'HIGH':
      return 'danger' as const
    case 'CRITICAL':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function SkillsInstalled() {
  const driftCount = installedSkills.filter((s) => s.hasDrift).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Installed Skills</h1>
          <p className="text-sm text-slate-400 mt-1">
            All skills deployed across your fleet
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Skills</span>
              <Package className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{installedSkills.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Version Drift</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{driftCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">In Sync</span>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{installedSkills.length - driftCount}</span>
          </CardContent>
        </Card>
      </div>

      {/* Skills Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Fleet Skill Inventory</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Skill</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Version</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Installed On</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Risk</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {installedSkills.map((skill) =>
                  skill.versions.map((v, idx) => (
                    <tr key={`${skill.name}-${v.version}`} className="border-b border-slate-700/50 last:border-0">
                      {idx === 0 ? (
                        <td className="px-4 py-3 text-white font-medium" rowSpan={skill.versions.length}>
                          {skill.name}
                        </td>
                      ) : null}
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs">{v.version}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {v.instances.map((inst) => (
                            <Badge key={inst} variant="outline" className="text-xs">{inst}</Badge>
                          ))}
                          {v.agents.map((agent) => (
                            <Badge key={agent} variant="info" className="text-xs">{agent}</Badge>
                          ))}
                        </div>
                      </td>
                      {idx === 0 ? (
                        <td className="px-4 py-3" rowSpan={skill.versions.length}>
                          <Badge variant={riskVariant(skill.risk)}>{skill.risk}</Badge>
                        </td>
                      ) : null}
                      {idx === 0 ? (
                        <td className="px-4 py-3" rowSpan={skill.versions.length}>
                          {skill.hasDrift ? (
                            <Badge variant="warning">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              drift
                            </Badge>
                          ) : (
                            <Badge variant="success">in sync</Badge>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
