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

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/security',
)({
  component: InstanceSecurity,
})

const mockOpenPorts = [
  { port: 443, protocol: 'HTTPS', service: 'API Gateway', status: 'secure' as const },
  { port: 8080, protocol: 'HTTP', service: 'Health Check', status: 'warning' as const },
  { port: 6379, protocol: 'TCP', service: 'Redis', status: 'secure' as const },
  { port: 5432, protocol: 'TCP', service: 'PostgreSQL', status: 'secure' as const },
]

const mockCves = [
  { id: 'CVE-2024-3094', severity: 'critical' as const, package: 'xz-utils', status: 'patched' },
  { id: 'CVE-2024-21626', severity: 'high' as const, package: 'runc', status: 'patched' },
  { id: 'CVE-2024-0567', severity: 'medium' as const, package: 'gnutls', status: 'pending' },
  { id: 'CVE-2023-44487', severity: 'high' as const, package: 'nghttp2', status: 'patched' },
]

const severityVariant: Record<string, 'danger' | 'warning' | 'info'> = {
  critical: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'info',
}

function InstanceSecurity() {
  const { instanceId } = Route.useParams()

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
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-green-400">82</span>
              <div>
                <Badge variant="success">Low Risk</Badge>
                <p className="text-xs text-slate-400 mt-1">Last scanned 12 min ago</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Policy Compliance</span>
              <span className="text-slate-200">96%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Encryption at Rest</span>
              <Badge variant="success">enabled</Badge>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Network Isolation</p>
                <p className="text-xs text-slate-400">Block all external traffic</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-600 peer-checked:bg-cyan-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Tool Lockdown</p>
                <p className="text-xs text-slate-400">Disable all tool execution</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-600 peer-checked:bg-cyan-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <CardTitle>Open Ports</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockOpenPorts.map((port) => (
              <div
                key={port.port}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-white">:{port.port}</span>
                    <Badge variant="info">{port.protocol}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{port.service}</p>
                </div>
                <Badge variant={port.status === 'secure' ? 'success' : 'warning'}>
                  {port.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <CardTitle>CVE Status</CardTitle>
            </div>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Run Scan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockCves.map((cve) => (
              <div
                key={cve.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-white">{cve.id}</span>
                    <Badge variant={severityVariant[cve.severity]}>{cve.severity}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{cve.package}</p>
                </div>
                <Badge variant={cve.status === 'patched' ? 'success' : 'warning'}>
                  {cve.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
