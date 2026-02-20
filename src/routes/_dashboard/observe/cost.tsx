import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { DollarSign, TrendingDown, BarChart3, Cpu } from 'lucide-react'
import { useUsageRecords } from '#/lib/dataHooks'

export const Route = createFileRoute('/_dashboard/observe/cost')({
  component: CostPage,
})

function CostPage() {
  const records = useUsageRecords() || []

  const totalCost = records.reduce((s, r) => s + r.cost, 0)
  const totalTokens = records.reduce((s, r) => s + r.tokensUsed, 0)
  const todayStr = new Date().toISOString().slice(0, 10)
  const todayCost = records.filter((r) => r.date === todayStr).reduce((s, r) => s + r.cost, 0)

  // Group by model
  const byModel = records.reduce<Record<string, { cost: number; tokens: number }>>((acc, r) => {
    const model = r.model ?? 'unknown'
    if (!acc[model]) acc[model] = { cost: 0, tokens: 0 }
    acc[model].cost += r.cost
    acc[model].tokens += r.tokensUsed
    return acc
  }, {})

  // Group by date (last 7 entries)
  const byDate = records.reduce<Record<string, number>>((acc, r) => {
    acc[r.date] = (acc[r.date] ?? 0) + r.cost
    return acc
  }, {})
  const dateEntries = Object.entries(byDate).sort().slice(-7)
  const maxCost = Math.max(...dateEntries.map(([, c]) => c), 0.01)

  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
    return String(n)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Cost Analysis</h1>
        <p className="text-sm text-slate-400 mt-1">Token usage and spend across your fleet</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Spend</span>
              <DollarSign className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">${totalCost.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-1">{records.length} records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Today</span>
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">${todayCost.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Tokens</span>
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{fmt(totalTokens)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily spend bar chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Daily Spend (last 7 days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {dateEntries.map(([date, cost]) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs text-slate-400">${cost.toFixed(2)}</span>
                <div
                  className="w-full bg-cyan-500/70 rounded-t"
                  style={{ height: `${Math.max(4, (cost / maxCost) * 96)}px` }}
                />
                <span className="text-xs text-slate-500 rotate-45 origin-left">{date.slice(5)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* By model */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spend by Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(byModel)
              .sort((a, b) => b[1].cost - a[1].cost)
              .map(([model, data]) => (
                <div key={model} className="flex items-center gap-3">
                  <code className="text-xs font-mono text-slate-300 w-44 truncate">{model}</code>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${(data.cost / totalCost) * 100}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${data.cost.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{fmt(data.tokens)} tok</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
