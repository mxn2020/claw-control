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
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/_dashboard/security/quarantine')({
  component: SecurityQuarantine,
})

function SecurityQuarantine() {
  const posture = useQuery(api.platform.getSecurityPosture, {})
  const auditLogs = useQuery(api.platform.listAuditLogs, {})
  const unquarantineInstance = useMutation(api.instances.unquarantine)
  const unquarantineAgent = useMutation(api.agents.unquarantine)

  if (!posture) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading quarantine data…</span>
      </div>
    )
  }

  const logs = auditLogs ?? []

  // Containment actions from audit logs
  const containmentActions = logs
    .filter(
      (l) =>
        l.action.includes('quarantine') ||
        l.action.includes('suspend') ||
        l.action.includes('isolate') ||
        l.action.includes('disable')
    )
    .slice(0, 10)

  return (
    <div className="space-y-6">
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
              {posture.quarantinedInstances.length}
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
              {posture.quarantinedAgents.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">High-Risk Skills</span>
              <Wrench className="w-5 h-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {posture.highRiskSkills.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Quarantined Instances */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-red-400" />
            <CardTitle className="text-base">
              Quarantined Instances
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {posture.quarantinedInstances.length === 0 ? (
            <p className="text-sm text-slate-500">
              No quarantined instances
            </p>
          ) : (
            <div className="space-y-3">
              {posture.quarantinedInstances.map((inst) => (
                <div
                  key={inst._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Badge variant="danger">quarantined</Badge>
                  <span className="text-sm font-mono text-cyan-400 shrink-0 min-w-[120px]">
                    {inst.name}
                  </span>
                  <span className="text-sm text-slate-300 flex-1 truncate">
                    {inst.provider ?? 'unknown'} · {inst.region ?? 'unknown'}
                  </span>
                  <span className="text-xs text-slate-500 shrink-0 w-24 text-right">
                    {new Date(inst.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-7 text-xs border-slate-600 hover:bg-slate-800"
                    onClick={() => unquarantineInstance({ id: inst._id as any, reason: "Manual release by admin" })}
                  >
                    Release
                  </Button>
                </div>
              ))}
            </div>
          )}
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
          {posture.quarantinedAgents.length === 0 ? (
            <p className="text-sm text-slate-500">No suspended agents</p>
          ) : (
            <div className="space-y-3">
              {posture.quarantinedAgents.map((agent) => (
                <div
                  key={agent._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Badge variant="warning">quarantined</Badge>
                  <span className="text-sm font-mono text-cyan-400 shrink-0 min-w-[120px]">
                    {agent.name}
                  </span>
                  <span className="text-sm text-slate-300 flex-1 truncate">
                    Instance: {agent.instanceId}
                  </span>
                  <span className="text-xs text-slate-500 shrink-0 w-24 text-right">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-7 text-xs border-slate-600 hover:bg-slate-800"
                    onClick={() => unquarantineAgent({ id: agent._id as any, reason: "Manual release by admin" })}
                  >
                    Release
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Flagged Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-purple-400" />
            <CardTitle className="text-base">High-Risk Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {posture.highRiskSkills.length === 0 ? (
            <p className="text-sm text-slate-500 p-6">
              No high-risk skills detected
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Skill
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posture.highRiskSkills.map((skill) => (
                    <tr
                      key={skill._id}
                      className="border-b border-slate-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                        {skill.name}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="danger">{skill.riskLevel}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={skill.isEnabled ? 'success' : 'default'}
                        >
                          {skill.isEnabled ? 'enabled' : 'disabled'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Containment Actions Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">
              Containment Actions Log
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {containmentActions.length === 0 ? (
            <p className="text-sm text-slate-500">
              No containment actions recorded
            </p>
          ) : (
            <div className="space-y-3">
              {containmentActions.map((action) => (
                <div
                  key={action._id}
                  className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0"
                >
                  <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {action.action}
                      </Badge>
                      <span className="text-sm text-cyan-400 font-mono">
                        {action.resourceId ?? '-'}
                      </span>
                      {action.userId && (
                        <span className="text-xs text-slate-500">
                          by {action.userId}
                        </span>
                      )}
                    </div>
                    {action.details && (
                      <p className="text-xs text-slate-400">
                        {action.details}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    {new Date(action.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
