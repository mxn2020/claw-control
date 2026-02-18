import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/security/',
)({
  component: AgentSecurity,
})

const mockPermissions = [
  { scope: 'read:docs', granted: true },
  { scope: 'write:tickets', granted: true },
  { scope: 'write:billing', granted: true },
  { scope: 'execute:refund', granted: true },
  { scope: 'admin:settings', granted: false },
  { scope: 'delete:users', granted: false },
]

const mockSecurityEvents = [
  {
    id: 1,
    event: 'Permission escalation blocked',
    severity: 'high' as const,
    timestamp: '2024-01-15 09:45 AM',
  },
  {
    id: 2,
    event: 'Rate limit triggered (50 req/min)',
    severity: 'medium' as const,
    timestamp: '2024-01-14 03:22 PM',
  },
  {
    id: 3,
    event: 'Unusual tool-call pattern detected',
    severity: 'low' as const,
    timestamp: '2024-01-14 11:10 AM',
  },
  {
    id: 4,
    event: 'Quarantine auto-released',
    severity: 'medium' as const,
    timestamp: '2024-01-13 06:01 PM',
  },
]

const severityVariant = {
  high: 'danger' as const,
  medium: 'warning' as const,
  low: 'info' as const,
}

function AgentSecurity() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Security</h1>
          </div>
          <p className="text-sm text-slate-400">
            Security posture for agent {agentId}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Quarantine Agent
        </button>
      </div>

      {/* Risk Score & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Risk Score</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-emerald-400">Low</span>
            <p className="text-xs text-slate-400 mt-1">Score: 18 / 100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Permissions</span>
              <Lock className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">
              {mockPermissions.filter((p) => p.granted).length}
            </span>
            <p className="text-xs text-slate-400 mt-1">
              of {mockPermissions.length} scopes granted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Events (7d)</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">
              {mockSecurityEvents.length}
            </span>
            <p className="text-xs text-slate-400 mt-1">security events</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <CardTitle>Permissions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockPermissions.map((perm) => (
                <div
                  key={perm.scope}
                  className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                >
                  <span className="text-sm font-mono text-slate-300">
                    {perm.scope}
                  </span>
                  <Badge variant={perm.granted ? 'success' : 'danger'}>
                    {perm.granted ? 'granted' : 'denied'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <CardTitle>Recent Security Events</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSecurityEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{evt.event}</span>
                    <Badge variant={severityVariant[evt.severity]}>
                      {evt.severity}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500">
                    {evt.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
