import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Shield,
  Save,
  Lock,
  Globe,
  FolderOpen,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/policies',
)({
  component: PoliciesConfig,
})

const mockNetworkRules = [
  { id: 1, rule: 'Allow outbound HTTPS', target: '*.openai.com', action: 'allow' as const },
  { id: 2, rule: 'Allow outbound HTTPS', target: '*.anthropic.com', action: 'allow' as const },
  { id: 3, rule: 'Block internal network', target: '10.0.0.0/8', action: 'deny' as const },
  { id: 4, rule: 'Allow DNS', target: 'udp:53', action: 'allow' as const },
]

const mockFilesystemRules = [
  { id: 1, path: '/workspace/**', access: 'read-write' as const },
  { id: 2, path: '/tmp/**', access: 'read-write' as const },
  { id: 3, path: '/etc/config.yaml', access: 'read-only' as const },
  { id: 4, path: '/var/log/**', access: 'read-only' as const },
  { id: 5, path: '/usr/bin/**', access: 'denied' as const },
]

function PoliciesConfig() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/config"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Policies</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Sandbox Mode */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <div>
                <CardTitle>Sandbox Mode</CardTitle>
                <CardDescription className="mt-1">
                  Isolate the instance in a restricted execution environment
                </CardDescription>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-slate-600 peer-checked:bg-cyan-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            Sandbox is active — commands run in an isolated container with restricted privileges.
          </div>
        </CardContent>
      </Card>

      {/* Network Restrictions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <div>
              <CardTitle>Network Restrictions</CardTitle>
              <CardDescription className="mt-1">
                Control outbound network access for this instance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-3 font-medium text-slate-400">Rule</th>
                  <th className="pb-3 font-medium text-slate-400">Target</th>
                  <th className="pb-3 font-medium text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockNetworkRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="py-3 text-slate-300">{rule.rule}</td>
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-300">{rule.target}</span>
                    </td>
                    <td className="py-3">
                      <Badge variant={rule.action === 'allow' ? 'success' : 'danger'}>
                        {rule.action}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Filesystem Access */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-cyan-400" />
            <div>
              <CardTitle>Filesystem Access Rules</CardTitle>
              <CardDescription className="mt-1">
                Define read/write permissions for filesystem paths
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-3 font-medium text-slate-400">Path</th>
                  <th className="pb-3 font-medium text-slate-400">Access Level</th>
                </tr>
              </thead>
              <tbody>
                {mockFilesystemRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-300">{rule.path}</span>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          rule.access === 'read-write'
                            ? 'success'
                            : rule.access === 'read-only'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {rule.access}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
