import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/security/quarantine')({ component: AgentSecurityQuarantine })

function AgentSecurityQuarantine() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const quarantineAgent = useMutation(api.agents.quarantine)
  const unquarantineAgent = useMutation(api.agents.unquarantine)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  const isQuarantined = agent.status === 'quarantined'

  async function handleQuarantine() {
    if (!reason.trim()) return
    setLoading(true)
    try {
      await quarantineAgent({ id: agentId as Id<"agents">, reason })
      setReason('')
    } catch (err) {
      console.error('Failed to quarantine:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUnquarantine() {
    setLoading(true)
    try {
      await unquarantineAgent({ id: agentId as Id<"agents">, reason: 'Manual release from quarantine' })
    } catch (err) {
      console.error('Failed to release:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Quarantine Control</h1>
        <p className="text-sm text-slate-400 mt-1">Isolate or release agent {agent.name}</p>
      </div>

      <Card className={isQuarantined ? 'border-red-500/30 bg-red-950/10' : 'border-emerald-500/20 bg-emerald-950/5'}>
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            {isQuarantined ? (
              <div className="p-3 rounded-full bg-red-500/20"><ShieldAlert className="w-6 h-6 text-red-400" /></div>
            ) : (
              <div className="p-3 rounded-full bg-emerald-500/20"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
                <Badge variant={isQuarantined ? 'danger' : 'success'}>{agent.status}</Badge>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {isQuarantined
                  ? 'This agent is quarantined — all tool access is blocked and sessions are paused.'
                  : 'This agent is operational. Quarantine to immediately revoke tool access.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isQuarantined ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              Quarantine Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Quarantining will immediately set the agent status to "quarantined", block all tool execution,
              and pause active sessions. An audit log entry will be created.
            </p>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Reason for quarantine</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Suspicious tool usage detected, unauthorized API calls..."
                className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 min-h-[80px] focus:border-red-500 focus:outline-none"
              />
            </div>
            <Button
              onClick={handleQuarantine}
              disabled={loading || !reason.trim()}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              {loading ? 'Quarantining…' : 'Quarantine Agent'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Release from Quarantine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Releasing the agent will set its status to "paused". You can then manually resume it
              to "active" or "idle" once you've verified the security concern has been addressed.
            </p>
            <Button
              onClick={handleUnquarantine}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {loading ? 'Releasing…' : 'Release from Quarantine'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
