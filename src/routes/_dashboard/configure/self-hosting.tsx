import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Server, Container, Globe, Variable } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/configure/self-hosting')({
  component: SelfHostingPage,
})

const envVars = [
  { key: 'CLAW_LICENSE_KEY', value: '••••••••••••••••', set: true },
  { key: 'CLAW_DB_URL', value: 'postgres://claw:***@db:5432/claw', set: true },
  { key: 'CLAW_REDIS_URL', value: 'redis://redis:6379', set: true },
  { key: 'CLAW_DOMAIN', value: 'claw.acme.co', set: true },
  { key: 'CLAW_TLS_CERT_PATH', value: '/etc/ssl/claw/cert.pem', set: true },
  { key: 'CLAW_SMTP_HOST', value: '', set: false },
]

function SelfHostingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Self-Hosting</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your self-hosted deployment configuration
        </p>
      </div>

      {/* Deployment Method */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Container className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-base">Deployment Method</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {['Docker Compose', 'Kubernetes'].map((method) => (
              <button
                key={method}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  method === 'Docker Compose'
                    ? 'border-cyan-500 bg-slate-800 text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 p-4">
            <p className="text-xs text-slate-500 font-mono">
              docker compose -f docker-compose.prod.yml up -d
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Domain Settings */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-base">Domain Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Primary Domain
              </label>
              <input
                type="text"
                defaultValue="claw.acme.co"
                className="w-full sm:w-80 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">TLS Active</Badge>
              <span className="text-xs text-slate-400">
                Certificate expires 2025-06-01
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Variable className="w-5 h-5 text-amber-400" />
              <CardTitle className="text-base">Environment Variables</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              Add Variable
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {envVars.map((v) => (
                  <tr
                    key={v.key}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-white whitespace-nowrap font-mono text-xs">
                      {v.key}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-mono text-xs">
                      {v.value || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={v.set ? 'success' : 'warning'}>
                        {v.set ? 'set' : 'missing'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-base">Deployment Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500">Version</p>
              <p className="text-sm text-white font-medium">v2.4.1</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Uptime</p>
              <p className="text-sm text-white font-medium">14d 6h 32m</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Nodes</p>
              <p className="text-sm text-white font-medium">3 / 3 healthy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
