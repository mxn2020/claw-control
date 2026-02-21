import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Shield,
  Lock,
  AlertTriangle,
  Bug,
  Archive,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/')({
  component: SecurityCenter,
})

const severityVariant = (action: string) => {
  if (action.includes('quarantine') || action.includes('isolate'))
    return 'danger' as const
  if (action.includes('suspend') || action.includes('block'))
    return 'warning' as const
  return 'info' as const
}

function SecurityCenter() {
  const posture = useQuery(api.platform.getSecurityPosture, {})
  const auditLogs = useQuery(api.platform.listAuditLogs, {})

  if (!posture) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading security data…</span>
      </div>
    )
  }

  const recentLogs = (auditLogs ?? []).slice(0, 10)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Center</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet security posture and threat monitoring
        </p>
      </div>

      {/* Security Score */}
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
                Security Posture Score
              </h2>
              <p className="text-sm text-slate-400">
                {posture.scoreLabel} — {posture.issueCount} issue
                {posture.issueCount !== 1 ? 's' : ''} require attention
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Instances</span>
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {posture.totalInstances}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">High-Risk Skills</span>
              <Bug className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {posture.highRiskSkills.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Quarantined</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {posture.quarantinedInstances.length +
                posture.quarantinedAgents.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Security Events</span>
              <Archive className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {posture.recentSecurityEvents.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">
              Recent Audit Events
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLogs.length === 0 && (
              <p className="text-sm text-slate-500">No recent events</p>
            )}
            {recentLogs.map((event) => (
              <div
                key={event._id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant={severityVariant(event.action)}>
                  {event.action}
                </Badge>
                <span className="text-sm text-slate-300 flex-1">
                  {event.resourceType}
                  {event.resourceId ? ` — ${event.resourceId}` : ''}
                  {event.details ? `: ${event.details}` : ''}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(event.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
