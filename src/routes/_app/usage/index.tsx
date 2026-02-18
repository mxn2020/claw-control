import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { BarChart3, DollarSign, Activity, Settings } from 'lucide-react'

export const Route = createFileRoute('/_app/usage/')({
  component: UsageIndex,
})

const tokenBreakdown = [
  { agent: 'Research Assistant', tokens: '45.2k', cost: '$1.82', percentage: 34 },
  { agent: 'Code Reviewer', tokens: '32.1k', cost: '$1.28', percentage: 24 },
  { agent: 'Email Drafter', tokens: '21.8k', cost: '$0.87', percentage: 16 },
  { agent: 'Meeting Summarizer', tokens: '18.5k', cost: '$0.74', percentage: 14 },
  { agent: 'Other', tokens: '15.9k', cost: '$0.64', percentage: 12 },
]

const spendByPeriod = [
  { period: 'Today', spend: '$1.24', tokens: '31.0k' },
  { period: 'This Week', spend: '$5.35', tokens: '133.5k' },
  { period: 'This Month', spend: '$18.42', tokens: '460.5k' },
  { period: 'All Time', spend: '$87.60', tokens: '2.19M' },
]

function UsageIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Usage</h1>
        <p className="text-sm text-slate-400 mt-1">
          Personal usage dashboard and budget settings
        </p>
      </div>

      {/* Spend by Period */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {spendByPeriod.map((p) => (
          <Card key={p.period}>
            <CardHeader className="pb-2">
              <span className="text-sm text-slate-400">{p.period}</span>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-white">{p.spend}</span>
              <p className="text-xs text-slate-500 mt-0.5">{p.tokens} tokens</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Token Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Token Consumption by Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tokenBreakdown.map((row) => (
              <div key={row.agent} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-200">{row.agent}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{row.tokens}</span>
                    <Badge className="bg-slate-700 text-slate-300 min-w-[3.5rem] text-center">{row.cost}</Badge>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700">
                  <div className="h-1.5 rounded-full bg-cyan-500" style={{ width: `${row.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Activity Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }, (_, i) => {
                const intensity = [0, 1, 2, 3][Math.floor(Math.random() * 4)] as number
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      intensity === 0 ? 'bg-slate-800' : intensity === 1 ? 'bg-cyan-900/40' : intensity === 2 ? 'bg-cyan-700/60' : 'bg-cyan-500'
                    }`}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-end gap-1 mt-2">
              <span className="text-xs text-slate-500">Less</span>
              <div className="w-3 h-3 rounded-sm bg-slate-800" />
              <div className="w-3 h-3 rounded-sm bg-cyan-900/40" />
              <div className="w-3 h-3 rounded-sm bg-cyan-700/60" />
              <div className="w-3 h-3 rounded-sm bg-cyan-500" />
              <span className="text-xs text-slate-500">More</span>
            </div>
          </CardContent>
        </Card>

        {/* Budget Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              Budget Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Monthly Budget Limit</label>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-slate-400" />
                  <Input placeholder="50.00" readOnly />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Alert Threshold</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="80%" readOnly />
                  <Badge className="bg-slate-700 text-slate-300">of budget</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span className="text-xs text-slate-400">Current Spend</span>
                <span className="text-xs text-emerald-400">$18.42 / $50.00 (37%)</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-700">
                <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '37%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
