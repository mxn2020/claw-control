import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Shield,
  Lock,
  AlertTriangle,
} from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/security',
)({
  component: InstanceSecurity,
})

function InstanceSecurity() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const updateStatus = useMutation(api.instances.updateStatus)

  const isQuarantined = instance?.status === 'quarantined'

  const handleQuarantine = async () => {
    if (instance) {
      await updateStatus({
        id: instance._id,
        status: isQuarantined ? 'online' : 'quarantined',
      })
    }
  }

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Security</h1>
          <p className="text-sm text-slate-400">{instance?.name ?? instanceId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Instance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-slate-400">Status:</span>
                <Badge variant={isQuarantined ? 'danger' : instance?.status === 'online' ? 'success' : 'warning'} className="ml-2">
                  {instance?.status ?? '…'}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Provider</span>
              <span className="text-slate-200">{instance?.provider ?? 'Local'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Region</span>
              <span className="text-slate-200">{instance?.region ?? 'default'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Version</span>
              <span className="text-slate-200">{instance?.version ?? 'unknown'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Agents</span>
              <span className="text-slate-200">{instance?.agentCount ?? 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quarantine Controls</CardTitle>
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Quarantining an instance pauses all agents, blocks egress, and preserves state for forensic analysis.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">
                  {isQuarantined ? 'Instance is quarantined' : 'Instance is operational'}
                </p>
                <p className="text-xs text-slate-400">
                  {isQuarantined ? 'Click to release quarantine' : 'Click to quarantine this instance'}
                </p>
              </div>
              <Button
                variant={isQuarantined ? 'default' : 'destructive'}
                size="sm"
                onClick={handleQuarantine}
              >
                <Shield className="w-4 h-4 mr-1.5" />
                {isQuarantined ? 'Release' : 'Quarantine'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <CardTitle>Security Architecture</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Tunnel Architecture</span>
            <Badge variant="success">agent-initiated outbound</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Inbound Ports</span>
            <Badge variant="success">none required</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Secrets Storage</span>
            <Badge variant="success">write-only after entry</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Audit Log</span>
            <Badge variant="success">immutable, append-only</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Port scanning, CVE detection, and policy compliance scoring require the VPS agent sidecar to be active.
            These features will be populated once the agent is connected.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
