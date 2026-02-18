import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Bell,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/observe/cost')({
  component: ObserveCost,
})

const providerSpend = [
  { provider: 'OpenAI', spend: '$142.50', percent: 58, color: 'bg-emerald-500' },
  { provider: 'Anthropic', spend: '$68.20', percent: 28, color: 'bg-cyan-500' },
  { provider: 'Google', spend: '$24.80', percent: 10, color: 'bg-blue-500' },
  { provider: 'Cohere', spend: '$9.50', percent: 4, color: 'bg-purple-500' },
]

const agentSpend = [
  { agent: 'research-agent', spend: '$89.40', tokens: '1.2M', model: 'gpt-4o' },
  { agent: 'support-agent', spend: '$62.10', tokens: '890K', model: 'claude-3.5-sonnet' },
  { agent: 'qa-tester', spend: '$45.20', tokens: '620K', model: 'gpt-4o' },
  { agent: 'billing-agent', spend: '$28.30', tokens: '410K', model: 'gemini-pro' },
  { agent: 'analytics-agent', spend: '$20.00', tokens: '340K', model: 'claude-3-haiku' },
]

const budgets = [
  { name: 'Monthly Total', spent: 245, budget: 500, unit: '$' },
  { name: 'OpenAI Daily', spent: 18, budget: 25, unit: '$' },
  { name: 'Research Agent', spent: 89, budget: 120, unit: '$' },
  { name: 'Token Usage', spent: 3460, budget: 5000, unit: 'K tokens' },
]

const alertThresholds = [
  { name: 'Monthly spend > $400', status: 'inactive', threshold: '$400' },
  { name: 'Daily spend > $30', status: 'inactive', threshold: '$30' },
  { name: 'Agent spend > $100', status: 'triggered', threshold: '$100' },
  { name: 'Hourly rate > $5/hr', status: 'inactive', threshold: '$5/hr' },
]

function ObserveCost() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Cost Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Spend tracking, budgets, and cost projections
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">MTD Spend</span>
              <DollarSign className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">$245.00</span>
            <p className="text-xs text-slate-500 mt-1">of $500 budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Today</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">$18.40</span>
            <p className="text-xs text-emerald-400 mt-1">↓ 12% vs yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Projected Monthly</span>
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">$478</span>
            <p className="text-xs text-amber-400 mt-1">96% of budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Alerts</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">1</span>
            <p className="text-xs text-red-400 mt-1">Agent spend threshold</p>
          </CardContent>
        </Card>
      </div>

      {/* Spend by Provider */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spend by Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerSpend.map((p) => (
              <div key={p.provider} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{p.provider}</span>
                  <span className="text-sm font-medium text-white">{p.spend}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`${p.color} h-2 rounded-full transition-all`}
                    style={{ width: `${p.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spend by Agent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spend by Agent</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Spend (MTD)
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Model
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentSpend.map((a) => (
                  <tr
                    key={a.agent}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-white">{a.agent}</td>
                    <td className="px-4 py-3 text-cyan-400 font-medium">
                      {a.spend}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{a.tokens}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{a.model}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Budget Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map((b) => {
              const pct = Math.round((b.spent / b.budget) * 100)
              const barColor =
                pct > 90
                  ? 'bg-red-500'
                  : pct > 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
              const fmt = (val: number) =>
                b.unit === '$' ? `$${val}` : `${val}${b.unit}`
              return (
                <div key={b.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{b.name}</span>
                    <span className="text-xs text-slate-400">
                      {fmt(b.spent)} / {fmt(b.budget)} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`${barColor} h-2 rounded-full transition-all`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Projection Chart Area */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Monthly Projection</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center border border-dashed border-slate-600 rounded-lg">
            <span className="text-sm text-slate-500">
              Chart: Daily spend trend with end-of-month projection
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Budget Alert Thresholds */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Budget Alert Thresholds</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertThresholds.map((alert) => (
              <div
                key={alert.name}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge
                  variant={
                    alert.status === 'triggered' ? 'danger' : 'default'
                  }
                >
                  {alert.status}
                </Badge>
                <span className="text-sm text-slate-300 flex-1">
                  {alert.name}
                </span>
                <span className="text-xs text-slate-500">
                  Threshold: {alert.threshold}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
