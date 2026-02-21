import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Server } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/configure/self-hosting')({
  component: SelfHostingPage,
})

function SelfHostingPage() {
  const instances = useQuery(api.instances.list, {})

  if (!instances) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading deployment info…</span>
      </div>
    )
  }

  const onlineCount = instances.filter((i) => i.status === 'online').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Self-Hosting</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your self-hosted deployment configuration
        </p>
      </div>

      {/* Deployment Status */}
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
              <p className="text-xs text-slate-500">Total Instances</p>
              <p className="text-sm text-white font-medium">
                {instances.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Online</p>
              <p className="text-sm text-white font-medium">
                {onlineCount} / {instances.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Providers</p>
              <p className="text-sm text-white font-medium">
                {[...new Set(instances.map((i) => i.provider).filter(Boolean))].length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instance List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Deployed Instances</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {instances.length === 0 ? (
            <p className="text-sm text-slate-500 p-6">
              No instances deployed
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
                      Provider
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {instances.map((inst) => (
                    <tr
                      key={inst._id}
                      className="border-b border-slate-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                        {inst.name}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {inst.provider ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {inst.region ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {inst.version ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            inst.status === 'online'
                              ? 'success'
                              : inst.status === 'error' || inst.status === 'quarantined'
                                ? 'danger'
                                : 'default'
                          }
                        >
                          {inst.status}
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
