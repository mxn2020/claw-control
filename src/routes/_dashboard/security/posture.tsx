import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Shield,
  AlertTriangle,
  Settings,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/posture')({
  component: SecurityPosture,
})

function SecurityPosture() {
  const posture = useQuery(api.platform.getSecurityPosture, {})
  const agents = useQuery(api.agents.list, {})

  if (!posture) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading security posture…</span>
      </div>
    )
  }

  const agentList = agents ?? []

  const borderColor =
    posture.scoreColor === 'emerald'
      ? 'border-emerald-500/50 bg-emerald-500/10'
      : posture.scoreColor === 'amber'
        ? 'border-amber-500/50 bg-amber-500/10'
        : 'border-red-500/50 bg-red-500/10'
  const textColor =
    posture.scoreColor === 'emerald'
      ? 'text-emerald-400'
      : posture.scoreColor === 'amber'
        ? 'text-amber-400'
        : 'text-red-400'

  // Derive risk breakdown from real data
  const riskBreakdown = [
    {
      category: 'Quarantined Instances',
      score: posture.quarantinedInstances.length === 0 ? 100 : Math.max(0, 100 - posture.quarantinedInstances.length * 25),
      items: posture.quarantinedInstances.length,
      color: posture.quarantinedInstances.length === 0 ? 'bg-emerald-500' : 'bg-red-500',
    },
    {
      category: 'Quarantined Agents',
      score: posture.quarantinedAgents.length === 0 ? 100 : Math.max(0, 100 - posture.quarantinedAgents.length * 15),
      items: posture.quarantinedAgents.length,
      color: posture.quarantinedAgents.length === 0 ? 'bg-emerald-500' : 'bg-amber-500',
    },
    {
      category: 'High-Risk Skills',
      score: posture.highRiskSkills.length === 0 ? 100 : Math.max(0, 100 - posture.highRiskSkills.length * 10),
      items: posture.highRiskSkills.length,
      color: posture.highRiskSkills.length === 0 ? 'bg-emerald-500' : 'bg-amber-500',
    },
    {
      category: 'Security Events',
      score: posture.recentSecurityEvents.length === 0 ? 100 : Math.max(0, 100 - posture.recentSecurityEvents.length * 5),
      items: posture.recentSecurityEvents.length,
      color: posture.recentSecurityEvents.length <= 2 ? 'bg-emerald-500' : 'bg-amber-500',
    },
  ]

  // Derive weak configs from agents with quarantined/error status
  const weakConfigs = agentList
    .filter((a: any) => a.status === 'quarantined' || a.status === 'error')
    .map((a: any) => ({
      rule: a.status === 'quarantined' ? 'Agent quarantined for safety violation' : 'Agent in error state',
      severity: a.status === 'quarantined' ? 'high' : 'medium',
      agent: a.name,
      recommendation: a.status === 'quarantined'
        ? 'Review quarantine reason and remediate before restoring'
        : 'Investigate error cause and restart agent',
    }))

  const severityVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger' as const
      case 'medium': return 'warning' as const
      case 'low': return 'info' as const
      default: return 'default' as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Posture</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet-wide risk assessment and vulnerability overview
        </p>
      </div>

      {/* Risk Score */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-6">
            <div
              className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${borderColor}`}
            >
              <div className="text-center">
                <div className={`text-3xl font-bold ${textColor}`}>
                  {posture.score}
                </div>
                <div className="text-xs text-slate-400">/100</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Fleet Risk Score
              </h2>
              <p className="text-sm text-slate-400">
                {posture.scoreLabel} — {posture.issueCount} issue
                {posture.issueCount !== 1 ? 's' : ''} detected across{' '}
                {riskBreakdown.filter((r) => r.items > 0).length} categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Risk Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskBreakdown.map((r) => (
              <div key={r.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{r.category}</span>
                  <span className="text-xs text-slate-400">
                    {r.score}/100 · {r.items} issue{r.items !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`${r.color} h-2 rounded-full transition-all`}
                    style={{ width: `${r.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High-Risk Skills */}
      {posture.highRiskSkills.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-base">High-Risk Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {posture.highRiskSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Badge variant="danger">{skill.riskLevel}</Badge>
                  <span className="text-sm font-mono text-cyan-400 flex-1">
                    {skill.name}
                  </span>
                  <Badge variant={skill.isEnabled ? 'success' : 'default'}>
                    {skill.isEnabled ? 'enabled' : 'disabled'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weak Configuration Detector */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">
              Agent Configuration Issues
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {weakConfigs.length === 0 ? (
            <p className="text-sm text-slate-500">
              No configuration issues detected
            </p>
          ) : (
            <div className="space-y-3">
              {weakConfigs.map((cfg: any, i: any) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Badge
                    variant={severityVariant(cfg.severity)}
                    className="mt-0.5 shrink-0"
                  >
                    {cfg.severity}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">{cfg.rule}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Agent: {cfg.agent} · {cfg.recommendation}
                    </p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
