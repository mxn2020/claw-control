import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { Shield, Lock, Eye, FileWarning } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/policies')({ component: InstanceConfigPolicies })

function InstanceConfigPolicies() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })

  if (!instance) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  const policies = [
    { name: 'Sandbox Mode', icon: <Shield className="w-4 h-4" />, enabled: instance.config?.sandboxMode ?? false, desc: 'Isolate tool execution in containers' },
    { name: 'Audit Logging', icon: <Eye className="w-4 h-4" />, enabled: true, desc: 'Log all agent actions to audit trail' },
    { name: 'File Access Control', icon: <Lock className="w-4 h-4" />, enabled: true, desc: 'Restrict filesystem access to allowed paths' },
    { name: 'Network Egress Filter', icon: <FileWarning className="w-4 h-4" />, enabled: false, desc: 'Block unauthorized external network requests' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Security Policies</h1>
        <p className="text-sm text-slate-400 mt-1">Execution and security policies for {instance.name}</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4 text-cyan-400" />Active Policies</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {policies.map(p => (
              <div key={p.name} className={`flex items-center justify-between p-4 rounded-lg border ${p.enabled ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={p.enabled ? 'text-emerald-400' : 'text-slate-500'}>{p.icon}</div>
                  <div>
                    <span className="text-sm font-medium text-white">{p.name}</span>
                    <p className="text-xs text-slate-400">{p.desc}</p>
                  </div>
                </div>
                <Badge variant={p.enabled ? 'success' : 'default'}>{p.enabled ? 'enabled' : 'disabled'}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
