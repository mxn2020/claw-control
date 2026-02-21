import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  KeyRound,
  RefreshCw,
  Shield,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/secrets')({
  component: SecuritySecrets,
})

function SecuritySecrets() {
  const instances = useQuery(api.instances.list, {})
  const agents = useQuery(api.agents.list, {})

  if (!instances || !agents) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading secrets data…</span>
      </div>
    )
  }

  // Derive credentials from instance configs that have providers
  const credentials = instances
    .filter((inst) => inst.config?.providers && inst.config.providers.length > 0)
    .flatMap((inst) =>
      (inst.config?.providers ?? []).map((provider) => ({
        name: `${provider.toUpperCase()}_API_KEY`,
        type: 'API Key',
        instance: inst.name,
        status: inst.status === 'online' ? 'active' : inst.status === 'error' ? 'stale' : 'active',
        distributedTo: agents
          .filter((a) => a.instanceId === inst._id)
          .map((a) => a.name)
          .slice(0, 3),
      }))
    )

  // Unique credentials by name
  const uniqueCredentials = credentials.reduce<typeof credentials>((acc, cred) => {
    if (!acc.find((c) => c.name === cred.name)) {
      acc.push(cred)
    }
    return acc
  }, [])

  const statusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success' as const
      case 'stale': return 'warning' as const
      case 'expired': return 'danger' as const
      default: return 'default' as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Secrets Vault</h1>
          <p className="text-sm text-slate-400 mt-1">
            Credential management, rotation, and distribution
          </p>
        </div>
        <Button variant="default" size="sm">
          <KeyRound className="w-4 h-4 mr-2" />
          Add Secret
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Secrets</span>
              <KeyRound className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {uniqueCredentials.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Stale / Expired</span>
              <RefreshCw className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {uniqueCredentials.filter((c) => c.status !== 'active').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Instances</span>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {instances.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Credentials List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Credentials</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {uniqueCredentials.length === 0 ? (
            <p className="text-sm text-slate-500 p-6">
              No provider API keys configured on any instance. Add provider
              configurations to instance settings to see credentials here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Instance
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Distribution
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueCredentials.map((cred) => (
                    <tr
                      key={cred.name}
                      className="border-b border-slate-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                        {cred.name}
                      </td>
                      <td className="px-4 py-3 text-slate-300">{cred.type}</td>
                      <td className="px-4 py-3 text-slate-400">
                        {cred.instance}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {cred.distributedTo.length === 0 ? (
                            <span className="text-xs text-slate-500">—</span>
                          ) : (
                            cred.distributedTo.map((agent) => (
                              <Badge
                                key={agent}
                                variant="outline"
                                className="text-xs"
                              >
                                {agent}
                              </Badge>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(cred.status)}>
                          {cred.status}
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
    </div>
  )
}
