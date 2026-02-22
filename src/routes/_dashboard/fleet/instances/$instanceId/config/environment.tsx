import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { KeyRound, Plus, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/environment')({ component: InstanceConfigEnv })

function InstanceConfigEnv() {
  const { instanceId } = Route.useParams()
  const { user } = useAuth()
  const orgId = user?.orgId as any
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const secrets = useQuery(api.secrets.list, orgId ? { orgId } : "skip")
  const [showValues, setShowValues] = useState<Record<string, boolean>>({})

  if (!instance) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  const secretList = secrets ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Environment Variables</h1>
          <p className="text-sm text-slate-400 mt-1">Secrets and configuration for {instance.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><KeyRound className="w-4 h-4 text-cyan-400" />Secrets ({secretList.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {secretList.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No secrets configured. Add secrets from the Security → Vault page.</p>
          ) : (
            <div className="space-y-2">
              {secretList.map(s => (
                <div key={s._id} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-sm font-mono text-white">{s.name}</span>
                      <p className="text-xs text-slate-400">{s.type} · {s.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-slate-400 font-mono">
                      {showValues[s._id] ? s.value : '••••••••' + (s.value?.slice(-4) ?? '')}
                    </code>
                    <button
                      onClick={() => setShowValues(prev => ({ ...prev, [s._id]: !prev[s._id] }))}
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      {showValues[s._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <Badge variant={s.status === 'active' ? 'success' : 'warning'}>{s.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
