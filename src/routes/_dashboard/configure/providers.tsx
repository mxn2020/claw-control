import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  KeyRound,
  Plus,
  BarChart3,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/configure/providers')({
  component: ConfigureProviders,
})

function ConfigureProviders() {
  const instances = useQuery(api.instances.list, {})
  const usage = useQuery(api.usage.list, {})

  if (!instances) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading providers…</span>
      </div>
    )
  }

  // Derive providers from instance configs
  const providerMap = new Map<string, { instances: string[]; configured: boolean }>()
  for (const inst of instances) {
    const providers = inst.config?.providers ?? []
    for (const p of providers) {
      const existing = providerMap.get(p) ?? { instances: [], configured: true }
      existing.instances.push(inst.name)
      providerMap.set(p, existing)
    }
  }

  const providers = Array.from(providerMap.entries()).map(([name, data]) => ({
    name,
    instances: data.instances,
    configured: data.configured,
  }))

  const usageRecords = usage ?? []
  const totalCost = usageRecords.reduce((sum, u) => sum + (u.cost ?? 0), 0)
  const totalTokens = usageRecords.reduce((sum, u) => sum + ((u as any).tokenCount ?? 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">LLM Providers</h1>
          <p className="text-sm text-slate-400 mt-1">
            Global provider vault — API keys, usage stats, and model availability
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Providers</span>
              <KeyRound className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {providers.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Tokens</span>
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {totalTokens > 1_000_000
                ? `${(totalTokens / 1_000_000).toFixed(1)}M`
                : totalTokens.toLocaleString()}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Cost</span>
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              ${totalCost.toFixed(2)}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-8 text-center text-slate-500">
              No providers configured. Add providers to your instance configs.
            </CardContent>
          </Card>
        ) : (
          providers.map((provider) => (
            <Card key={provider.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{provider.name}</CardTitle>
                  <Badge variant="success">active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Instances */}
                  <div>
                    <span className="text-xs text-slate-400">Instances</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {provider.instances.map((inst) => (
                        <Badge key={inst} variant="outline" className="text-xs">
                          {inst}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
